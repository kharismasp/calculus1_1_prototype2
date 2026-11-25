export function motion(h){return {valid:h>=-2,position:(2+h)**2,change:4*h+h*h,linear:4*h,error:h*h,quotient:h===0?null:4+h,extension:4};}
export function holeValue(x,{extended=false,c=2}={}){return x===1?(extended?c:null):x+1;}
export function compose(x,order='fg'){
 if(order==='fg'){const inner=1-x*x;return {inner,valid:inner>=0,value:inner>=0?Math.sqrt(inner):null,domain:'[−1, 1]'};}
 if(x<0)return {inner:null,valid:false,value:null,domain:'[0, ∞)'};
 return {inner:Math.sqrt(x),valid:true,value:1-x,domain:'[0, ∞)'};
}
export function inverseInputs(y,branch='all'){
 if(y<0)return [];
 if (y === 0) return [0];
 const r=Math.sqrt(y);
 if(branch==='positive')return [r];if(branch==='negative')return [-r];
 return [-r,r];
}
export function waveStats(m,A,mult=1,phase=0){
 const omega=Math.PI*mult/6, period=A===0?null:2*Math.PI/omega;
 const f=t=>m+A*Math.sin(omega*(t-phase));
 const candidates=[0,24];
 for(let k=-30;k<=30;k++){const t=phase+(Math.PI/2+k*Math.PI)/omega;if(t>=0&&t<=24)candidates.push(t);}
 const values=candidates.map(f);
 return {omega,period,range:[m-Math.abs(A),m+Math.abs(A)],observed:[Math.min(...values),Math.max(...values)],fn:f};
}
export function choose(n,k){if(!Number.isInteger(k)||k<0||k>n)return 0;let r=1;for(let i=1;i<=k;i++)r=r*(n-i+1)/i;return Math.round(r);}
export function binomialTerm(k){if(!Number.isInteger(k)||k<0||k>8)throw new RangeError('Choose an integer from 0 to 8.');return {k,choices:choose(8,k),exponent:16-5*k,coefficient:choose(8,k)*3**(8-k)*(-1)**k};}
export function targetTerm(exponent){
 if(!Number.isInteger(exponent))return {exists:false,reason:'integer'};
 const k=(16-exponent)/5;
 if(!Number.isInteger(k))return {exists:false,reason:'fractional',k};
 if(k<0||k>8)return {exists:false,reason:'range',k};
 return {exists:true,...binomialTerm(k)};
}
export function circleValues(step){const theta=step*Math.PI/60;return {theta,sin:Math.abs(Math.sin(theta))<1e-12?0:Math.sin(theta),cos:Math.abs(Math.cos(theta))<1e-12?0:Math.cos(theta),tan:(step-30)%60===0?null:Math.tan(theta)};}
export function number(v,digits=4){if(v===null||v===undefined)return 'undefined';if(!Number.isFinite(v))return 'outside the display range';if(Math.abs(v)<1e-10)v=0;return Number(v.toFixed(digits)).toLocaleString('en-US',{maximumFractionDigits:digits});}
export function gcd(a,b){return b?gcd(b,a%b):Math.abs(a);}
export function piLabel(step){if(step===0)return '0';const g=gcd(Math.abs(step),60),n=step/g,d=60/g;return `${n===-1?'−':n===1?'':n<0?'−'+Math.abs(n):n}π${d===1?'':'/'+d}`;}
export function restrictedRootValue(x){return x < -1 || x === 2 ? null : Math.sqrt(x+1)/(x-2);}
export function powerDifferenceExtension(n,x,h){
 if(!Number.isInteger(n)||n<1)throw new RangeError('Use a positive integer exponent.');
 let value=0;for(let k=1;k<=n;k++)value+=choose(n,k)*x**(n-k)*h**(k-1);
 return value;
}

// Exact input presets keep the logarithm and square-root boundaries independent
// of floating-point approximations to the displayed radical.
export function traceNestedDomain(kind, point) {
  const inputs = {
    '-3': [9, '−3'], '-2': [4, '−2'], '-sqrt3': [3, '−√3'],
    '0': [0, '0'], 'sqrt3': [3, '√3'], '2': [4, '2'], '3': [9, '3']
  };
  const [square, label] = inputs[point];
  const inner = 4 - square;
  if (kind === 'root') {
    return {label, inner, output: inner >= 0 ? Math.sqrt(inner) : null};
  }
  const logarithm = inner > 0 ? Math.log(inner) : null;
  const output = kind === 'log' ? logarithm :
    inner >= 1 ? Math.sqrt(logarithm) : null;
  return {label, inner, logarithm, output};
}

export function parseNumericAnswer(raw) {
  const notation = raw.trim().replaceAll('−', '-');
  const decimal = /^[-+]?(?:(?:\d+|\d{1,3}(?:[,\u202f ]\d{3})+)(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i;
  if (decimal.test(notation)) return Number(notation.replace(/[,\u202f ]/g, ''));
  const fraction = notation.match(/^([-+]?\d+)\s*\/\s*([-+]?\d+)$/);
  return fraction && Number(fraction[2]) !== 0
    ? Number(fraction[1]) / Number(fraction[2])
    : NaN;
}

// Angles are integer multiples of π/60. Reference angles keep the
// special-angle readouts exact, including reflected and wrapped angles.
export function specialTrigLabel(step, name) {
  const angle = ((step % 120) + 120) % 120;
  const reference = angle <= 30 ? angle : angle <= 60 ? 60 - angle :
    angle <= 90 ? angle - 60 : 120 - angle;
  const values = {
    0: ['0', '1', '0'],
    10: ['1/2', '√3/2', '√3/3'],
    15: ['√2/2', '√2/2', '1'],
    20: ['√3/2', '1/2', '√3'],
    30: ['1', '0', 'undefined']
  };
  const index = {sin: 0, cos: 1, tan: 2}[name];
  const label = values[reference]?.[index];
  if (!label || label === '0' || label === 'undefined') return label;
  const negativeSine = angle > 60;
  const negativeCosine = angle > 30 && angle < 90;
  const negative = name === 'sin' ? negativeSine : name === 'cos' ? negativeCosine :
    negativeSine !== negativeCosine;
  return negative ? '−' + label : label;
}

// Evaluate the difference and ratio from their identities. This avoids
// subtracting nearly equal exponential values when the increment is small.
export function equalIncrementStudy(kind, x, h) {
  if (kind === 'exponential') {
    const fn = t => 2 ** t;
    const first = fn(x);
    return {fn, first, second: fn(x + h), difference: first * Math.expm1(h * Math.LN2), ratio: 2 ** h};
  }
  if (kind !== 'affine' && kind !== 'power') throw new RangeError('Unknown function family');
  const affine = kind === 'affine';
  const fn = affine ? t => 3 * t + 2 : t => t * t;
  const first = fn(x);
  const second = fn(x + h);
  const difference = affine ? 3 * h : h * (2 * x + h);
  return {fn, first, second, difference, ratio: first === 0 ? null : second / first};
}
