import {coordinateScene} from './coordinates.js';
import {openGraphInspector} from './graph-inspector.js';
import {mountLabs} from './labs.js';
import {mountVisuals,extraNames} from './visuals.js';
import {parseNumericAnswer} from './math.js';
const navItems=[['overview','Course overview'],['motion','Position & average velocity'],['functions','Functions & domains'],['composition','Composition & inverses'],['families','Elementary functions'],['trigonometry','Trigonometry & waves'],['binomial','Binomial theorem'],['return','Change & approximation'],['practice','Exercises'],['reference','Identity reference'],['sources','Sources & assumptions']];
const main=document.querySelector('main'),sidebar=document.querySelector('.sidebar'),menu=document.querySelector('#menu-toggle'),scrim=document.querySelector('#menu-scrim');
const safe=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const storage={get(k,f=''){try{return localStorage.getItem(k)??f;}catch{return f;}},set(k,v){try{localStorage.setItem(k,v);return true;}catch{return false;}}};
let data,boards,glossary,glossaryTrigger;
document.querySelector('#chapter-nav').innerHTML=`<p class="nav-label">Lesson 01</p>${navItems.slice(0,8).map(([id,label])=>`<a class="nav-link" href="#/${id}" data-page="${id}">${label}</a>`).join('')}<p class="nav-label">Resources</p>${navItems.slice(8).map(([id,label])=>`<a class="nav-link" href="#/${id}" data-page="${id}">${label}</a>`).join('')}`;
function closeMenu(focus=false){sidebar.classList.remove('is-open');menu.setAttribute('aria-expanded','false');scrim.hidden=true;if(focus)menu.focus();}
menu.addEventListener('click',()=>{const open=!sidebar.classList.contains('is-open');sidebar.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));scrim.hidden=!open;if(open)sidebar.querySelector('.nav-link.active')?.focus();});scrim.addEventListener('click',()=>closeMenu(true));
function header(eyebrow,title){return `<header class="board-header"><span class="eyebrow">${eyebrow}</span><h1>${safe(title)}</h1></header>`;}
const shortTitles={data:'Definition',representations:'Graphs & data',restrictions:'Domain conditions',equality:'Equality & extension',compose:'Composition',outer:'Nested domains',inverse:'Inverses',atlas:'Families',increments:'Equal steps','exponent-log':'Exponentials & logs','log-laws':'Log laws','identity-domains':'Identity domains',circle:'Unit circle',addition:'Addition formulas',derived:'Related identities',waves:'Waves',count:'Counting choices',coefficient:'One coefficient',increment:'Small changes',average:'Average velocity',local:'Linear approximation'};
function nextChapter(id){const i=navItems.findIndex(x=>x[0]===id),n=navItems[i+1];return n?`<a class="primary" href="#/${n[0]}">${safe(n[1])}</a>`:'';}
function overview() {
  const stages = [
    ['Functions', 'Meeting 01', 'Use s(t) = t² to assign a position to each time t ≥ 0.'],
    ['Limits and continuity', 'Meeting 02', 'Ask what the average velocities do as the time increment approaches zero.'],
    ['Differentiation', 'Meetings 03–05', 'Use that limiting rate to define and find instantaneous velocity.'],
    ['Approximation', 'Meeting 06', 'Use the local rate to predict short changes. Taylor’s theorem will refine this idea.'],
    ['Integration', 'Meetings 09–13', 'Reverse the question: given velocity, how much position change accumulates?'],
  ];
  main.innerHTML = header('Calculus I · Lesson 01', 'How does a function describe change?') + `
    <div class="overview-board">
      <section class="overview-introduction">
        <h2>Position at a time, velocity over an interval</h2>
        <p>Suppose an object’s position in metres at time <i>t</i> seconds is <strong><i>s</i>(<i>t</i>) = <i>t</i>²</strong>, for <i>t</i> ≥ 0.</p>
        <p>Positions at two times give an average velocity. What could those averages tell us about the velocity at a single time?</p>
        <p>To answer, we first need to know which inputs the function accepts, how functions combine, and which algebraic changes preserve their values.</p>
        <a class="primary start-link" href="#/motion">Explore the motion model</a>
      </section>
      <section class="course-route">
        <h2>Follow the same model through Calculus I</h2>
        <ol class="motion-roadmap">
          ${stages.map(([name, meetings, description]) => `
            <li><div><strong>${name}</strong><small>${meetings}</small></div><p>${description}</p></li>
          `).join('')}
        </ol>
        <details class="compact-details">
          <summary>Full syllabus sequence and applications</summary>
          <div class="detail-body prose">${data.pages.overview.roadmap}</div>
        </details>
      </section>
    </div>
    <section class="lesson-index">
      <h2>Lesson 1 topics</h2>
      <div>${navItems.slice(2, 7).map(([id, title]) => `<a href="#/${id}">${title}<small>${boards[id].length} subtopics</small></a>`).join('')}</div>
      <details class="compact-details"><summary>Learning outcomes</summary><div class="detail-body prose">${data.pages.overview.outcomes}</div></details>
    </section>`;
}

function activityMarkup(activity, visible = false) {
  if (!activity) return '';
  const body = `${activity.prompt}
    <details class="compact-details"><summary>Strategy hint</summary>${activity.hint}</details>
    <details class="compact-details"><summary>Reference argument</summary>${activity.solution}</details>`;
  if (visible) return `<section class="board-activity prose"><h2>${safe(activity.title)}</h2>${body}</section>`;
  return `<details class="full-explanation"><summary>${safe(activity.title)}</summary><div class="detail-body prose">${body}</div></details>`;
}

function readingMarkup(reading) {
  function panelMarkup(panel) {
    return `<details class="reading-panel reading-${panel.tone}" name="topic-reading">
      <summary><span class="reading-kind">${({example:'Worked example',condition:'Check the conditions',definition:'Definition',reasoning:'Reasoning'})[panel.tone]}</span>
        <span class="reading-question">${safe(panel.title)}</span>
      </summary>
      <div class="reading-body prose">
        ${panel.html}
        ${(panel.more || []).map(item => `<details class="reading-step">
          <summary>${safe(item.title)}</summary>
          <div>${item.html}</div>
        </details>`).join('')}
      </div>
    </details>`;
  }
  return `<section class="reading-section" aria-label="Explore the reasoning">
    <div class="reading-lead">
      <h2>${safe(reading.title)}</h2>
      ${reading.lead}
    </div>
    <div class="reading-panels">${reading.panels.map(panelMarkup).join('')}</div>
  </section>`;
}

const relatedExercises = {
  data: [1, 2], representations: [1], restrictions: [3], equality: [2, 11],
  compose: [4], outer: [3], inverse: [5, 12],
  increments: [6], 'exponent-log': [6], 'log-laws': [7], 'identity-domains': [7],
  circle: [8], waves: [8], coefficient: [9], increment: [10], local: [10]
};

function relatedPractice(boardKey) {
  const numbers = relatedExercises[boardKey];
  if (!numbers) return '';
  return `<section class="related-practice" aria-labelledby="related-practice-title">
    <h2 id="related-practice-title">Apply the idea</h2>
    ${numbers.map(number => {
      const problem = data.problems.find(item => item.number === number);
      return `<details class="reading-panel reading-example" name="board-practice">
        <summary><span class="reading-question">Exercise ${number} · ${safe(problem.title)}</span></summary>
        <div class="reading-body prose">
          ${problem.prompt}
          <details class="reading-step"><summary>Strategy hint</summary><div>${problem.hints[0]}</div></details>
          <details class="reading-step"><summary>Next hint</summary><div>${problem.hints[1]}</div></details>
          <details class="reading-step"><summary>Worked solution</summary><div>${problem.solution}</div></details>
          <p class="practice-workspace-link"><a href="#/practice/${number}">Open exercise workspace</a></p>
        </div>
      </details>`;
    }).join('')}
  </section>`;
}

function chapter(id, topic) {
  const list = boards[id];
  const index = Math.max(0, list.findIndex(board => board.key === topic));
  const board = list[index];
  const visualAttribute = extraNames.includes(board.visual) ? 'data-extra' : 'data-lab';
  const staticVisual = board.visual === 'log-proof';
  const next = list[index + 1];
  const previous = list[index - 1];
  const connection = board.connection
    ? `<p class="course-connection"><strong>Later in Calculus I · ${safe(board.connection[0])}</strong> ${safe(board.connection[1])}</p>`
    : '';
  const transition = board.transition
    ? `<p class="chapter-transition">${safe(board.transition[0])} <a href="${board.transition[1]}">${safe(board.transition[2])}</a></p>`
    : '';

  main.innerHTML = `<nav class="topic-tabs" aria-label="Subtopics">${list.map(item => `
     <a href="#/${id}/${item.key}" ${item === board ? 'aria-current="page"' : ''}>${safe(shortTitles[item.key] || item.title)}</a>
  `).join('')}</nav>` + header(`Lesson 01 · ${safe(navItems.find(item => item[0] === id)[1])}`, board.title) + `
    <div class="learning-board">
      <section class="board-argument" aria-label="Mathematical reasoning">${board.argument}${connection}</section>
      <section class="board-visual" aria-label="Supporting investigation">
        <p class="visual-question">${safe(board.prompt)}</p>
        <div class="visual-mount">
          <div class="lab-host" ${visualAttribute}="${board.visual}"></div>
        </div>
      </section>
    </div>
    ${board.after_visual ? `<section class="proof-conclusion prose" aria-label="Mathematical justification">${board.after_visual}</section>` : ''}
    ${readingMarkup(board.reading)}
    ${activityMarkup(board.activity, id === 'return')}
    ${relatedPractice(board.key)}
    ${transition}
    <nav class="board-bottom" aria-label="Continue lesson"><span>Subtopic ${index + 1} of ${list.length}</span>
      <div>
        ${previous ? `<a href="#/${id}/${previous.key}">Previous subtopic</a>` : ''}
        ${next ? `<a class="primary" href="#/${id}/${next.key}">${safe(shortTitles[next.key] || next.title)}</a>` : nextChapter(id)}
      </div>
    </nav>`;

  const mount = main.querySelector('.visual-mount');
  const host = mount.querySelector('.lab-host');
  const tools = document.createElement('div');
  tools.className = 'visual-tools';
  mount.prepend(tools);
  function loadVisual() {
    // Replace the host on reset to release listeners and reset all widget state.
    const freshHost = hostForReset();
    mountLabs(mount);
    mountVisuals(mount);
    compactLab(freshHost);
    const figures = Array.from(freshHost.querySelectorAll('svg'));
    const visualLabel = figures.some(svg => coordinateScene(svg)) ? 'Explore graph' : 'Enlarge diagram';
    tools.innerHTML = `${figures.length ? '<button data-zoom>' + visualLabel + '</button>' : ''}
      ${staticVisual ? '' : '<button data-reset-visual>Reset activity</button>'}`;
    tools.querySelector('[data-reset-visual]')?.addEventListener('click', () => {
      loadVisual();
      tools.querySelector('[data-reset-visual]').focus();
    });
  }
  function hostForReset() {
    const freshHost = host.cloneNode(false);
    mount.querySelector('.lab-host').replaceWith(freshHost);
    return freshHost;
  }
  loadVisual();
}

function compactLab(host) {
  host.querySelectorAll('.prediction').forEach(element => {
    if (element.hasAttribute('data-before-plot')) {
      element.classList.add('prediction-first');
      element.parentElement.querySelector('.lab-head')?.after(element);
      return;
    }
    const details = document.createElement('details');
    details.className = 'reasoning-check';
    details.innerHTML = `<summary>${element.dataset.label || 'Check your reasoning'}</summary>`;
    element.before(details);
    details.append(element);
  });
  host.querySelectorAll('.lab-note').forEach(element => {
    if (!element.textContent.trim()) {
      element.remove();
      return;
    }
    const details = document.createElement('details');
    details.className = 'visual-note';
    details.innerHTML = `<summary>${element.dataset.label || 'Interpret the figure'}</summary><div>${element.innerHTML}</div>`;
    element.replaceWith(details);
  });
}
function resources(id){const p=data.pages[id];main.innerHTML=header('Lesson 01 · Reference',navItems.find(x=>x[0]===id)[1])+`<article class="prose resources">${id==='sources'?'<p class="resource-intro">Definitions and arguments follow the supplied master content. The source map below distinguishes proved results from assumed background.</p><a class="download-link" href="assets/lesson-notes.md" download="Calculus_I_Lesson_01_Notes.md">Download complete lesson notes</a>':''}${p.html}</article>`;main.querySelectorAll('.resources > .text-section').forEach((s,i)=>{const h=s.querySelector('h2'),d=document.createElement('details');d.className='reference-item';d.innerHTML=`<summary>${h?.innerHTML||'Reference '+(i+1)}</summary><div class="detail-body">${s.innerHTML}</div>`;d.querySelector('.detail-body h2')?.remove();s.replaceWith(d);});}
const rubrics={
 1:['Distinguish the listed inputs from an entire interval.','Give a different formula that matches the entries.','Identify the additional modelling assumption.'],
 2:['Retain x ≠ 1 before cancelling.','Compare both domains.','Explain restriction and extension explicitly.'],
 3:['Record the requirement of every operation.','Distinguish ≥ 0 from > 0.','Test the boundary points in the original expression.'],
 4:['Apply the inner function first.','Check that its output is accepted by the outer function.','Preserve the original domain after simplifying.'],
 5:['Show why recovery is not unique on ℝ.','Use the chosen interval to select a square-root sign.','Check both inverse identities and their domains.'],
 6:['Use equal steps to identify a fixed factor.','Take logarithms of positive quantities.','State the time unit and scope of the model.'],
 7:['Check whether both sides exist.','State a corrected domain where relevant.','Use a valid counterexample to disprove a universal equality.'],
 8:['Connect the inner angle to a full turn.','List every permitted cycle in the time interval.','Distinguish amplitude from angular frequency.'],
 9:['Use a consistent convention for k.','Match the exponent before evaluating the coefficient.','Check that k is an integer from 0 to 8.'],
 10:['Retain h ≠ 0 in the quotient.','Identify the cancelled constant term.','Distinguish the original function from its extension.'],
 11:['Retain the original denominator restriction.','Enforce a positive logarithm input.','Check the final candidate against the original domain.'],
 12:['Start from arbitrary ordered inputs.','Track each inequality through the composition.','Use g(J) ⊆ I to justify every evaluation.']
};

const guidedChecks = {
  3: {
    prompt: 'Which condition lets the logarithm accept its input?',
    options: [
      ['4 − x² ≥ 0', 'At x = 2 the inner value is 0. Can a real logarithm accept it?'],
      ['4 − x² > 0', 'This keeps the inner value positive and excludes both endpoints x = ±2.'],
      ['4 − x² ≥ 1', 'Try x = √(7/2). Its inner value is 1/2. Does the logarithm exist there?']
    ],
    correct: 1
  },
  4: {
    prompt: 'In g ∘ f, what determines whether we can start at x = −1?',
    options: [
      ['The domain of the inner square root', 'The first operation is f(−1) = √(−1), which has no real value.'],
      ['The domain of the outer polynomial', 'The polynomial only receives an input if the inner square root has a real value.'],
      ['The domain of the simplified line', 'Evaluate the first operation in the original composition before using the line.']
    ],
    correct: 0
  },
  5: {
    prompt: 'Which sign is forced for x − 2 on the branch x ≤ 2?',
    options: [
      ['Nonnegative', 'Check x = 1, which is permitted by the chosen branch.'],
      ['Nonpositive', 'Since x − 2 ≤ 0, the solution on this branch is x = 2 − √y.'],
      ['Either sign', 'The restriction x ≤ 2 selects only one side of the vertex.']
    ],
    correct: 1
  }
};

function choiceCheck(problem) {
  const check = guidedChecks[problem];
  if (!check) return '';
  return `<details class="compact-details guided-check">
    <summary>Check an intermediate decision</summary>
    <p>${check.prompt}</p>
    <div class="preset-row">
      ${check.options.map(([label], index) => `<button type="button" data-choice="${index}">${label}</button>`).join('')}
    </div>
    <div class="feedback" aria-live="polite"></div>
  </details>`;
}

function bindChoiceCheck(problem) {
  const check = guidedChecks[problem];
  if (!check) return;
  const region = main.querySelector('.guided-check');
  region.querySelectorAll('[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.choice);
      const feedback = region.querySelector('.feedback');
      feedback.textContent = check.options[index][1];
      feedback.classList.toggle('good', index === check.correct);
    });
  });
}

function stepCheck(n){
 if(n===9)return '<div class="step-check"><label for="step-9">Check one exact value: coefficient of x⁻⁴</label><div class="check-row"><input class="check-input" id="step-9" inputmode="decimal" placeholder="Your coefficient"><button data-step="9">Check value</button></div><div class="feedback" data-step-feedback="9" aria-live="polite"></div></div>';
 if(n===10)return '<div class="step-check"><label for="step-10">Check one exact value: the polynomial extension at h = 0</label><div class="check-row"><input class="check-input" id="step-10" inputmode="decimal" placeholder="Extension value"><button data-step="10">Check value</button></div><div class="feedback" data-step-feedback="10" aria-live="polite"></div></div>';
 if(n===11)return '<div class="step-check"><p class="micro">After simplifying, x = 1 appears as a candidate. What is your conclusion?</p><div class="preset-row"><button data-step="11" data-answer="yes">It is the solution</button><button data-step="11" data-answer="no">The original equation has no solution</button></div><div class="feedback" data-step-feedback="11" aria-live="polite"></div></div>';
 return '';
}
function practice(number=1){const p=data.problems.find(p=>p.number===+number)||data.problems[0];main.innerHTML=header('Lesson 01 · Exercises',p.title)+`<div class="exercise-picker"><label for="problem-select">Choose an exercise</label><select id="problem-select">${data.problems.map(q=>`<option value="${q.number}" ${q.number===p.number?'selected':''}>${String(q.number).padStart(2,'0')} · ${safe(q.title)}</option>`).join('')}</select><span>${safe(p.topic)}</span></div><div class="practice-board"><section class="exercise-question prose"><span class="card-label">Problem ${p.number} ${p.number>10?'· Further exploration':''}</span>${p.prompt.replace("This is the supplied Test 02, Question 1, followed by an original transfer part.","")}${p.number === 9 ? '<p class="exercise-source">The first part is from Test 02, Question 1. The follow-up is an original transfer question.</p>' : ''}${stepCheck(p.number)}${choiceCheck(p.number)}<details class="compact-details"><summary>What this exercise develops</summary><div>${p.purpose}</div></details></section><section class="exercise-support"><div class="support-tabs" role="tablist" aria-label="Exercise support">${['Reasoning','Hint 1','Hint 2','Solution','Review'].map((s,i)=>`<button role="tab" id="support-tab-${i}" aria-controls="support-panel" aria-selected="${i===0}" data-help="${i}">${s}</button>`).join('')}</div><div id="support-panel" role="tabpanel" aria-labelledby="support-tab-0"></div></section></div><nav class="board-bottom"><span>Exercise ${p.number} of 12</span><div>${p.number>1?`<a href="#/practice/${p.number-1}">Previous exercise</a>`:''}${p.number<12?`<a class="primary" href="#/practice/${p.number+1}">Next exercise</a>`:''}</div></nav>`;
 bindChoiceCheck(p.number);
 const panel=main.querySelector('#support-panel');function help(i){main.querySelectorAll('[data-help]').forEach(button => {
  const selected = Number(button.dataset.help) === i;
  button.setAttribute('aria-selected', String(selected));
  button.tabIndex = selected ? 0 : -1;
 });panel.setAttribute('aria-labelledby','support-tab-'+i);panel.innerHTML=i===0?`<label for="notes-${p.number}">Your reasoning</label><textarea id="notes-${p.number}" data-note="${p.number}" placeholder="Record a condition, sketch an argument, or try a first step.">${safe(storage.get('calculus-l1-note-'+p.number))}</textarea><span class="save-note" data-save="${p.number}">Your notes stay in this browser.</span>`:i<3?`<div class="prose">${p.hints[i-1]}</div>`:i===3?`<div class="prose solution-content">${p.solution}</div>`:`<ul class="rubric">${rubrics[p.number].map(x=>`<li>${x}</li>`).join('')}</ul><p class="micro">Use these criteria with the solution. Proofs are not automatically graded.</p>`;panel.querySelector('[data-note]')?.addEventListener('input',e=>{const saved=storage.set('calculus-l1-note-'+p.number,e.target.value);panel.querySelector('[data-save]').textContent=saved?'Notes saved in this browser.':'Browser storage is unavailable.';});requestAnimationFrame(fitMath);}help(0);
 main.querySelector('#problem-select').onchange=e=>location.hash='/practice/'+e.target.value;main.querySelectorAll('[data-help]').forEach(b=>{b.onclick=()=>help(+b.dataset.help);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const i=+b.dataset.help,j=e.key==='Home'?0:e.key==='End'?4:(i+(e.key==='ArrowRight'?1:4))%5;main.querySelector(`[data-help="${j}"]`).focus();help(j);}};});
 main.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.step),out=main.querySelector(`[data-step-feedback="${n}"]`);let good,msg;if(n===11){good=b.dataset.answer==='no';msg=good?'The only candidate is excluded by the original denominator. The equation has no solution.':'Substitute x = 1 into the original quotient. Cancellation did not restore that input.';}else{const raw=main.querySelector('#step-'+n).value.trim();if(!raw){out.textContent='Enter a value to check this step.';return;}const value=parseNumericAnswer(raw);good=Number.isFinite(value)&&value===(n===9?5670:32);msg=good?(n===9?'Correct: 5670. Your argument should also identify k = 4 and justify the exponent equation.':'Correct: the extension is 32 at zero. The original quotient still excludes h = 0.'):(n===9?'Solve 16 − 5k = −4 first. Then include the binomial coefficient, the power of 3, and the sign.':'Expand (2 + h)⁴, subtract 16, then divide by h. Which constant term remains?');}out.textContent=msg;out.classList.toggle('good',good);}));}
// Definition reminders stay beside the sentence that opened them.
const popup = document.createElement('div');
popup.id = 'concept-popup';
popup.className = 'concept-popup';
popup.hidden = true;
popup.setAttribute('role', 'dialog');
popup.setAttribute('aria-labelledby', 'concept-title');
document.body.append(popup);

function closeConcept(restoreFocus = false) {
  popup.hidden = true;
  const trigger = glossaryTrigger;
  glossaryTrigger = null;
  if (!trigger) return;
  trigger.setAttribute('aria-expanded', 'false');
  if (restoreFocus && trigger.getClientRects().length) trigger.focus({preventScroll: true});
}

function positionConcept() {
  if (!glossaryTrigger) return;
  const rect = glossaryTrigger.getBoundingClientRect();
  if (!glossaryTrigger.getClientRects().length || rect.bottom < 0 || rect.top > innerHeight) {
    closeConcept();
    return;
  }
  const margin = 12;
  const width = Math.min(360, innerWidth - 2 * margin);
  popup.style.width = width + 'px';
  popup.style.left = Math.max(margin, Math.min(rect.left, innerWidth - width - margin)) + 'px';
  const height = popup.getBoundingClientRect().height;
  const below = rect.bottom + 9;
  const above = rect.top - height - 9;
  const top = below + height <= innerHeight - margin ? below : Math.max(margin, above);
  popup.style.top = top + 'px';
}

function showConcept(button) {
  const concept = glossary[button.dataset.concept];
  if (!concept) return;
  if (glossaryTrigger === button) {
    closeConcept(true);
    return;
  }
  closeConcept();
  glossaryTrigger = button;
  button.setAttribute('aria-expanded', 'true');
  popup.innerHTML = `<header><strong id="concept-title">${safe(concept.title)}</strong>
    <button type="button" data-close-concept aria-label="Close definition">×</button></header>
    <div>${concept.html}</div>
    <a href="#/${concept.page}/${concept.topic}">Open this topic</a>`;
  const rect = button.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > innerHeight) {
    button.scrollIntoView({block: 'nearest', behavior: 'instant'});
  }
  popup.hidden = false;
  positionConcept();
  popup.querySelector('[data-close-concept]').focus({preventScroll: true});
}

window.addEventListener('scroll', positionConcept, {passive: true});
const zoom = document.createElement('dialog');
zoom.className = 'zoom-dialog graph-inspector';
zoom.setAttribute('aria-labelledby', 'zoom-title');
document.body.append(zoom);

function fitMath(){main.querySelectorAll('.math-display').forEach(n=>{const wide=n.scrollWidth>n.clientWidth+2;n.classList.toggle('is-wide',wide);if(wide){n.setAttribute('tabindex','0');n.setAttribute('role','region');n.setAttribute('aria-label','Scrollable mathematical expression');}else{n.removeAttribute('tabindex');n.removeAttribute('role');n.removeAttribute('aria-label');}});}
function render(){let [id,topic]=(location.hash.replace(/^#\/?/,'')||'overview').split('/');if(!navItems.some(x=>x[0]===id))id='overview';closeConcept();if(zoom.open)zoom.close();document.querySelectorAll('[data-page]').forEach(a=>{const current=a.dataset.page===id;a.classList.toggle('active',current);if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});document.querySelector('#breadcrumb').textContent=navItems.find(x=>x[0]===id)[1];document.title=navItems.find(x=>x[0]===id)[1]+' · Calculus I';if(id==='overview')overview();else if(id==='practice')practice(topic);else if(boards[id])chapter(id,topic);else resources(id);const wasOpen=sidebar.classList.contains('is-open');closeMenu();if(wasOpen)main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(fitMath);document.fonts.ready.then(fitMath);}
document.addEventListener('click',e=>{const t=e.target.closest('[data-concept]');if(t){showConcept(t);return;}if(e.target.closest('[data-close-concept]'))closeConcept(true);else if(e.target.closest('#concept-popup a')||!popup.contains(e.target))closeConcept();const z=e.target.closest('[data-zoom]');if(z)openGraphInspector(zoom,z.closest('.visual-mount'),main.querySelector('h1').textContent);if(e.target.closest('.skip-link')){e.preventDefault();main.focus();main.scrollIntoView({behavior:'instant'});}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeConcept(true);if(sidebar.classList.contains('is-open'))closeMenu(true);}});window.addEventListener('hashchange',render);window.addEventListener('resize',()=>{fitMath();positionConcept();});main.addEventListener('toggle',()=>requestAnimationFrame(()=>{fitMath();positionConcept();}),true);
try{const [c,b]=await Promise.all([fetch('content.json'),fetch('boards.json')]);if(!c.ok||!b.ok)throw Error('Content unavailable');data=await c.json();({boards,glossary}=await b.json());render();}catch(e){main.innerHTML='<h1>The lesson could not open</h1><p>Please reload, or <a href="assets/lesson-notes.md">download the lesson notes</a>.</p>';console.error(e);}
