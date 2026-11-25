import {plot, attachCoordinateScene} from './coordinates.js';
import {motion,holeValue,compose,inverseInputs,waveStats,binomialTerm,targetTerm,circleValues,number,piLabel,traceNestedDomain,parseNumericAnswer,specialTrigLabel,equalIncrementStudy} from './math.js';
const C={teal:'#15596b',blue:'#5677ac',mauve:'#98637e',line:'#dbe6ed',muted:'#617e8f'};
let serial=0;
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const read=(name,value,small=false)=>`<div class="readout"><span>${name}</span><strong${small?' class="small-value"':''}>${value}</strong></div>`;
const control=(id,label,value,min,max,step=1)=>`<label class="control" for="${id}"><span class="control-label">${label}<output for="${id}" data-value="${id}">${value}</output></span><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
function shell(root,title,question,body,note,icon='ƒ'){
 root.innerHTML=`<section class="lab" aria-label="${escape(title)}"><div class="lab-head"><div><span class="lab-tag">Explore the idea</span><h3>${title}</h3><p>${question}</p></div><span class="lab-icon" aria-hidden="true">${icon}</span></div>${body}<div class="lab-note">${note}</div></section>`;
}
function feedback(node,message,good=false){node.innerHTML=message;node.classList.toggle('good',good);}
function pressed(root,attr,value){root.querySelectorAll(`[data-${attr}]`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[attr]===value)));}
const exactOrApprox = value => Number.isInteger(value) ? number(value) : '≈ ' + number(value);
function fmtOutput(root,id,text){root.querySelector(`[data-value="${id}"]`).textContent=text;}

function motionLab(root,returning=false){
 const id='motion-h-'+(++serial);let h=returning ? 0.1 : 1;
 shell(root,returning?'The small change, exactly':'Look closer at the motion',returning?'Separate the part linear in h from the remaining error.':'What changes when the observation interval becomes shorter?',`<div class="lab-grid"><div class="lab-plot"><div data-plot></div><div class="legend"><span class="legend-item"><i class="legend-line"></i>Position s(t) = t²</span><span class="legend-item"><i class="legend-line mauve"></i>${returning?'Linear prediction':'Secant'}</span></div></div><div class="lab-controls">${control(id, returning ? 'Signed time increment h' : 'Interval length h', h, returning ? -2 : 0, 1, .01)}<div class="preset-row"><button data-h="1">1</button><button data-h="0.1">0.1</button><button data-h="0.01">0.01</button><button data-h="0">0</button>${returning?'<button data-h="-0.1">−0.1</button>':''}</div><div class="readouts" data-facts aria-live="polite"></div></div></div>`,returning?'The quotient is defined for h ≠ 0. The polynomial expression 4 + h extends it to h = 0; a limit will justify its nearby behaviour.':'The table and graph suggest a question. Establishing a limiting value requires an argument about every sufficiently small interval, not just these samples.');
 const slider=root.querySelector('input');
 function paint(){
  const m=motion(h);fmtOutput(root,id,number(h,2)+' s');
  const p=plot('Position and observation interval',{xmin:0,xmax:3.3,ymin:0,ymax:12,xticks:[0,1,2,3],yticks:[0,4,8,12],xlabel:'time t (s)',ylabel:'position s(t) (m)',focus:[2,4]});
  p.path(t => t*t, {from: 0});
  if (returning) p.path(t => 4 + 4*(t-2), {from: 0, color: C.mauve, dash: '6 5'});
  else if (h !== 0) p.line(2, 4, 2+h, m.position, C.mauve, '');
  p.line(2+h, 0, 2+h, m.position, C.blue);
  p.point(2, 4);
  p.point(2+h, m.position, {color: C.mauve});
  p.draw(root.querySelector('[data-plot]'));
  root.querySelector('[data-facts]').innerHTML=read('Position at 2 + h',number(m.position,4)+' m')+read('Exact change',number(m.change)+' m')+read('Average velocity',m.quotient===null?'undefined':number(m.quotient)+' m/s',m.quotient===null)+(returning?read('Linear prediction 4h',number(m.linear)+' m')+read('Exact error h²',number(m.error)+' m'):'');
 }
 slider.addEventListener('input',()=>{h=Number(slider.value);paint();});
 root.addEventListener('click',e=>{const b=e.target.closest('[data-h]');if(b){h=Number(b.dataset.h);slider.value=h;paint();}});paint();
}

function holeLab(root){
 const uid=++serial,xid='hole-x-'+uid,cid='hole-c-'+uid;let x=0,c=2,extended=false,simplified=false;
 shell(root,'A formula changes. Does the domain?','Inspect x = 1 before and after cancellation.',`<div class="lab-grid"><div class="lab-plot"><div data-plot></div><div class="legend"><span class="legend-item"><i class="legend-line"></i>Original values</span><span class="legend-item"><i class="legend-line mauve"></i>Added value</span></div></div><div class="lab-controls"><div class="segmented"><button data-form="original" aria-pressed="true">Quotient</button><button data-form="simplified" aria-pressed="false">Simplified</button></div><div class="proof-mini" data-formula></div>${control(xid,'Inspect input x',x,-2,3,.05)}<div class="preset-row"><button data-x="0">x = 0</button><button data-x="1">x = 1</button><button data-x="2">x = 2</button></div><label class="checkbox"><input type="checkbox" data-extend>Define an extension at x = 1</label><div data-c-control hidden>${control(cid,'Assign the new value c',c,-1,5,.5)}</div><div data-facts class="readouts" aria-live="polite"></div></div></div><div class="lab-body prediction" data-label="Predict before cancelling" data-before-plot><p>Predict the effect of switching to Simplified. Does the quotient acquire a value at x = 1?</p><div class="preset-row"><button data-equal="yes">Yes, cancellation fills the point</button><button data-equal="no">No, x = 1 remains excluded</button></div><div class="feedback" data-feedback aria-live="polite"></div></div>`,`Cancellation retains x ≠ 1. Defining a value at the excluded input creates an extension. Continuity will explain why c = 2 is special.`);
 const xinput=root.querySelector('#'+xid),cinput=root.querySelector('#'+cid);
 function paint(){
  fmtOutput(root,xid,number(x,2));fmtOutput(root,cid,number(c,1));
  root.querySelector('[data-c-control]').hidden=!extended;
  root.querySelector('[data-formula]').innerHTML=simplified?'r(x) = x + 1, &nbsp; x ≠ 1':'r(x) = (x² − 1) / (x − 1)';
  const p=plot('The original quotient has an excluded input at one',{xmin:-2,xmax:3,ymin:-1.4,ymax:5.4,xticks:[-2,-1,0,1,2,3],yticks:[0,1,2,3,4,5],focus:[1,2]});
  p.path(v=>holeValue(v), {to:1});
  p.path(v=>holeValue(v), {from:1});
  p.point(1,2,{open:true,r:7});
  if(extended)p.point(1,c,{color:C.mauve,r:6});
  const v=holeValue(x,{extended,c});
  if(v!==null&&x!==1)p.point(x,v,{color:C.blue,r:6});
  p.draw(root.querySelector('[data-plot]'));
  root.querySelector('[data-facts]').innerHTML=read('Original domain','ℝ ∖ {1}',true)+read('Original r('+number(x,2)+')',holeValue(x)===null?'undefined':number(holeValue(x)),true)+(extended?read('Extension at this input',number(v))+read('Extension domain','ℝ'):read('No added value','x = 1 excluded',true));
 }
 xinput.addEventListener('input',()=>{x=Number(xinput.value);paint();});cinput.addEventListener('input',()=>{c=Number(cinput.value);paint();});
 root.querySelector('[data-extend]').addEventListener('change',e=>{extended=e.target.checked;paint();});
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.form){simplified=b.dataset.form==='simplified';pressed(root,'form',b.dataset.form);paint();}
  if(b.dataset.x!==undefined){x=Number(b.dataset.x);xinput.value=x;paint();}
  if(b.dataset.equal)feedback(root.querySelector('[data-feedback]'),b.dataset.equal==='no'?'Exactly. The quotient agrees with the line for every x ≠ 1. Equality of these functions also requires the same domain.':'Evaluate the original denominator at x = 1. Can the cancellation step use that input?',b.dataset.equal==='no');
 });paint();
}

function compositionLab(root){
 const xid='compose-x-'+(++serial);let x=.5,order='fg';
 shell(root,'Follow the input through both stages','f(u) = √u and g(x) = 1 − x². Which inputs survive the journey?',`<div class="lab-body"><div class="segmented"><button data-order="fg" aria-pressed="true">f ∘ g</button><button data-order="gf" aria-pressed="false">g ∘ f</button></div><div class="trace-flow" data-trace aria-live="polite"></div></div><div class="lab-grid"><div class="lab-plot" data-plot></div><div class="lab-controls">${control(xid,'Choose input x',x,-2,2,.05)}<div class="preset-row"><button data-x="-1">−1</button><button data-x="0">0</button><button data-x="1">1</button><button data-x="1.5">1.5</button></div><div class="domain-badge" data-domain></div><p class="micro" data-explanation></p></div></div>`,`A simpler final expression keeps the domain of the original composition. Checking the final formula alone can restore inputs that the inner function never admitted.`);
 const inp=root.querySelector('input');
 function paint(){
  const r=compose(x,order);fmtOutput(root,xid,number(x,2));
  root.querySelector('[data-trace]').innerHTML=`<div class="trace-cell">Original input<strong>${number(x)}</strong></div><div class="trace-cell ${r.inner===null?'invalid':''}">${order==='fg'?'g(x) = 1 − x² · all real x':'f(x) = √x · requires x ≥ 0'}<strong>${r.inner===null?'undefined':number(r.inner)}</strong></div><div class="trace-cell ${!r.valid?'invalid':''}">${order==='fg'?'f(g(x)) · requires g(x) ≥ 0':'g(f(x)) · all real inner outputs'}<strong>${r.valid?number(r.value):'not defined'}</strong></div>`;
  const p=plot('Graph of the composition on its original domain',{equalScale:order==='fg',xmin:-2,xmax:2,ymin:-1.5,ymax:1.5,xticks:[-2,-1,0,1,2],yticks:[-1,0,1]});
  if (order === 'fg') {
    p.path(v => Math.sqrt(Math.max(0, 1-v*v)), {from:-1,to:1});
    p.point(-1,0);
    p.point(1,0);
  } else {
    p.path(v => 1-v, {from:0});
    p.point(0,1);
  }
  if (r.valid) p.point(x,r.value,{color:C.mauve,r:6});
  p.draw(root.querySelector('[data-plot]'));
  root.querySelector('[data-domain]').textContent='Domain: '+r.domain;
  root.querySelector('[data-explanation]').textContent=!r.valid?(r.inner===null?'The inner square root is undefined at this input. The composition stops at its first stage.':'The inner function produces a negative number. The outer square root cannot accept that output.'):(order==='fg'?'The inner output is nonnegative, so the outer square root accepts it.':'Although the simplified result is 1 − x, the original inner square root still requires x ≥ 0.');
 }
 inp.addEventListener('input',()=>{x=Number(inp.value);paint();});root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.order){order=b.dataset.order;pressed(root,'order',order);paint();}if(b.dataset.x!==undefined){x=Number(b.dataset.x);inp.value=x;paint();}});paint();
}

function domainLab(root){
 let kind='log';const data={root:{label:'√(4 − x²)',condition:'nonnegative',domain:'closed',conditionText:'4 − x² ≥ 0',domainText:'[−2, 2]'},log:{label:'ln(4 − x²)',condition:'positive',domain:'open',conditionText:'4 − x² > 0',domainText:'(−2, 2)'},nested:{label:'√ln(4 − x²)',condition:'atleastone',domain:'nested',conditionText:'4 − x² ≥ 1',domainText:'[−√3, √3]'}};
 shell(root,'Which condition belongs to this operation?','Choose the restriction you used, then inspect its domain.',`<div class="lab-body"><div class="segmented"><button data-kind="root" aria-pressed="false">Square root</button><button data-kind="log" aria-pressed="true">Logarithm</button><button data-kind="nested" aria-pressed="false">Nested functions</button></div><div class="proof-mini" data-formula></div><label class="control probe-select">Evaluate at an exact input
   <select data-domain-probe>
     <option value="-3">x = −3</option><option value="-2">x = −2</option>
     <option value="-sqrt3">x = −√3</option><option value="0">x = 0</option>
     <option value="sqrt3">x = √3</option><option value="2" selected>x = 2</option><option value="3">x = 3</option>
   </select></label><div class="readouts boundary-trace" data-domain-trace aria-live="polite"></div>
   <div class="condition-check"><label class="control">The condition on 4 − x²<select data-condition><option value="">Choose an inequality</option><option value="nonnegative">4 − x² ≥ 0</option><option value="positive">4 − x² > 0</option><option value="atleastone">4 − x² ≥ 1</option></select></label><label class="control">The real domain<select data-domain><option value="">Choose a set</option><option value="closed">[−2, 2]</option><option value="open">(−2, 2)</option><option value="outside">(−∞, −2) ∪ (2, ∞)</option><option value="nested">[−√3, √3]</option></select></label><button class="primary" data-check>Check these conditions</button><div class="feedback" aria-live="polite"></div></div><details class="workspace"><summary>Inspect the endpoints and the reason</summary><div class="help-content" data-reason></div></details></div>`,`The same inner expression can have a different domain under a different outer function. An endpoint check is part of the argument.`);
  const probe = root.querySelector('[data-domain-probe]');
  const trace = root.querySelector('[data-domain-trace]');
  function paintTrace() {
    const sample = traceNestedDomain(kind, probe.value);
    const inner = read('Inner value 4 − x² at x = ' + sample.label, sample.inner);
    const logarithm = kind === 'nested'
      ? read('Logarithm · needs a positive input', sample.logarithm === null ? 'undefined' : exactOrApprox(sample.logarithm))
      : '';
    const result = sample.output === null ? 'undefined' : exactOrApprox(sample.output);
    trace.innerHTML = inner + logarithm + read('Final output', result);
  }
  probe.addEventListener('change', paintTrace);
 function paint(){paintTrace();root.querySelector('[data-formula]').textContent='F(x) = '+data[kind].label;root.querySelector('[data-reason]').innerHTML=kind==='root'?'<p>At x = ±2, the inner value is 0 and √0 = 0. Both endpoints belong to the domain.</p>':kind==='log'?'<p>At x = ±2, the inner value is 0. The real logarithm does not accept zero. Between the endpoints, 4 − x² is strictly positive.</p>':'<p>The outer root needs ln(4 − x²) ≥ 0. Since ln is increasing and ln 1 = 0, this means 4 − x² ≥ 1, or x² ≤ 3. At x = ±√3, the logarithm equals 0, and √0 is defined.</p>';}
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.kind){kind=b.dataset.kind;pressed(root,'kind',kind);root.querySelector('[data-condition]').value='';root.querySelector('[data-domain]').value='';root.querySelector('.feedback').textContent='';paint();}
  if(b.hasAttribute('data-check')){
   const cond=root.querySelector('[data-condition]').value,dom=root.querySelector('[data-domain]').value,d=data[kind],f=root.querySelector('.feedback');
   if(!cond||!dom)return feedback(f,'Choose both the restriction you used and the resulting set.');
   if(cond!==d.condition)return feedback(f,kind==='nested'?'The outer square root requires the logarithm to be nonnegative. What inner inputs make ln(4 − x²) ≥ 0?':kind==='log'?'The logarithm requires a strictly positive input. What happens if its input equals zero?':'The principal square root accepts zero. Is a strict positivity condition necessary here?');
   if(dom!==d.domain)return feedback(f,dom==='outside'?'Test x = 0 in your inequality. Does that input belong to the set you selected?':kind==='log'?'At x = 2 or x = −2, evaluate 4 − x² first. Is its value strictly positive?':kind==='root'?'At x = ±2, the expression under the root is zero. Is the principal square root of zero defined?':'Translate 4 − x² ≥ 1 into a condition on x², then check both boundary values.');
   feedback(f,`The condition ${d.conditionText} gives ${d.domainText}. Your endpoint choices preserve the requirements of the original expression.`,true);
  }
 });paint();
}

function inverseLab(root){
 const yid='inverse-y-'+(++serial);let branch='all',y=4;
 shell(root,'Can one output recover one input?','Inspect the square function on different domains.',`<div class="lab-body"><div class="segmented"><button data-branch="all" aria-pressed="true">Domain ℝ</button><button data-branch="positive" aria-pressed="false">Domain [0, ∞)</button><button data-branch="negative" aria-pressed="false">Domain (−∞, 0]</button></div></div><div class="lab-grid"><div class="lab-plot" data-plot></div><div class="lab-controls">${control(yid,'Known output y',y,0,9,.25)}<div class="preset-row"><button data-output="0">y = 0</button><button data-output="4">y = 4</button></div><div class="readouts" data-facts aria-live="polite"></div><p class="micro" data-explanation></p></div></div>`,`An inverse on the range needs unique recovery for every output. One successful test at y = 0 cannot establish injectivity on the whole domain.`);
 const inp=root.querySelector('input');
 function paint(){
  const roots=inverseInputs(y,branch);fmtOutput(root,yid,number(y,2));
  const p=plot('Square function and the inputs that produce the known output',{xmin:-3.5,xmax:3.5,ymin:-.5,ymax:10,xticks:[-3,-2,-1,0,1,2,3],yticks:[0,2,4,6,8,10],ylabel:'output y'});
  p.path(t=>t*t,{from:branch==='positive'?0:undefined,to:branch==='negative'?0:undefined});
  p.path(() => y, {color:C.mauve,dash:'5 5',width:1.8});
  for(const r of roots)p.point(r,y,{color:C.mauve,r:6});
  p.draw(root.querySelector('[data-plot]'));
  root.querySelector('[data-facts]').innerHTML=read('Inputs producing y',roots.map(v=>exactOrApprox(v)).join(' and '))+read('Unique recovery for every y ≥ 0?',branch==='all'?'No':'Yes')+read('Inverse on the range',branch==='all'?'No inverse on the range':branch==='positive'?'f⁻¹(y) = √y':'f⁻¹(y) = −√y',true);
  root.querySelector('[data-explanation]').textContent=branch==='all'?(y===0?'This one output has one preimage. Positive outputs still have two preimages, so the full square function remains noninjective.':'Both inputs produce the same known output. Reversing the whole relationship would fail to choose a unique input.'):(branch==='positive'?'The nonnegative domain chooses the nonnegative root. The inverse is defined for y ≥ 0.':'The nonpositive domain chooses the nonpositive root. The inverse is defined for y ≥ 0.');
 }
 inp.addEventListener('input',()=>{y=Number(inp.value);paint();});root.addEventListener('click',e=>{const b=e.target.closest('[data-branch]');if(b){branch=b.dataset.branch;pressed(root,'branch',branch);paint();}const probe=e.target.closest('[data-output]');if(probe){y=Number(probe.dataset.output);inp.value=y;paint();}});paint();
}

function familyLab(root) {
  const uid = ++serial;
  const xid = 'family-x-' + uid;
  const hid = 'family-h-' + uid;
  let kind = 'exponential';
  let x = 1;
  let h = 1;
  const families = {
    affine: {label: '3x + 2', difference: '3h', explanation: 'Fix h and move x. The 3h difference stays the same.'},
    power: {label: 'x²', difference: '2xh + h²', explanation: 'The cross term 2xh varies with x for any fixed nonzero h.'},
    exponential: {label: '2ˣ', difference: '2ˣ(2ʰ − 1)', explanation: 'Fix h and move x. The factor 2ʰ stays the same, while a nonzero step gives a difference that depends on x.'}
  };
  shell(root, 'What stays the same for a fixed step?', '', `
    <div class="lab-body family-choice">
      <div class="segmented" aria-label="Function">
        ${Object.entries(families).map(([key, family]) =>
          `<button data-family="${key}" aria-pressed="${key === kind}">${family.label}</button>`
        ).join('')}
      </div>
    </div>
    <div class="lab-grid">
      <div class="lab-plot">
        <div data-plot></div>
        <div class="legend">
          <span class="legend-item"><i class="legend-line blue"></i>Starting point</span>
          <span class="legend-item"><i class="legend-line mauve"></i>End point and output change</span>
        </div>
      </div>
      <div class="lab-controls family-controls">
        ${control(xid, 'Starting input x', x, 0, 3, .25)}
        ${control(hid, 'Signed step h', h, -1, 2, .25)}
        <div data-facts class="readouts" aria-live="polite"></div>
      </div>
    </div>
    <p class="family-observation" data-explanation></p>`,
    'Hold h fixed to test what depends on x. A numerical sample illustrates the identities; the algebra on this board explains why they hold.');

  const start = root.querySelector('#' + xid);
  const step = root.querySelector('#' + hid);
  function paint() {
    const values = equalIncrementStudy(kind, x, h);
    const {fn, first, second, difference, ratio} = values;
    const family = families[kind];
    fmtOutput(root, xid, number(x, 2));
    fmtOutput(root, hid, number(h, 2));
    const lower = Math.min(-1.5, first - 1, second - 1);
    const upper = Math.max(6, Math.ceil(Math.max(first, second) / 2) * 2 + 2);
    const p = plot('Start and end of a step on f(x) = ' + family.label, {
      xmin: -1.25, xmax: 5.25, ymin: lower, ymax: upper,
      xticks: [-1, 0, 1, 2, 3, 4, 5], ylabel: 'f(x)', focus: [x, first]
    });
    p.path(fn);
    if (h !== 0) {
      p.line(x, first, x + h, first, C.blue);
      p.line(x + h, first, x + h, second, C.mauve, '');
    }
    p.point(x, first, {color: C.blue, r: h === 0 ? 8 : 5.5});
    p.point(x + h, second, {color: C.mauve, r: 5});
    p.draw(root.querySelector('[data-plot]'));
    const fractionalPower = input => kind === 'exponential' && !Number.isInteger(input);
    const valueLabel = (value, approximate) => (approximate ? '≈ ' : '') + number(value, 5);
    const ratioLabel = ratio === null
      ? 'undefined at f(x) = 0'
      : (kind === 'exponential' && Number.isInteger(h)) || Number.isInteger(ratio)
        ? number(ratio, 5) : '≈ ' + number(ratio, 5);
    root.querySelector('[data-facts]').innerHTML =
      read('f(x) at x = ' + number(x, 2), valueLabel(first, fractionalPower(x))) +
      read('f(x + h) at x + h = ' + number(x + h, 2), valueLabel(second, fractionalPower(x + h))) +
      read('Difference · ' + family.difference, h === 0 ? '0' : valueLabel(difference, fractionalPower(x) || fractionalPower(x + h))) +
      read(kind === 'exponential' ? 'Ratio · 2ʰ' : 'Ratio f(x + h) / f(x)', ratioLabel, ratio === null);
    root.querySelector('[data-explanation]').textContent = h === 0
      ? 'At h = 0 the two points coincide. The change is zero, and the ratio is 1 wherever f(x) is nonzero.'
      : family.explanation;
  }
  start.addEventListener('input', () => { x = Number(start.value); paint(); });
  step.addEventListener('input', () => { h = Number(step.value); paint(); });
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-family]');
    if (!button) return;
    kind = button.dataset.family;
    pressed(root, 'family', kind);
    paint();
  });
  paint();
}

function identityLab(root){
 const xid='identity-x-'+(++serial);let kind='square',x=-2;
 shell(root,'Check the domain before the identity','A counterexample to an equality must use inputs where both sides exist.',`<div class="lab-body"><div class="segmented"><button data-identity="square" aria-pressed="true">√(x²) = x</button><button data-identity="log" aria-pressed="false">ln(x²) = 2 ln x</button><button data-identity="sum" aria-pressed="false">ln(x + 1) = ln x</button></div>${control(xid,'Probe input x',x,-3,3,.25)}<div class="readouts" data-facts aria-live="polite"></div><div class="feedback" data-feedback></div><p class="micro" data-reason></p></div>`,`Testing a value can disprove a universal claim. Agreement at a few selected inputs does not prove an identity; the algebra and its assumptions provide the argument.`);
 const inp=root.querySelector('input');function paint(){
  fmtOutput(root,xid,number(x,2));let lhs,rhs,msg,reason,good=false;
  if(kind==='square'){lhs=Math.abs(x);rhs=x;good=x>=0;msg=x<0?'Both sides exist, but their values differ. This is a counterexample to the claim on all real inputs.':'The values agree at this input. The general identity is √(x²) = |x|.';reason='The principal root is nonnegative. Equality with x holds exactly for x ≥ 0.';}
  if(kind==='log'){lhs=x===0?null:Math.log(x*x);rhs=x>0?2*Math.log(x):null;good=x>0;msg=x<0?'The right side is undefined here. This identifies a domain failure; it is not an example of two defined values being unequal.':x===0?'Neither side is defined at zero.':'Both sides exist here, and the power law proves equality on x > 0.';reason='On the larger domain x ≠ 0, the correct formula is ln(x²) = 2 ln|x|.';}
  if(kind==='sum'){lhs=x>-1?Math.log(x+1):null;rhs=x>0?Math.log(x):null;msg=x>0?'Both sides exist and differ. With y = 1, the proposed sum law would say ln(x + 1) = ln x + ln 1 = ln x.': 'To test the proposed logarithm sum law, choose positive x so both sides exist.';reason='At x = 1, the left side is ln 2 and the right side is 0. This single valid counterexample disproves the sum law.';}
  root.querySelector('[data-facts]').innerHTML=read(kind==='square'?'Left side':'Left side (decimal if needed)',lhs===null?'undefined':number(lhs))+read(kind==='square'?'Right side':'Right side (decimal if needed)',rhs===null?'undefined':number(rhs));feedback(root.querySelector('[data-feedback]'),msg,good);root.querySelector('[data-reason]').textContent=reason;
 }inp.addEventListener('input',()=>{x=Number(inp.value);paint();});root.addEventListener('click',e=>{const b=e.target.closest('[data-identity]');if(b){kind=b.dataset.identity;pressed(root,'identity',kind);if(kind==='sum'){x=1;inp.value=x;}paint();}});paint();
}

function circleSVG(theta,{u=null,v=null,rotated=false}={}){
 const cx=175,cy=166,r=111,point=a=>[cx+r*Math.cos(a),cy-r*Math.sin(a)];
 let s=`<svg viewBox="0 0 350 335" role="img" aria-label="Unit circle with angle and coordinate projections"><title>Angle determines the circle coordinates</title><line x1="30" y1="${cy}" x2="320" y2="${cy}" stroke="#bbceda"/><line x1="${cx}" y1="24" x2="${cx}" y2="307" stroke="#bbceda"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#b4cfdd" stroke-width="1.8"/><text x="305" y="${cy-9}" font-size="17" fill="${C.muted}">x</text><text x="${cx+10}" y="28" font-size="17" fill="${C.muted}">y</text><text x="${cx+r+7}" y="${cy+22}" font-size="16" fill="${C.muted}">1</text><text x="${cx-23}" y="${cy-r-8}" font-size="16" fill="${C.muted}">1</text>`;
 if(u!==null){
  const [px,py]=point(u),[qx,qy]=point(v);
  s+=`<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="${C.teal}" stroke-width="2"/><line x1="${cx}" y1="${cy}" x2="${qx}" y2="${qy}" stroke="${C.blue}" stroke-width="2"/><line x1="${px}" y1="${py}" x2="${qx}" y2="${qy}" stroke="${C.mauve}" stroke-width="2.5"/><circle cx="${px}" cy="${py}" r="6" fill="${C.teal}"/><circle cx="${qx}" cy="${qy}" r="6" fill="${C.blue}"/><text x="${px+10}" y="${py-10}" font-size="18" fill="${C.teal}">P</text><text x="${qx+10}" y="${qy+24}" font-size="18" fill="${C.blue}">Q</text><text x="175" y="326" text-anchor="middle" font-size="16" fill="${C.muted}">${rotated?'Both angles reduced by v':'Original points at angles u and v'}</text>`;
 }else{
  const [px,py]=point(theta);
  s+=`<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="${C.teal}" stroke-width="2.5"/><line x1="${px}" x2="${px}" y1="${cy}" y2="${py}" stroke="${C.teal}" stroke-dasharray="5 5"/><line x1="${cx}" x2="${px}" y1="${py}" y2="${py}" stroke="${C.blue}" stroke-dasharray="5 5"/><circle cx="${px}" cy="${py}" r="8" fill="${C.teal}" stroke="white" stroke-width="2"/><text x="175" y="326" text-anchor="middle" font-size="15" fill="${C.muted}">Drag the point, or use the angle slider</text>`;
 }
 return s+'</svg>';
}

function drawCircle(container, theta, {u = null, v = null, rotated = false} = {}) {
  const chord = u !== null;
  const title = chord ? (rotated ? 'Rotated chord P and Q' : 'Original chord P and Q') : 'Unit circle';
  const scene = plot(title, {
    xmin:-1.35,xmax:1.35,ymin:-1.35,ymax:1.35,ylabel:'y',
    equalScale:true,focus:chord ? [(Math.cos(u)+Math.cos(v))/2,(Math.sin(u)+Math.sin(v))/2] : [Math.cos(theta),Math.sin(theta)]
  });
  const semicircle = x => Math.sqrt(Math.max(0, 1-x*x));
  scene.path(semicircle, {from:-1,to:1,color:'#93b6ca',width:1.8});
  scene.path(x => -semicircle(x), {from:-1,to:1,color:'#93b6ca',width:1.8});
  if (chord) {
    const px = Math.cos(u), py = Math.sin(u), qx = Math.cos(v), qy = Math.sin(v);
    scene.line(0,0,px,py,C.teal,'');
    scene.line(0,0,qx,qy,C.blue,'');
    scene.line(px,py,qx,qy,C.mauve,'');
    scene.point(px,py,{label:'P'});
    scene.point(qx,qy,{label:'Q',color:C.blue});
  } else {
    const x = Math.cos(theta), y = Math.sin(theta);
    scene.line(0,0,x,y,C.teal,'');
    scene.line(x,0,x,y,C.teal);
    scene.line(0,y,x,y,C.blue);
    scene.point(x,y);
  }
  container.innerHTML = circleSVG(theta, {u,v,rotated});
  const svg = container.querySelector('svg');
  svg.setAttribute('aria-label', title);
  attachCoordinateScene(svg, scene);
}

function circleLab(root){
 const aid='circle-angle-'+(++serial);let step=20;
 shell(root,'One angle, two coordinate functions','Predict the signs. Then move the point and follow both graphs.',`<div class="circle-grid"><div data-circle style="touch-action:none"></div><div data-curves></div></div><div class="circle-controls"><div>${control(aid,'Angle θ (radians)',step,-120,120,1)}<div class="preset-row"><button data-angle="-20">−π/3</button><button data-angle="0">0</button><button data-angle="10">π/6</button><button data-angle="15">π/4</button><button data-angle="20">π/3</button><button data-angle="30">π/2</button><button data-angle="60">π</button><button data-angle="120">2π</button></div><button data-reflect>Reflect across the horizontal axis</button></div><div class="readouts" data-facts aria-live="polite"></div></div>`,`Reflection changes the sign of sine and preserves cosine. Values displayed as decimals are approximations; tangent is explicitly undefined at π/2 + kπ.`,'θ');
 const inp=root.querySelector('input'),circle=root.querySelector('[data-circle]');
 function paint(){const a=circleValues(step);fmtOutput(root,aid,piLabel(step));
  drawCircle(circle, a.theta);
  const p=plot('Sine and cosine as functions of angle',{xmin:-2*Math.PI,xmax:2*Math.PI,ymin:-1.35,ymax:1.35,xticks:[[-2*Math.PI,'−2π'],[-Math.PI,'−π'],[0,'0'],[Math.PI,'π'],[2*Math.PI,'2π']],yticks:[-1,0,1],xlabel:'angle θ (rad)',ylabel:'coordinate',xUnit:Math.PI,focus:[a.theta,(a.sin+a.cos)/2]});
  p.path(Math.sin);
  p.path(Math.cos,{color:C.blue});
  p.point(a.theta,a.sin);
  p.point(a.theta,a.cos,{color:C.blue});
  p.draw(root.querySelector('[data-curves]'), '<div class="legend"><span class="legend-item"><i class="legend-line"></i>sin θ</span><span class="legend-item"><i class="legend-line blue"></i>cos θ</span></div>');
  root.querySelector('[data-facts]').innerHTML =
    read('Angle θ', piLabel(step)) +
    read('cos θ', specialTrigLabel(step, 'cos') ?? exactOrApprox(a.cos)) +
    read('sin θ', specialTrigLabel(step, 'sin') ?? exactOrApprox(a.sin)) +
    read('tan θ', a.tan === null ? 'undefined' : specialTrigLabel(step, 'tan') ?? exactOrApprox(a.tan));
 }
 inp.addEventListener('input',()=>{step=Number(inp.value);paint();});root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.angle!==undefined){step=Number(b.dataset.angle);inp.value=step;paint();}if(b.hasAttribute('data-reflect')){step=-step;inp.value=step;paint();}});
 let dragging=false;
 function drag(e){const svg=circle.querySelector('svg'),r=svg.getBoundingClientRect();const px=(e.clientX-r.left)/r.width*350,py=(e.clientY-r.top)/r.height*335;let raw=Math.atan2(166-py,px-175)*60/Math.PI;raw+=Math.round((step-raw)/120)*120;step=Math.max(-120,Math.min(120,Math.round(raw)));inp.value=step;paint();}
 circle.addEventListener('pointerdown',e=>{dragging=true;circle.setPointerCapture(e.pointerId);drag(e);});circle.addEventListener('pointermove',e=>{if(dragging)drag(e);});circle.addEventListener('pointerup',()=>{dragging=false;});circle.addEventListener('pointercancel',()=>{dragging=false;});paint();
}

function chordLab(root){
 const uid=++serial;let u=20,v=5,rotated=false;
 shell(root,'Rotate the picture. Preserve the distance.','The same chord gives two expressions for its squared length.',`<div class="lab-grid"><div class="lab-plot" data-plot></div><div class="lab-controls">${control('chord-u-'+uid,'Angle u',u,-30,60,1)}${control('chord-v-'+uid,'Angle v',v,-30,60,1)}<button class="primary" data-rotate>Rotate both points by −v</button><div class="readouts" data-facts aria-live="polite"></div></div></div>`,`The same geometric chord is measured before and after rotation. The algebra on this page establishes the identity for all real u and v.`);
 function paint(){const U=u*Math.PI/60,V=v*Math.PI/60;fmtOutput(root,'chord-u-'+uid,piLabel(u));fmtOutput(root,'chord-v-'+uid,piLabel(v));drawCircle(root.querySelector('[data-plot]'),0,{u:rotated?U-V:U,v:rotated?0:V,rotated});root.querySelector('[data-rotate]').textContent=rotated?'Return to the original points':'Rotate both points by −v';const d2=4*Math.sin((U-V)/2)**2;root.querySelector('[data-facts]').innerHTML=read('Angle difference',piLabel(u-v))+read('Squared chord length (approx.)',number(d2));}
 root.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>{u=Number(root.querySelector('#chord-u-'+uid).value);v=Number(root.querySelector('#chord-v-'+uid).value);paint();}));root.querySelector('[data-rotate]').addEventListener('click',()=>{rotated=!rotated;paint();});paint();
}

function waveLab(root){
 const uid=++serial;let A=3,m=12,mult=1;
 shell(root,'What does each parameter change?','Predict the cycle length before doubling the angular frequency.',`<div class="lab-body"><div class="proof-mini" data-wave-formula></div></div><div class="lab-grid"><div class="lab-plot" data-plot></div><div class="lab-controls">${control('wave-A-'+uid,'Amplitude parameter A',A,-5,5,.5)}${control('wave-m-'+uid,'Middle level m',m,8,16,.5)}<label class="control">Angular frequency<select data-frequency><option value="0.5">π/12 (half the original)</option><option value="1" selected>π/6 (original)</option><option value="2">π/3 (double the original)</option></select></label><div class="readouts" data-facts aria-live="polite"></div></div></div><div class="lab-body prediction" data-label="Predict the effect of doubling frequency" data-before-plot><p>If the angular frequency doubles, what happens to the fundamental period of a nonconstant wave?</p><div class="preset-row"><button data-period="double">twice as long</button><button data-period="half">half as long</button><button data-period="same">unchanged</button></div><div class="feedback" data-feedback aria-live="polite"></div></div>`,`This is an illustrative model on 0 ≤ t ≤ 24 hours. A negative A reflects the wave around its middle level; its amplitude is |A|. When A = 0, the function is constant.`);
 function paint(){fmtOutput(root,'wave-A-'+uid,number(A,1));fmtOutput(root,'wave-m-'+uid,number(m,1));const w=waveStats(m,A,mult);root.querySelector('[data-wave-formula]').textContent=A===0?'H(t) = '+number(m):'H(t) = '+number(m)+(A<0?' − ':' + ')+number(Math.abs(A))+' sin('+(mult===0.5?'πt/12':mult===2?'πt/3':'πt/6')+')';const p=plot('Periodic height model over one day',{xmin:0,xmax:24,ymin:2,ymax:22,xticks:[0,6,12,18,24],yticks:[4,8,12,16,20],xlabel:'time t (hours)',ylabel:'height H(t)'});p.path(w.fn,{from:0,to:24});p.line(0,m,24,m,C.blue);p.draw(root.querySelector('[data-plot]'));root.querySelector('[data-facts]').innerHTML=read('Amplitude |A|',number(Math.abs(A),1))+read('Range over this day',`[${number(w.observed[0])}, ${number(w.observed[1])}]`,true)+read('Fundamental period on ℝ',w.period===null?'no smallest positive period':number(w.period)+' hours',true) +
    (mult !== 1 && w.period !== null ? read('At the original frequency', '12 hours') : '');}

 root.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>{A=Number(root.querySelector('#wave-A-'+uid).value);m=Number(root.querySelector('#wave-m-'+uid).value);paint();}));root.querySelector('select').addEventListener('change',e=>{mult=Number(e.target.value);paint();});root.addEventListener('click',e=>{const b=e.target.closest('[data-period]');if(b)feedback(root.querySelector('[data-feedback]'),b.dataset.period==='half'?'Check your prediction. Compare the periods at π/6 and π/3. Which time increment makes the angle advance by 2π at each frequency?':'A cycle is complete when the angle increases by 2π. Write ωT = 2π, then replace ω by 2ω. What must happen to T?',b.dataset.period==='half');});paint();
}

function binomialLab(root) {
  const sliderId = 'binomial-k-' + (++serial);
  let k = 1;
  shell(root, 'Track one exponent', '', `
    <div class="lab-body binomial-grid">
      <section>
        ${control(sliderId, 'Negative-power factors k', k, 0, 8, 1)}
        <div class="factor-row" data-factors aria-label="Eight factor choices"></div>
        <div class="readouts" data-exponent aria-live="polite"></div>
        <details class="compact-details coefficient-reveal">
          <summary>Show coefficient for this index</summary>
          <p data-coefficient aria-live="polite"></p>
        </details>
      </section>
      <form data-index-form>
        <label class="control">Target exponent <i>p</i>
          <input class="check-input" name="exponent" type="text" inputmode="decimal" value="−4">
        </label>
        <div class="preset-row" aria-label="Problem and transfer powers">
          <button type="button" data-power="-4">Course-bank power −4</button>
          <button type="button" data-power="-3">Transfer power −3</button>
        </div>
        <label class="control">Your index <i>k</i>
          <input class="check-input" name="index" type="text" inputmode="decimal" autocomplete="off">
        </label>
        <div class="preset-row">
          <button type="submit" class="primary">Check the index</button>
          <button type="button" data-no-index>No admissible index</button>
        </div>
        <div class="feedback" data-index-feedback aria-live="polite"></div>
        <details class="compact-details"><summary>Set up the exponent equation</summary><p>Equate 16 − 5k with p. Check whether the result counts a whole number of factors from 0 through 8.</p></details>
      </form>
    </div>`,
    'Increasing k by one replaces a factor of x² with x⁻³, so the exponent drops by five. Each admissible exponent comes from exactly one index.');

  const slider = root.querySelector('input[type=range]');
  const form = root.querySelector('[data-index-form]');
  const exponentField = form.elements.exponent;
  const indexField = form.elements.index;
  const result = root.querySelector('[data-index-feedback]');
  const reveal = root.querySelector('.coefficient-reveal');
  function paint() {
    const term = binomialTerm(k);
    fmtOutput(root, sliderId, k);
    root.querySelector('[data-factors]').innerHTML = Array.from({length: 8}, (_, i) =>
      `<span class="factor ${i < k ? 'negative' : ''}">${i < k ? '−x⁻³' : '3x²'}</span>`
    ).join('');
    root.querySelector('[data-exponent]').innerHTML = read('Exponent 2(8 − k) − 3k', term.exponent);
    root.querySelector('[data-coefficient]').innerHTML =
      `${term.choices} × 3<sup>${8-k}</sup> × (−1)<sup>${k}</sup> = <strong>${number(term.coefficient, 0)}</strong>`;
  }
  function checkIndex(absent) {
    const exponent = parseNumericAnswer(exponentField.value);
    if (!Number.isSafeInteger(exponent)) return feedback(result, 'Enter an integer target exponent.');
    const target = targetTerm(exponent);
    if (absent) {
      return feedback(result, target.exists
        ? 'Solve 16 − 5k = p and see whether the result lies among the integers from 0 through 8.'
        : `The equation gives k = ${target.reason === 'fractional' ? number(16 - exponent, 0) + '/5' : number(target.k, 0)}. ${target.reason === 'fractional' ? 'This is not a whole number.' : 'This is outside the available range.'} The power does not occur.`, !target.exists);
    }
    const index = parseNumericAnswer(indexField.value);
    if (!Number.isFinite(index)) return feedback(result, 'Enter the index you obtained from the exponent equation.');
    if (!Number.isInteger(index) || index < 0 || index > 8) {
      return feedback(result, 'An index must count a whole number of factors from 0 through 8. If your equation gives an inadmissible index, check whether the power occurs at all.');
    }
    const candidate = binomialTerm(index).exponent;
    if (candidate !== exponent) return feedback(result, `Your index produces exponent ${candidate}. Which index solves 16 − 5k = ${number(exponent, 0)}?`);
    feedback(result, `The exponent matches when k = ${index}. Select that index to check the coefficient after you calculate it.`, true);
  }
  slider.addEventListener('input', () => {
    k = Number(slider.value);
    reveal.open = false;
    paint();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    checkIndex(false);
  });
  form.querySelector('[data-no-index]').addEventListener('click', () => checkIndex(true));
  form.addEventListener('input', () => feedback(result, ''));
  form.querySelectorAll('[data-power]').forEach(button => button.addEventListener('click', () => {
    exponentField.value = button.dataset.power.replace('-', '−');
    indexField.value = '';
    feedback(result, '');
  }));
  paint();
}

export function mountLabs(container){
 const labs={motion:r=>motionLab(r,false),'return-motion':r=>motionLab(r,true),hole:holeLab,composition:compositionLab,domains:domainLab,inverse:inverseLab,families:familyLab,identities:identityLab,circle:circleLab,chord:chordLab,waves:waveLab,binomial:binomialLab};
 for(const root of container.querySelectorAll('[data-lab]')){const init=labs[root.dataset.lab];if(init)init(root);}
}

export {plot,shell,control,read,C};
