import { eraseValue, getContainerDescription, insertValue, resizeValues, type ContainerKind, type ContainerState } from '../demos/containers';
import { getMemoryStep, leakExample, memorySteps, danglingExample } from '../demos/heap';
import { calculateStructLayout, FIELD_TYPES, type StructField } from '../demos/structLayout';
import { createSortFrames, makeRandomValues, sortInfo, type SortAlgorithm } from '../demos/sorting';

export function systemsLabMarkup(): string {
  return `
    <section class="lab-section section-wrap" id="systems-lab" aria-labelledby="lab-title">
      <div class="section-kicker"><span>04</span> SYSTEMS LAB</div>
      <div class="section-heading"><h2 id="lab-title">See the machine at work<span>.</span></h2><p>Small models, explicit assumptions, and controls you can step through.</p></div>
      <div class="lab-grid">
        <article class="lab-demo" aria-labelledby="memory-demo-title">
          <div class="lab-demo-head"><span>01 / MEMORY</span><h3 id="memory-demo-title">Stack, heap & lifetime</h3></div>
          <p class="lab-explanation">A local pointer lives in the current stack frame; <code>malloc</code> reserves storage separately. <code>free</code> releases that storage but does not clear copies of its address.</p>
          <svg class="lab-svg" id="memory-map" viewBox="0 0 640 190" role="img" aria-label="Stack and heap memory diagram"></svg>
          <p class="lab-live" id="memory-step-label" aria-live="polite"></p>
          <div class="lab-controls"><button type="button" id="memory-prev" aria-label="Previous memory step">← Previous</button><span id="memory-step-count">Step 1 of 3</span><button type="button" id="memory-next">Next →</button></div>
          <div class="example-grid"><div><h4>Leak example</h4><pre><code>${leakExample}</code></pre></div><div><h4>Dangling pointer example</h4><pre><code>${danglingExample}</code></pre></div></div>
        </article>

        <article class="lab-demo" aria-labelledby="container-demo-title">
          <div class="lab-demo-head"><span>02 / CONTAINERS</span><h3 id="container-demo-title">Vector vs list</h3></div>
          <p class="lab-explanation">Both store a sequence, but their layouts differ. This visual model links directly to your measured <a href="https://github.com/Saad-programmer/std-LIST-std-VECTOR" target="_blank" rel="noreferrer">vector/list benchmark</a>.</p>
          <div class="segmented-control" role="group" aria-label="Container type"><button type="button" data-container-kind="vector" aria-pressed="true">std::vector</button><button type="button" data-container-kind="list" aria-pressed="false">std::list</button></div>
          <svg class="lab-svg" id="container-map" viewBox="0 0 720 140" role="img" aria-label="Container memory layout"></svg>
          <p class="lab-live" id="container-description" aria-live="polite"></p>
          <div class="lab-controls lab-controls-wrap"><label>Value<input id="container-value" type="number" value="99" min="-999" max="999" /></label><button type="button" id="container-insert">Insert middle</button><button type="button" id="container-erase">Erase first</button><button type="button" id="container-resize">Resize +1</button></div>
          <p class="lab-complexity" id="container-count"></p>
        </article>

        <article class="lab-demo" aria-labelledby="sort-demo-title">
          <div class="lab-demo-head"><span>03 / ALGORITHMS</span><h3 id="sort-demo-title">Sorting visualizer</h3></div>
          <p class="lab-explanation">Compare operation growth. The animation shows the chosen algorithm’s intermediate states; complexity describes general input sizes, not this small sample.</p>
          <div class="lab-controls lab-controls-wrap"><label>Algorithm<select id="sort-algorithm"><option value="bubble">Bubble sort</option><option value="insertion">Insertion sort</option><option value="merge">Merge sort</option></select></label><label>Speed<input id="sort-speed" type="range" min="1" max="30" value="18" /><span id="sort-speed-value">18</span></label><button type="button" id="sort-start">Sort values</button><button type="button" id="sort-reset">Shuffle</button></div>
          <canvas class="sort-canvas" id="sort-canvas" width="720" height="210" role="img" aria-label="Sorting bar chart"></canvas>
          <p class="lab-live" id="sort-live" aria-live="polite"></p>
          <p class="lab-complexity" id="sort-complexity"></p>
          <p class="visually-hidden" id="sort-values"></p>
        </article>

        <article class="lab-demo" aria-labelledby="layout-demo-title">
          <div class="lab-demo-head"><span>04 / MEMORY LAYOUT</span><h3 id="layout-demo-title">Struct padding & alignment</h3></div>
          <p class="lab-explanation">Fields may need aligned offsets; padding can appear between fields and at the end. Sizes and alignments here are explicit teaching values, not a guarantee for every compiler ABI.</p>
          <div class="field-editor" id="field-editor" aria-label="Editable struct fields"></div>
          <div class="lab-controls lab-controls-wrap"><label>Add field<select id="field-type"></select></label><button type="button" id="field-add">Add field</button></div>
          <svg class="layout-svg" id="struct-map" role="img" aria-label="Struct byte offsets and padding"></svg>
          <p class="lab-live" id="struct-summary" aria-live="polite"></p>
        </article>
      </div>
    </section>
  `;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character] ?? character);
}

function mountMemoryDemo(root: ParentNode): void {
  const svg = root.querySelector<SVGSVGElement>('#memory-map');
  const label = root.querySelector<HTMLParagraphElement>('#memory-step-label');
  const count = root.querySelector<HTMLSpanElement>('#memory-step-count');
  const previous = root.querySelector<HTMLButtonElement>('#memory-prev');
  const next = root.querySelector<HTMLButtonElement>('#memory-next');
  if (!svg || !label || !count || !previous || !next) return;

  let index = 0;
  const render = (): void => {
    const step = getMemoryStep(index);
    const stackCells = step.stack.map((item, cell) => `<g><rect x="24" y="${52 + cell * 36}" width="276" height="28" rx="2" class="memory-stack-cell"/><text x="36" y="${70 + cell * 36}">${escapeXml(item)}</text></g>`).join('');
    const heapCells = step.heap.map((item, cell) => `<g><rect x="340" y="${52 + cell * 36}" width="276" height="28" rx="2" class="memory-heap-cell"/><text x="352" y="${70 + cell * 36}">${escapeXml(item)}</text></g>`).join('');
    svg.innerHTML = `<title>Step ${index + 1}: stack and heap</title><text x="24" y="28" class="memory-heading">STACK FRAME</text><text x="340" y="28" class="memory-heading">HEAP ALLOCATION</text>${stackCells || '<text x="24" y="70">No active frame</text>'}${heapCells || '<text x="340" y="70">No live allocation</text>'}<text x="24" y="174" class="memory-pointer">${escapeXml(step.pointer)}</text>`;
    svg.setAttribute('aria-label', step.label);
    label.textContent = step.label;
    count.textContent = `Step ${index + 1} of ${memorySteps.length}`;
    previous.disabled = index === 0;
    next.disabled = index === memorySteps.length - 1;
  };
  previous.addEventListener('click', () => { index = Math.max(0, index - 1); render(); });
  next.addEventListener('click', () => { index = Math.min(memorySteps.length - 1, index + 1); render(); });
  render();
}

function mountContainerDemo(root: ParentNode): void {
  const svg = root.querySelector<SVGSVGElement>('#container-map');
  const description = root.querySelector<HTMLParagraphElement>('#container-description');
  const count = root.querySelector<HTMLParagraphElement>('#container-count');
  const value = root.querySelector<HTMLInputElement>('#container-value');
  if (!svg || !description || !count || !value) return;

  let state: ContainerState = { kind: 'vector', values: [12, 24, 36, 48] };
  const render = (): void => {
    const nodes = state.values.map((item, index) => {
      const x = 25 + index * 112;
      const shape = state.kind === 'vector'
        ? `<rect x="${x}" y="48" width="92" height="48" rx="2" class="vector-cell"/><text x="${x + 46}" y="77" text-anchor="middle">${item}</text>`
        : `<rect x="${x}" y="48" width="76" height="48" rx="2" class="list-cell"/><text x="${x + 38}" y="77" text-anchor="middle">${item}</text><text x="${x + 38}" y="110" text-anchor="middle" class="node-label">node ${index}</text>${index < state.values.length - 1 ? `<path d="M${x + 76} 72 H${x + 105}" class="list-link" marker-end="url(#arrowhead)"/>` : ''}`;
      return shape;
    }).join('');
    svg.innerHTML = `<title>${state.kind === 'vector' ? 'Contiguous vector elements' : 'Linked list nodes and pointers'}</title><defs><marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" class="arrowhead"/></marker></defs>${nodes || '<text x="24" y="72">Empty container</text>'}`;
    svg.setAttribute('viewBox', `0 0 ${Math.max(720, 40 + state.values.length * 112)} 140`);
    svg.setAttribute('aria-label', `${state.kind}, values ${state.values.join(', ') || 'empty'}`);
    description.textContent = getContainerDescription(state.kind);
    count.textContent = `${state.values.length} elements · ${state.kind === 'vector' ? 'contiguous storage' : 'separate linked nodes'}`;
    root.querySelectorAll<HTMLButtonElement>('[data-container-kind]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.containerKind === state.kind));
    });
  };

  root.querySelectorAll<HTMLButtonElement>('[data-container-kind]').forEach((button) => {
    button.addEventListener('click', () => { state = { ...state, kind: button.dataset.containerKind as ContainerKind }; render(); });
  });
  root.querySelector('#container-insert')?.addEventListener('click', () => {
    state = insertValue(state, Math.floor(state.values.length / 2), Number(value.value) || 0); render();
  });
  root.querySelector('#container-erase')?.addEventListener('click', () => { state = eraseValue(state, 0); render(); });
  root.querySelector('#container-resize')?.addEventListener('click', () => { state = resizeValues(state, state.values.length + 1); render(); });
  render();
}

function mountSortingDemo(root: ParentNode): void {
  const canvas = root.querySelector<HTMLCanvasElement>('#sort-canvas');
  const algorithm = root.querySelector<HTMLSelectElement>('#sort-algorithm');
  const speed = root.querySelector<HTMLInputElement>('#sort-speed');
  const speedLabel = root.querySelector<HTMLSpanElement>('#sort-speed-value');
  const live = root.querySelector<HTMLParagraphElement>('#sort-live');
  const complexity = root.querySelector<HTMLParagraphElement>('#sort-complexity');
  const valuesText = root.querySelector<HTMLParagraphElement>('#sort-values');
  if (!canvas || !algorithm || !speed || !speedLabel || !live || !complexity || !valuesText) return;

  let values = makeRandomValues(24);
  let animationToken = 0;
  const draw = (frame: number[]): void => {
    const context = canvas.getContext('2d');
    if (!context) return;
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.scale(ratio, ratio);
    context.clearRect(0, 0, width, height);
    const style = getComputedStyle(document.documentElement);
    const barColor = style.getPropertyValue('--cyan').trim() || '#00b4d8';
    const textColor = style.getPropertyValue('--muted').trim() || '#8b949e';
    const gap = 4;
    const barWidth = Math.max(2, (width - gap * (frame.length - 1)) / frame.length);
    const maximum = Math.max(...frame, 1);
    frame.forEach((item, index) => {
      const barHeight = (item / maximum) * (height - 30);
      const x = index * (barWidth + gap);
      context.fillStyle = barColor;
      context.fillRect(x, height - barHeight - 20, barWidth, barHeight);
    });
    context.fillStyle = textColor;
    context.font = '10px monospace';
    context.fillText(`${frame.length} values · range 1–100`, 3, 12);
    canvas.setAttribute('aria-label', `Sorted values visualized as bars: ${frame.join(', ')}`);
    valuesText.textContent = `Current values: ${frame.join(', ')}`;
  };
  const updateComplexity = (): void => {
    const info = sortInfo[algorithm.value as SortAlgorithm];
    complexity.textContent = `${info.name} · time ${info.time} · extra space ${info.space} · ${info.stable}`;
  };

  algorithm.addEventListener('change', updateComplexity);
  speed.addEventListener('input', () => { speedLabel.textContent = speed.value; });
  root.querySelector('#sort-reset')?.addEventListener('click', () => {
    animationToken += 1;
    values = makeRandomValues(24);
    draw(values);
    live.textContent = 'New unsorted values generated.';
  });
  root.querySelector('#sort-start')?.addEventListener('click', async () => {
    const token = ++animationToken;
    const chosen = algorithm.value as SortAlgorithm;
    const frames = createSortFrames(values, chosen);
    const delay = Math.max(15, 180 - Number(speed.value) * 5);
    for (const frame of frames) {
      if (token !== animationToken) return;
      draw(frame);
      await new Promise((resolve) => window.setTimeout(resolve, delay));
    }
    values = frames.at(-1) ?? values;
    live.textContent = `${sortInfo[chosen].name} complete.`;
  });
  updateComplexity();
  draw(values);
}

function mountStructDemo(root: ParentNode): void {
  const editor = root.querySelector<HTMLDivElement>('#field-editor');
  const select = root.querySelector<HTMLSelectElement>('#field-type');
  const svg = root.querySelector<SVGSVGElement>('#struct-map');
  const summary = root.querySelector<HTMLParagraphElement>('#struct-summary');
  if (!editor || !select || !svg || !summary) return;

  let nextId = 5;
  let fields: StructField[] = [
    { ...FIELD_TYPES[0]!, id: 1 },
    { ...FIELD_TYPES[2]!, id: 2 },
    { ...FIELD_TYPES[3]!, id: 3 },
    { ...FIELD_TYPES[1]!, id: 4 },
  ];
  select.innerHTML = FIELD_TYPES.map((field, index) => `<option value="${index}">${field.name} · ${field.size} byte${field.size > 1 ? 's' : ''}, align ${field.alignment}</option>`).join('');

  const render = (): void => {
    const layout = calculateStructLayout(fields);
    editor.innerHTML = fields.map((field) => `<span class="field-chip">${field.name}<button type="button" data-remove-field="${field.id}" aria-label="Remove ${field.name}">×</button></span>`).join('') || '<span class="lab-live">Add a field to begin.</span>';
    const cells: (string | null)[] = Array.from({ length: layout.size }, () => null);
    layout.fields.forEach((field) => {
      for (let byte = field.offset; byte < field.offset + field.size; byte += 1) cells[byte] = field.name;
    });
    const columns = 8;
    const width = columns * 76;
    const rows = Math.max(1, Math.ceil(cells.length / columns));
    const rectangles = cells.map((field, index) => {
      const x = (index % columns) * 76;
      const y = Math.floor(index / columns) * 54;
      return `<g><rect x="${x + 2}" y="${y + 2}" width="71" height="48" rx="2" class="${field ? 'byte-field' : 'byte-padding'}"/><text x="${x + 7}" y="${y + 18}" class="byte-offset">+${index}</text><text x="${x + 7}" y="${y + 37}" class="byte-name">${escapeXml(field ?? 'padding')}</text></g>`;
    }).join('');
    svg.setAttribute('viewBox', `0 0 ${width} ${rows * 54}`);
    svg.setAttribute('aria-label', `Struct size ${layout.size} bytes, alignment ${layout.alignment}; ${cells.map((field) => field ?? 'padding').join(', ')}`);
    svg.innerHTML = `<title>Struct byte layout</title>${rectangles}`;
    summary.textContent = `sizeof(struct) = ${layout.size} bytes · alignment = ${layout.alignment} · tail padding = ${layout.tailPadding} bytes`;
    editor.querySelectorAll<HTMLButtonElement>('[data-remove-field]').forEach((button) => {
      button.addEventListener('click', () => { fields = fields.filter((field) => field.id !== Number(button.dataset.removeField)); render(); });
    });
  };
  root.querySelector('#field-add')?.addEventListener('click', () => {
    const fieldType = FIELD_TYPES[Number(select.value)];
    if (!fieldType || fields.length >= 12) return;
    fields = [...fields, { ...fieldType, id: nextId++ }];
    render();
  });
  render();
}

export function mountSystemsLab(root: ParentNode = document): void {
  mountMemoryDemo(root);
  mountContainerDemo(root);
  mountSortingDemo(root);
  mountStructDemo(root);
}