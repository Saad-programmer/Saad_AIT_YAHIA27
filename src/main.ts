import './styles.css';
import { filterAndSortProjects, loadGitHubData, type Project } from './lib/projects';
import { getSavedTheme } from './lib/theme';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Portfolio root element was not found.');
}

const portraitUrl = `${import.meta.env.BASE_URL}images/user.jpeg`;
const savedTheme = getSavedTheme(localStorage.getItem('theme'));
document.documentElement.dataset.theme = savedTheme;

app.innerHTML = `
  <header class="site-header">
    <a class="wordmark" href="#top" aria-label="Saad AIT YAHIA home">SA<span>::</span></a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="#work">Projects</a>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="theme-toggle" type="button" aria-label="Switch to light theme" title="Switch theme">
      <span aria-hidden="true">◐</span><span class="theme-label">Light mode</span>
    </button>
  </header>
  <main id="main">
    <section class="hero section-wrap" id="top" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> C / C++ · SYSTEMS · GTK</p>
        <h1 id="hero-title">Building close<br />to the <span>machine.</span></h1>
        <p class="typing-line" aria-hidden="true"><span class="typing-prompt">&gt;</span><span id="typed-focus">Exploring C and C++ systems.</span><span class="typing-caret"></span></p>
        <p class="hero-description">I’m Saad AIT YAHIA, a second-year software engineering student focused on C and C++, systems programming, and desktop applications.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#work">View projects <span aria-hidden="true">→</span></a>
            <a class="button button-quiet" href="${import.meta.env.BASE_URL}resume/cv-saad.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
          <a class="button button-quiet" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-stats" aria-label="GitHub profile summary">
          <a href="https://github.com/Saad-programmer" target="_blank" rel="noreferrer"><span class="stat-number" id="github-followers">—</span><span>Followers</span></a>
          <a href="https://github.com/Saad-programmer?tab=repositories" target="_blank" rel="noreferrer"><span class="stat-number" id="github-repos">—</span><span>Public repositories</span></a>
          <span class="api-status" id="github-status" aria-live="polite">GitHub profile · loading</span>
        </div>
      </div>
      <div class="hero-aside">
        <div class="code-card" aria-label="C code illustration">
          <div class="code-card-bar"><span></span><span></span><span></span><b>engineer.c</b></div>
          <pre><code><span class="code-muted">01</span> <span class="code-keyword">struct</span> Engineer {
<span class="code-muted">02</span>   <span class="code-type">char</span> *focus;
<span class="code-muted">03</span>   <span class="code-type">bool</span> curious;
<span class="code-muted">04</span> } <span class="code-value">saad</span> = {
<span class="code-muted">05</span>   <span class="code-string">"systems"</span>, <span class="code-value">true</span>
<span class="code-muted">06</span> };</code></pre>
        </div>
        <span class="hero-index">FIG. 01 — ENGINEER IN PROGRESS</span>
      </div>
      <a class="scroll-cue" href="#about"><span aria-hidden="true">↓</span> EXPLORE THE WORK</a>
    </section>

    <section class="about-section section-wrap" id="about" aria-labelledby="about-title">
      <div class="section-kicker"><span>01</span> ABOUT</div>
      <div class="about-grid">
        <h2 id="about-title">Interested in what<br />happens <span>under the hood.</span></h2>
        <div class="about-profile">
          <div class="about-portrait"><img src="${portraitUrl}" alt="Saad AIT YAHIA" width="1024" height="1024" loading="lazy" /></div>
          <div class="about-copy">
            <p>I’m a second-year software engineering student who likes understanding how software is put together, from data structures and desktop interfaces to the systems that make them work.</p>
            <p>My strongest public project evidence is in C, C++, GTK applications, and systems-oriented software. I’m continuing to learn by reading code, testing ideas, and building small, concrete things.</p>
            <a class="text-link" href="https://github.com/Saad-programmer" target="_blank" rel="noreferrer">Browse my GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="work-section section-wrap" id="work" aria-labelledby="work-title">
      <div class="section-kicker"><span>02</span> SELECTED PROJECTS</div>
      <div class="section-heading"><h2 id="work-title">Code with a point of view<span>.</span></h2><p>Built from source, not buzzwords.</p></div>
      <div class="project-toolbar" aria-label="Filter projects">
        <label class="search-label">Search projects<input id="project-search" type="search" placeholder="Name, language, topic…" autocomplete="off" /></label>
        <label>Language<select id="language-filter"><option value="all">All languages</option><option value="C">C</option><option value="C++">C++</option></select></label>
        <label>Topic<select id="topic-filter"><option value="all">All topics</option></select></label>
        <label>Sort<select id="project-sort"><option value="updated">Recently updated</option><option value="stars">Most stars</option><option value="name">Name</option></select></label>
      </div>
      <p class="project-status" id="project-status" aria-live="polite">Loading source-backed project records…</p>
      <div class="project-grid" id="project-grid"></div>
      <dialog class="project-dialog" id="project-dialog" aria-labelledby="dialog-title"></dialog>
    </section>

    <section class="skills-section section-wrap" id="skills" aria-labelledby="skills-title">
      <div class="section-kicker"><span>03</span> WORKING TOOLKIT</div>
      <div class="section-heading"><h2 id="skills-title">Evidence over adjectives<span>.</span></h2><p>Tiers reflect code I can point to, not years claimed.</p></div>
      <div class="skill-grid" id="skill-grid"></div>
      <p class="todo-note">Skill frequency and proficiency outside the linked repositories: <strong>TODO — confirm.</strong></p>
    </section>

    <section class="credentials-section section-wrap" id="credentials" aria-labelledby="credentials-title">
      <div class="section-kicker"><span>04</span> CREDENTIALS</div>
      <div class="section-heading"><h2 id="credentials-title">Background & credentials<span>.</span></h2><p>Résumé files are available to download. Certificates are not published pending approval.</p></div>
      <div class="credential-list">
        <a href="${import.meta.env.BASE_URL}resume/cv-saad.pdf" download><span>Résumé · English</span><span>PDF ↓</span></a>
        <a href="${import.meta.env.BASE_URL}resume/cv-saad-fr.pdf" download><span>Résumé · French</span><span>PDF ↓</span></a>
        <a href="${import.meta.env.BASE_URL}resume/cv-saad.docx" download><span>Résumé · English source</span><span>DOCX ↓</span></a>
        <a href="${import.meta.env.BASE_URL}resume/cv-saad-fr.docx" download><span>Résumé · French source</span><span>DOCX ↓</span></a>
      </div>
      <p class="todo-note">Certificates pending your publication approval: Cyber.pdf, IT.pdf, MYSQL.pdf, UI.pdf.</p>
    </section>

    <section class="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
      <div class="section-kicker"><span>04</span> CONTACT</div>
      <div class="contact-grid">
        <h2 id="contact-title">Let’s talk<br />about <span>systems.</span></h2>
        <div class="contact-copy">
          <p>Interested in the details behind a project or want to discuss C/C++ and systems work? Send me a message.</p>
          <form class="contact-form" id="contact-form">
            <label>Name<input name="name" autocomplete="name" required /></label>
            <label>Email<input name="email" type="email" autocomplete="email" required /></label>
            <label>Message<textarea name="message" rows="4" required></textarea></label>
            <input class="honeypot" type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button class="button button-primary" type="submit">Send message <span aria-hidden="true">→</span></button>
            <p class="form-status" id="form-status" aria-live="polite">TODO: Add the public Web3Forms access key. Until then, this form opens your email app.</p>
          </form>
          <a class="contact-email" href="mailto:saadaityahiasaw789@gmail.com">saadaityahiasaw789@gmail.com <span aria-hidden="true">↗</span></a>
          <div class="social-links"><a href="https://github.com/Saad-programmer" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/saad-ait-yahia-426485286/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer"><a class="wordmark" href="#top">SA<span>::</span></a><span>SAAD AIT YAHIA · C / C++ & SYSTEMS</span><a href="#top">BACK TO TOP ↑</a></footer>
`;

const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
const projectGrid = document.querySelector<HTMLDivElement>('#project-grid');
const projectStatus = document.querySelector<HTMLParagraphElement>('#project-status');
const searchInput = document.querySelector<HTMLInputElement>('#project-search');
const languageFilter = document.querySelector<HTMLSelectElement>('#language-filter');
const topicFilter = document.querySelector<HTMLSelectElement>('#topic-filter');
const sortFilter = document.querySelector<HTMLSelectElement>('#project-sort');
const projectDialog = document.querySelector<HTMLDialogElement>('#project-dialog');
let projects: Project[] = [];

function updateTheme(theme: 'dark' | 'light'): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    const label = themeToggle.querySelector('.theme-label');
    if (label) label.textContent = `${nextTheme === 'light' ? 'Light' : 'Dark'} mode`;
  }
}

updateTheme(savedTheme);
themeToggle?.addEventListener('click', () => {
  updateTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character] ?? character;
  });
}

function renderProjects(): void {
  if (
    !projectGrid ||
    !projectStatus ||
    !searchInput ||
    !languageFilter ||
    !topicFilter ||
    !sortFilter
  )
    return;

  const filteredProjects = filterAndSortProjects(projects, {
    query: searchInput.value,
    language: languageFilter.value,
    topic: topicFilter.value,
    sort: sortFilter.value as 'updated' | 'stars' | 'name',
  });

  projectStatus.textContent = `${filteredProjects.length} source-reviewed repositories · sorted by ${sortFilter.selectedOptions[0]?.text.toLowerCase() ?? 'updated'}`;
  projectGrid.innerHTML = filteredProjects.length
    ? filteredProjects
        .map(
          (project) => `
      <article class="project-card">
        <div class="project-card-top">
          <div>
            <h3>${escapeHtml(project.name)}</h3>
            <div class="project-meta"><span>${escapeHtml(project.language)}</span><span>${project.stars} ★</span><span>${project.updatedAt ? `updated ${escapeHtml(new Date(project.updatedAt).toLocaleDateString())}` : 'API details unavailable'}</span></div>
          </div>
          <span class="project-index">${String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
        </div>
        <p class="project-description">${escapeHtml(project.description)}</p>
        <div class="topic-list">${[...new Set([...project.categories, ...project.apiTopics])].map((category) => `<span class="topic-tag">${escapeHtml(category)}</span>`).join('')}</div>
        <div class="project-card-actions">
          <button type="button" data-project="${escapeHtml(project.name)}">Inspect architecture <span aria-hidden="true">→</span></button>
          <a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">Repository ↗</a>
        </div>
      </article>
    `,
        )
        .join('')
    : '<p class="empty-state">No projects match those filters.</p>';

  projectGrid.querySelectorAll<HTMLButtonElement>('[data-project]').forEach((button) => {
    button.addEventListener('click', () => showProject(button.dataset.project ?? ''));
  });
}

function showProject(name: string): void {
  const project = projects.find((item) => item.name === name);
  if (!project || !projectDialog) return;

  const details = project.details;
  const architecture = details.architecture
    .map(
      (step, index) =>
        `${index ? '<b aria-hidden="true">→</b>' : ''}<span>${escapeHtml(step)}</span>`,
    )
    .join('');
  const evidence = details.evidence
    .map(
      (path) =>
        `<li><a href="${escapeHtml(`${project.url}/blob/main/${path}`)}" target="_blank" rel="noreferrer">${escapeHtml(path)}</a></li>`,
    )
    .join('');

  projectDialog.innerHTML = `
    <div class="dialog-content">
      <div class="dialog-top"><div><p class="section-kicker">SOURCE REVIEW · ${escapeHtml(project.language)}</p><h2 id="dialog-title">${escapeHtml(project.name)}</h2></div><button class="dialog-close" type="button" aria-label="Close project details">×</button></div>
      <p class="dialog-lede">${escapeHtml(project.description)}</p>
      <section class="detail-section"><h3>Problem</h3><p>${escapeHtml(details.problem)}</p></section>
      <section class="detail-section"><h3>Architecture</h3><div class="architecture" aria-label="${escapeHtml(details.architecture.join(' then '))}">${architecture}</div></section>
      <section class="detail-section"><h3>Verified features</h3><ul>${details.features.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
      <section class="detail-section"><h3>Engineering challenges</h3><ul>${details.challenges.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
      <section class="detail-section"><h3>What this project demonstrates</h3><ul>${details.learned.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
      <section class="detail-section"><h3>Technologies</h3><p>${details.technologies.map(escapeHtml).join(' · ')}</p></section>
      <section class="detail-section"><h3>Source reviewed</h3><ul>${evidence}</ul></section>
      <section class="detail-section"><h3>Visuals</h3><div class="screenshot-todo">${escapeHtml(details.screenshot)}</div></section>
      <section class="detail-section"><h3>Suggested GitHub description</h3><p>${escapeHtml(project.suggestedDescription)}</p><h3>Suggested GitHub topics</h3><div class="topic-list">${project.suggestedTopics.map((topic) => `<span class="topic-tag">${escapeHtml(topic)}</span>`).join('')}</div></section>
      <div class="dialog-links"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">Open repository ↗</a></div>
    </div>
  `;
  projectDialog
    .querySelector('.dialog-close')
    ?.addEventListener('click', () => projectDialog.close());
  projectDialog.showModal();
}

for (const control of [searchInput, languageFilter, topicFilter, sortFilter]) {
  control?.addEventListener('input', renderProjects);
  control?.addEventListener('change', renderProjects);
}

projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog?.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) target.rel = 'noreferrer';
});

interface SkillTier {
  label: string;
  id: string;
  skills: { name: string; proof: string; href?: string }[];
}

const skillTiers: SkillTier[] = [
  {
    label: 'Comfortable · multiple codebases',
    id: 'comfortable',
    skills: [
      {
        name: 'C',
        proof: 'GTK-Bekhocha · AquariumGTK · GTKFinalVers',
        href: 'https://github.com/Saad-programmer/GTK-Bekhocha',
      },
      {
        name: 'C++',
        proof: 'TRackRS · container benchmark · BFS examples',
        href: 'https://github.com/Saad-programmer/TRackRS',
      },
      {
        name: 'GTK',
        proof: 'three GTK interface/simulation repositories',
        href: 'https://github.com/Saad-programmer/GTKFinalVers',
      },
    ],
  },
  {
    label: 'Learning · represented as exercises',
    id: 'learning',
    skills: [
      {
        name: 'STL containers',
        proof: 'vector/list benchmark and queue examples',
        href: 'https://github.com/Saad-programmer/std-LIST-std-VECTOR',
      },
      {
        name: 'Tree traversal',
        proof: 'n-ary breadth-first traversal examples',
        href: 'https://github.com/Saad-programmer/List-Vector',
      },
    ],
  },
  {
    label: 'Daily use · TODO: confirm',
    id: 'daily',
    skills: [
      { name: 'Frequency of use', proof: 'TODO: confirm daily-use tools' },
      {
        name: 'Linux, Bash, build/debug tools',
        proof: 'TODO: confirm current use and repository evidence',
      },
      { name: 'Assembly, Make/CMake, GDB, Valgrind', proof: 'TODO: confirm experience' },
    ],
  },
];

const skillGrid = document.querySelector<HTMLDivElement>('#skill-grid');
if (skillGrid) {
  skillGrid.innerHTML = `
    <div class="skill-filters" role="group" aria-label="Filter skills by evidence tier">
      <button type="button" class="skill-filter is-active" data-skill-filter="all" aria-pressed="true">All</button>
      <button type="button" class="skill-filter" data-skill-filter="comfortable" aria-pressed="false">Comfortable</button>
      <button type="button" class="skill-filter" data-skill-filter="learning" aria-pressed="false">Learning</button>
      <button type="button" class="skill-filter" data-skill-filter="daily" aria-pressed="false">TODO</button>
    </div>
    <div class="skill-cards">
      ${skillTiers
        .map(
          (tier) => `
    <section class="skill-tier" data-tier="${tier.id}" data-skill-card="${tier.id}">
      <h3>${escapeHtml(tier.label)}</h3>
      <ul>${tier.skills.map((skill) => `<li>${escapeHtml(skill.name)} ${skill.href ? `<a href="${escapeHtml(skill.href)}" target="_blank" rel="noreferrer">${escapeHtml(skill.proof)}</a>` : `<span class="skill-todo">${escapeHtml(skill.proof)}</span>`}</li>`).join('')}</ul>
    </section>
  `,
        )
        .join('')}
    </div>
  `;
}

skillGrid?.querySelectorAll<HTMLButtonElement>('[data-skill-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTier = button.dataset.skillFilter ?? 'all';
    skillGrid.querySelectorAll<HTMLButtonElement>('[data-skill-filter]').forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    skillGrid.querySelectorAll<HTMLElement>('[data-skill-card]').forEach((card) => {
      card.hidden = selectedTier !== 'all' && card.dataset.skillCard !== selectedTier;
    });
  });
});

const typingTarget = document.querySelector<HTMLSpanElement>('#typed-focus');
const systemPhrases = [
  'Building systems one layer at a time.',
  'C and C++ with curiosity.',
  'Understanding the machine beneath.',
];

if (typingTarget && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pause = (duration: number) =>
    new Promise((resolve) => window.setTimeout(resolve, duration));
  const typePhrases = async (): Promise<void> => {
    let index = 0;
    while (true) {
      const phrase = systemPhrases[index % systemPhrases.length] ?? '';
      for (let length = 0; length <= phrase.length; length += 1) {
        typingTarget.textContent = phrase.slice(0, length);
        await pause(42);
      }
      await pause(1500);
      for (let length = phrase.length; length >= 0; length -= 1) {
        typingTarget.textContent = phrase.slice(0, length);
        await pause(22);
      }
      index += 1;
    }
  };
  void typePhrases();
}

const WEB3FORMS_ACCESS_KEY = 'TODO: add Web3Forms access key';
const contactForm = document.querySelector<HTMLFormElement>('#contact-form');
const formStatus = document.querySelector<HTMLParagraphElement>('#form-status');
contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  if (formData.get('botcheck')) return;

  const name = String(formData.get('name') ?? '');
  const email = String(formData.get('email') ?? '');
  const message = String(formData.get('message') ?? '');
  if (WEB3FORMS_ACCESS_KEY.startsWith('TODO:')) {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:saadaityahiasaw789@gmail.com?subject=${subject}&body=${body}`;
    if (formStatus) formStatus.textContent = 'Opening your email app to send this message.';
    return;
  }

  formData.set('access_key', WEB3FORMS_ACCESS_KEY);
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const result = (await response.json()) as { success?: boolean; message?: string };
    if (!response.ok || !result.success)
      throw new Error(result.message ?? 'Message could not be sent.');
    contactForm.reset();
    if (formStatus) formStatus.textContent = 'Message sent. Thanks for getting in touch.';
  } catch {
    if (formStatus)
      formStatus.textContent = 'The form service is unavailable. Use the email link below instead.';
  }
});

const [githubData] = await Promise.all([loadGitHubData()]);
projects = githubData.projects;
if (projectStatus) {
  projectStatus.dataset.source = githubData.source;
  projectStatus.textContent = `${projects.length} source-reviewed repositories · ${githubData.source === 'fallback' ? 'offline project catalog' : `GitHub ${githubData.source} data`}`;
}
const followers = document.querySelector<HTMLSpanElement>('#github-followers');
const repositoryCount = document.querySelector<HTMLSpanElement>('#github-repos');
const githubStatus = document.querySelector<HTMLSpanElement>('#github-status');
if (followers) followers.textContent = githubData.followers?.toLocaleString() ?? '—';
if (repositoryCount) repositoryCount.textContent = githubData.publicRepos?.toLocaleString() ?? '—';
if (githubStatus)
  githubStatus.textContent =
    githubData.source === 'fallback'
      ? 'GitHub API unavailable · cached catalog'
      : `GitHub ${githubData.source} · refreshed hourly`;

if (topicFilter) {
  const topics = [
    ...new Set(projects.flatMap((project) => [...project.categories, ...project.apiTopics])),
  ].sort();
  topicFilter.insertAdjacentHTML(
    'beforeend',
    topics
      .map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`)
      .join(''),
  );
}
renderProjects();
