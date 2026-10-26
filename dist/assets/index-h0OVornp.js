(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const I=[{name:"GTK-Bekhocha",language:"C",description:"A C/GTK3 parser that reads an HTML-like widget description and builds GTK interfaces.",details:{problem:"Describe GTK3 interfaces with a small HTML-like input format instead of assembling every widget by hand.",architecture:["HTML-like input","C line parser","widget records","GTK3 interface"],features:["Parses tags and attributes into fixed-capacity widget records","Tracks parent/container relationships","Builds a GTK widget tree from parsed descriptions"],challenges:["Mapping nested input tags onto a bounded widget/parent stack","Translating parsed attributes into GTK widget properties"],learned:["Separating parsing, intermediate data structures, and GTK widget creation"],technologies:["C","GTK3","GDK"],evidence:["Parser/parser.c","Parser/structures.c","Parser/Makefile"],screenshot:"TODO: capture a GTK-Bekhocha interface screenshot."},categories:["C","GTK","parser","desktop","GUI"],suggestedDescription:"A C and GTK3 toolkit that parses HTML-like interface files into native GTK widgets.",suggestedTopics:["c","gtk3","parser","gui","desktop-application"]},{name:"AquariumGTK",language:"C",description:"A GTK and Cairo aquarium simulation with animated fish groups and interactive controls.",details:{problem:"Render and update a small interactive aquarium simulation inside a GTK desktop application.",architecture:["GTK input callbacks","fish/group simulation state","timed animation tick","Cairo drawing"],features:["Animates fish in groups with leaders and predators","Uses a timed GTK callback to update simulation state","Draws fish and effects with Cairo","Handles cursor interaction, feeding, group changes, zoom, and panning"],challenges:["Keeping movement, group state, and drawing in sync across animation ticks","Rendering many entities while responding to pointer input"],learned:["Connecting event-driven GTK input, simulation updates, and custom Cairo rendering"],technologies:["C","GTK","Cairo","GDK Pixbuf"],evidence:["Aquarium6.c","structures.c","structures.h"],screenshot:"TODO: capture the running AquariumGTK simulation."},categories:["C","GTK","simulation","graphics","desktop"],suggestedDescription:"An interactive C/GTK aquarium simulation with animated fish groups rendered in Cairo.",suggestedTopics:["c","gtk","cairo","simulation","desktop-application"]},{name:"GTKFinalVers",language:"C",description:"A modular GTK3 widget/parser project with separate parsing, widget-factory, and utility modules.",details:{problem:"Represent GTK widget properties as structured values, parse interface descriptions, and create the corresponding GTK widgets.",architecture:["interface input","parser and attribute model","typed widget records","GTK widget factory"],features:["Defines records for windows, buttons, labels, menus, entries, and containers","Parses widget attributes into typed structures","Creates GTK widgets from parsed records","Includes separate parser, utility, and widget-factory modules"],challenges:["Keeping parser attributes aligned with the many widget-specific properties","Composing nested GTK containers from parsed input"],learned:["Decomposing a GTK application into parsing, data-model, and widget-construction modules"],technologies:["C","GTK3","GLib"],evidence:["project/src/parser.c","project/src/types.h","project/src/widget_factory.c","project/src/utils.c"],screenshot:"TODO: capture the GTKFinalVers application."},categories:["C","GTK","parser","GUI","desktop"],suggestedDescription:"A modular C/GTK3 project for parsing interface descriptions and constructing native widgets.",suggestedTopics:["c","gtk3","glib","gui","widget-toolkit"]},{name:"TRackRS",language:"C++",description:"A GPL-2.0 C++11 modernization of Trigger Rally, with SDL2/OpenGL rendering and a vehicle simulation engine.",details:{problem:"Maintain and modernize a real-time 3D rally game spanning application, rendering, game, and physics subsystems.",architecture:["SDL2 application","Trigger game and content","PSim vehicle/rigid-body simulation","OpenGL rendering and PEngine"],features:["Builds C++ sources across PEngine, PSim, and Trigger using GNU Make","Loads levels, vehicles, and configuration data","Advances vehicles and rigid bodies in fixed-size simulation steps","Uses SDL2, OpenGL, PhysFS, and TinyXML-2"],challenges:["Coordinating simulation, rendering, content loading, and platform dependencies","Maintaining behavior across a large inherited codebase"],learned:["TODO: confirm which changes and subsystems are your own contributions versus inherited Trigger Rally code"],technologies:["C++11","SDL2","OpenGL","GNU Make","PhysFS","TinyXML-2"],evidence:["README.md","src/GNUmakefile","src/PSim/sim.cpp","src/Trigger/game.cpp","src/PEngine/app.cpp"],screenshot:"TODO: capture gameplay and clearly distinguish your own changes from upstream assets/code."},categories:["C++","game-engine","simulation","OpenGL","systems"],suggestedDescription:"A C++11 SDL2/OpenGL rally game fork with vehicle physics, content loading, and a modular engine.",suggestedTopics:["cpp","opengl","sdl2","physics-simulation","rally-game","trigger-rally"]},{name:"std-LIST-std-VECTOR",language:"C++",description:"A C++ benchmark comparing vector and list erasure strategies, memory locality, and cache behavior.",details:{problem:"Measure how vector/list layout and different erase algorithms affect a full traversal-and-removal workload.",architecture:["shared Item/data helpers","vector and list strategies","timed repeated runs","checksums and comparison output"],features:["Compares vector erase, compact and scattered lists","Implements one-pass compaction, C++20 erase_if, and swap-and-pop","Checks result counts and value sums across alternatives","Builds C++17 and C++20 targets with a Makefile"],challenges:["Keeping the measured work equivalent between strategies","Separating setup/copying from the timed region","Explaining cache locality alongside asymptotic complexity"],learned:["Benchmark results depend on data layout and workload, not Big-O notation alone"],technologies:["C++17","C++20","std::vector","std::list","std::erase_if","Make"],evidence:["README.md","Makefile","common.hpp","problem.cpp","fixed.cpp"],screenshot:"TODO: capture a representative benchmark run and include machine/compiler context."},categories:["C++","benchmark","data-structures","performance","cache-locality"],suggestedDescription:"A C++ benchmark comparing vector/list erasure strategies, cache locality, and linear-time alternatives.",suggestedTopics:["cpp","std-vector","std-list","benchmark","cache-locality","data-structures"]},{name:"List-Vector",language:"C++",description:"Small C++ examples of breadth-first traversal over an n-ary tree using std::queue.",details:{problem:"Demonstrate level-order traversal on an n-ary tree and compare plain and timed implementations.",architecture:["Node with child pointers","std::queue frontier","breadth-first traversal","recursive tree cleanup"],features:["Traverses each level by enqueueing child nodes","Includes a timed traversal variant using std::chrono","Frees the example tree recursively"],challenges:["Managing ownership of a raw-pointer tree in the sample","Measuring a very small traversal where output affects timing"],learned:["TODO: confirm the intended learning outcome or any measured performance conclusion"],technologies:["C++","std::queue","std::vector","std::chrono"],evidence:["parcours_largeur.cpp","queue.cpp","queuePerf.cpp"],screenshot:"TODO: capture example output if a visual is needed."},categories:["C++","data-structures","algorithms","BFS","STL"],suggestedDescription:"C++ examples of breadth-first traversal on an n-ary tree with std::queue and timing.",suggestedTopics:["cpp","breadth-first-search","std-queue","tree-traversal","data-structures"]}],E="systems-portfolio:github:v1",M=3600*1e3,R="https://api.github.com/users/Saad-programmer/repos?per_page=100",x="https://api.github.com/users/Saad-programmer",S=I,F=new Set(S.map(t=>t.name.toLowerCase()));function H(t){const e=S.find(a=>a.name.toLowerCase()===t.name.toLowerCase());return e?{...e,language:t.language??e.language,url:t.html_url,updatedAt:t.updated_at,stars:t.stargazers_count,apiTopics:t.topics}:null}function G(t){const e=new Map(t.filter(a=>F.has(a.name.toLowerCase())).map(a=>[a.name.toLowerCase(),a]));return S.map(a=>{const r=e.get(a.name.toLowerCase());return r?H(r):{...a,url:`https://github.com/Saad-programmer/${encodeURIComponent(a.name)}`,updatedAt:"",stars:0,apiTopics:[]}})}function _(t,e){const a=e.query.trim().toLowerCase();return t.filter(s=>{const i=[s.name,s.language,s.description,...s.categories,...s.apiTopics,...s.details.technologies].join(" ").toLowerCase();return(!a||i.includes(a))&&(e.language==="all"||s.language===e.language)&&(e.topic==="all"||s.categories.includes(e.topic)||s.apiTopics.includes(e.topic))}).sort((s,i)=>e.sort==="stars"?i.stars-s.stars||s.name.localeCompare(i.name):e.sort==="name"?s.name.localeCompare(i.name):Date.parse(i.updatedAt||"1970-01-01")-Date.parse(s.updatedAt||"1970-01-01"))}function N(t,e=Date.now()){try{const a=t.getItem(E);if(!a)return null;const r=JSON.parse(a);return typeof r.savedAt!="number"||e-r.savedAt>=M||!Array.isArray(r.repositories)||typeof r.profile?.followers!="number"||typeof r.profile?.public_repos!="number"?null:r}catch{return null}}function B(){return{projects:G([]),followers:null,publicRepos:null,source:"fallback"}}function U(t){return{projects:G(t.repositories),followers:t.profile.followers,publicRepos:t.profile.public_repos,source:"cache"}}async function V(t=localStorage,e=fetch,a=Date.now()){const r=N(t,a);if(r)return U(r);try{const[s,i]=await Promise.all([e(R,{headers:{Accept:"application/vnd.github+json"}}),e(x,{headers:{Accept:"application/vnd.github+json"}})]);if(!s.ok||!i.ok)throw new Error("GitHub request failed");const o=await s.json(),b=await i.json(),P={savedAt:a,repositories:o,profile:b};try{t.setItem(E,JSON.stringify(P))}catch{}return{projects:G(o),followers:b.followers,publicRepos:b.public_repos,source:"live"}}catch{return B()}}function Y(t){return t==="light"?"light":"dark"}const j=document.querySelector("#app");if(!j)throw new Error("Portfolio root element was not found.");const z="/images/user.jpeg",K=Y(localStorage.getItem("theme"));document.documentElement.dataset.theme=K;j.innerHTML=`
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
            <a class="button button-quiet" href="/resume/cv-saad.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
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
          <div class="about-portrait"><img src="${z}" alt="Saad AIT YAHIA" width="1024" height="1024" loading="lazy" /></div>
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
        <a href="/resume/cv-saad.pdf" download><span>Résumé · English</span><span>PDF ↓</span></a>
        <a href="/resume/cv-saad-fr.pdf" download><span>Résumé · French</span><span>PDF ↓</span></a>
        <a href="/resume/cv-saad.docx" download><span>Résumé · English source</span><span>DOCX ↓</span></a>
        <a href="/resume/cv-saad-fr.docx" download><span>Résumé · French source</span><span>DOCX ↓</span></a>
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
`;const h=document.querySelector(".theme-toggle"),v=document.querySelector("#project-grid"),u=document.querySelector("#project-status"),k=document.querySelector("#project-search"),T=document.querySelector("#language-filter"),g=document.querySelector("#topic-filter"),f=document.querySelector("#project-sort"),c=document.querySelector("#project-dialog");let p=[];function q(t){if(document.documentElement.dataset.theme=t,localStorage.setItem("theme",t),h){const e=t==="dark"?"light":"dark";h.setAttribute("aria-label",`Switch to ${e} theme`);const a=h.querySelector(".theme-label");a&&(a.textContent=`${e==="light"?"Light":"Dark"} mode`)}}q(K);h?.addEventListener("click",()=>{q(document.documentElement.dataset.theme==="dark"?"light":"dark")});function n(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e)}function C(){if(!v||!u||!k||!T||!g||!f)return;const t=_(p,{query:k.value,language:T.value,topic:g.value,sort:f.value});u.textContent=`${t.length} source-reviewed repositories · sorted by ${f.selectedOptions[0]?.text.toLowerCase()??"updated"}`,v.innerHTML=t.length?t.map(e=>`
      <article class="project-card">
        <div class="project-card-top">
          <div>
            <h3>${n(e.name)}</h3>
            <div class="project-meta"><span>${n(e.language)}</span><span>${e.stars} ★</span><span>${e.updatedAt?`updated ${n(new Date(e.updatedAt).toLocaleDateString())}`:"API details unavailable"}</span></div>
          </div>
          <span class="project-index">${String(p.indexOf(e)+1).padStart(2,"0")}</span>
        </div>
        <p class="project-description">${n(e.description)}</p>
        <div class="topic-list">${[...new Set([...e.categories,...e.apiTopics])].map(a=>`<span class="topic-tag">${n(a)}</span>`).join("")}</div>
        <div class="project-card-actions">
          <button type="button" data-project="${n(e.name)}">Inspect architecture <span aria-hidden="true">→</span></button>
          <a href="${n(e.url)}" target="_blank" rel="noreferrer">Repository ↗</a>
        </div>
      </article>
    `).join(""):'<p class="empty-state">No projects match those filters.</p>',v.querySelectorAll("[data-project]").forEach(e=>{e.addEventListener("click",()=>W(e.dataset.project??""))})}function W(t){const e=p.find(i=>i.name===t);if(!e||!c)return;const a=e.details,r=a.architecture.map((i,o)=>`${o?'<b aria-hidden="true">→</b>':""}<span>${n(i)}</span>`).join(""),s=a.evidence.map(i=>`<li><a href="${n(`${e.url}/blob/main/${i}`)}" target="_blank" rel="noreferrer">${n(i)}</a></li>`).join("");c.innerHTML=`
    <div class="dialog-content">
      <div class="dialog-top"><div><p class="section-kicker">SOURCE REVIEW · ${n(e.language)}</p><h2 id="dialog-title">${n(e.name)}</h2></div><button class="dialog-close" type="button" aria-label="Close project details">×</button></div>
      <p class="dialog-lede">${n(e.description)}</p>
      <section class="detail-section"><h3>Problem</h3><p>${n(a.problem)}</p></section>
      <section class="detail-section"><h3>Architecture</h3><div class="architecture" aria-label="${n(a.architecture.join(" then "))}">${r}</div></section>
      <section class="detail-section"><h3>Verified features</h3><ul>${a.features.map(i=>`<li>${n(i)}</li>`).join("")}</ul></section>
      <section class="detail-section"><h3>Engineering challenges</h3><ul>${a.challenges.map(i=>`<li>${n(i)}</li>`).join("")}</ul></section>
      <section class="detail-section"><h3>What this project demonstrates</h3><ul>${a.learned.map(i=>`<li>${n(i)}</li>`).join("")}</ul></section>
      <section class="detail-section"><h3>Technologies</h3><p>${a.technologies.map(n).join(" · ")}</p></section>
      <section class="detail-section"><h3>Source reviewed</h3><ul>${s}</ul></section>
      <section class="detail-section"><h3>Visuals</h3><div class="screenshot-todo">${n(a.screenshot)}</div></section>
      <section class="detail-section"><h3>Suggested GitHub description</h3><p>${n(e.suggestedDescription)}</p><h3>Suggested GitHub topics</h3><div class="topic-list">${e.suggestedTopics.map(i=>`<span class="topic-tag">${n(i)}</span>`).join("")}</div></section>
      <div class="dialog-links"><a href="${n(e.url)}" target="_blank" rel="noreferrer">Open repository ↗</a></div>
    </div>
  `,c.querySelector(".dialog-close")?.addEventListener("click",()=>c.close()),c.showModal()}for(const t of[k,T,g,f])t?.addEventListener("input",C),t?.addEventListener("change",C);c?.addEventListener("click",t=>{t.target===c&&c.close()});c?.addEventListener("click",t=>{const e=t.target;e instanceof HTMLAnchorElement&&(e.rel="noreferrer")});const X=[{label:"Comfortable · multiple codebases",id:"comfortable",skills:[{name:"C",proof:"GTK-Bekhocha · AquariumGTK · GTKFinalVers",href:"https://github.com/Saad-programmer/GTK-Bekhocha"},{name:"C++",proof:"TRackRS · container benchmark · BFS examples",href:"https://github.com/Saad-programmer/TRackRS"},{name:"GTK",proof:"three GTK interface/simulation repositories",href:"https://github.com/Saad-programmer/GTKFinalVers"}]},{label:"Learning · represented as exercises",id:"learning",skills:[{name:"STL containers",proof:"vector/list benchmark and queue examples",href:"https://github.com/Saad-programmer/std-LIST-std-VECTOR"},{name:"Tree traversal",proof:"n-ary breadth-first traversal examples",href:"https://github.com/Saad-programmer/List-Vector"}]},{label:"Daily use · TODO: confirm",id:"daily",skills:[{name:"Frequency of use",proof:"TODO: confirm daily-use tools"},{name:"Linux, Bash, build/debug tools",proof:"TODO: confirm current use and repository evidence"},{name:"Assembly, Make/CMake, GDB, Valgrind",proof:"TODO: confirm experience"}]}],m=document.querySelector("#skill-grid");m&&(m.innerHTML=`
    <div class="skill-filters" role="group" aria-label="Filter skills by evidence tier">
      <button type="button" class="skill-filter is-active" data-skill-filter="all" aria-pressed="true">All</button>
      <button type="button" class="skill-filter" data-skill-filter="comfortable" aria-pressed="false">Comfortable</button>
      <button type="button" class="skill-filter" data-skill-filter="learning" aria-pressed="false">Learning</button>
      <button type="button" class="skill-filter" data-skill-filter="daily" aria-pressed="false">TODO</button>
    </div>
    <div class="skill-cards">
      ${X.map(t=>`
    <section class="skill-tier" data-tier="${t.id}" data-skill-card="${t.id}">
      <h3>${n(t.label)}</h3>
      <ul>${t.skills.map(e=>`<li>${n(e.name)} ${e.href?`<a href="${n(e.href)}" target="_blank" rel="noreferrer">${n(e.proof)}</a>`:`<span class="skill-todo">${n(e.proof)}</span>`}</li>`).join("")}</ul>
    </section>
  `).join("")}
    </div>
  `);m?.querySelectorAll("[data-skill-filter]").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.skillFilter??"all";m.querySelectorAll("[data-skill-filter]").forEach(a=>{const r=a===t;a.classList.toggle("is-active",r),a.setAttribute("aria-pressed",String(r))}),m.querySelectorAll("[data-skill-card]").forEach(a=>{a.hidden=e!=="all"&&a.dataset.skillCard!==e})})});const y=document.querySelector("#typed-focus"),A=["Building systems one layer at a time.","C and C++ with curiosity.","Understanding the machine beneath."];if(y&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){const t=a=>new Promise(r=>window.setTimeout(r,a));(async()=>{let a=0;for(;;){const r=A[a%A.length]??"";for(let s=0;s<=r.length;s+=1)y.textContent=r.slice(0,s),await t(42);await t(1500);for(let s=r.length;s>=0;s-=1)y.textContent=r.slice(0,s),await t(22);a+=1}})()}const O="TODO: add Web3Forms access key",w=document.querySelector("#contact-form"),d=document.querySelector("#form-status");w?.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(w);if(e.get("botcheck"))return;const a=String(e.get("name")??""),r=String(e.get("email")??""),s=String(e.get("message")??"");if(O.startsWith("TODO:")){const i=encodeURIComponent(`Portfolio message from ${a}`),o=encodeURIComponent(`${s}

From: ${a} (${r})`);window.location.href=`mailto:saadaityahiasaw789@gmail.com?subject=${i}&body=${o}`,d&&(d.textContent="Opening your email app to send this message.");return}e.set("access_key",O);try{const i=await fetch("https://api.web3forms.com/submit",{method:"POST",body:e}),o=await i.json();if(!i.ok||!o.success)throw new Error(o.message??"Message could not be sent.");w.reset(),d&&(d.textContent="Message sent. Thanks for getting in touch.")}catch{d&&(d.textContent="The form service is unavailable. Use the email link below instead.")}});const[l]=await Promise.all([V()]);p=l.projects;u&&(u.dataset.source=l.source,u.textContent=`${p.length} source-reviewed repositories · ${l.source==="fallback"?"offline project catalog":`GitHub ${l.source} data`}`);const L=document.querySelector("#github-followers"),$=document.querySelector("#github-repos"),D=document.querySelector("#github-status");L&&(L.textContent=l.followers?.toLocaleString()??"—");$&&($.textContent=l.publicRepos?.toLocaleString()??"—");D&&(D.textContent=l.source==="fallback"?"GitHub API unavailable · cached catalog":`GitHub ${l.source} · refreshed hourly`);if(g){const t=[...new Set(p.flatMap(e=>[...e.categories,...e.apiTopics]))].sort();g.insertAdjacentHTML("beforeend",t.map(e=>`<option value="${n(e)}">${n(e)}</option>`).join(""))}C();
