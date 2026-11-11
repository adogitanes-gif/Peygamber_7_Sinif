"use strict";
/* Fen Bilimleri 7 Oyunları · Helpers, content registry, misconception catalogue */
/* ================= helpers ================= */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
const neg=n=>n<0?'−'+Math.abs(n):''+n;
const par=n=>n<0?'('+neg(n)+')':''+n;
const num=x=>{const r=Math.round(x*1000)/1000;return (r<0?'−':'')+String(Math.abs(r)).replace('.',',')};
const X='<i>x</i>';
/* pause-aware wait: time does not run while the briefing is paused */
const FAST=typeof location!=='undefined'&&/[?&]fast=1/.test(location.search);
const wait=ms=>FAST?Promise.resolve():new Promise(r=>{let left=ms,last=performance.now();const tick=()=>{const now=performance.now();if(!B.paused)left-=now-last;last=now;if(left<=0)r();else setTimeout(tick,Math.min(60,left))};setTimeout(tick,Math.min(60,Math.max(0,ms)))});
const RM=FAST||typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function frRaw(t,b){return `<span class="fr"><span class="fr-b"><span>${t}</span><span>${b}</span></span></span>`}
function fr(n,d,simplify=true){
  if(d<0){n=-n;d=-d}
  if(simplify){const g=gcd(n,d);n/=g;d/=g}
  if(d===1)return neg(n);
  return `<span class="fr">${n<0?'−':''}<span class="fr-b"><span>${Math.abs(n)}</span><span>${d}</span></span></span>`;
}
function lin(a,b){let s='';if(a!==0)s=(a===1?'':a===-1?'−':neg(a))+X;if(b!==0){s+=s?(b<0?' − ':' + ')+Math.abs(b):neg(b)}return s||'0'}
function terms(list){let s='';list.forEach(([c,v],i)=>{const body=(v&&Math.abs(c)===1?'':Math.abs(c))+(v?X:'');s+=i===0?(c<0?'−':'')+body:(c<0?' − ':' + ')+body});return s}
function choice(correct,wrongs){const seen=new Set([correct]);const w=[];for(const x0 of wrongs){const x=typeof x0==='string'?{h:x0,mis:null}:x0;if(!seen.has(x.h)){seen.add(x.h);w.push(x)}if(w.length===3)break}
  return shuffle([{html:correct,ok:true},...w.map(x=>({html:x.h,ok:false,mis:x.mis}))])}
const P=p=>p.map(v=>v.toFixed(1)).join(',');
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add2=(a,b)=>[a[0]+b[0],a[1]+b[1]], mul=(a,k)=>[a[0]*k,a[1]*k];
const len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a)), dot=(a,b)=>a[0]*b[0]+a[1]*b[1], cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const ST={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ================= content registry: every js/units/u<N>.js file fills this ================= */
/* M is the misconception catalogue; each unit adds its own entries (keys u<N>_…). "other" catches the rest. */
const M={other:{m:'Dikkat Canavarı',c:'#a9acdf',t:'Dikkat hatası veya henüz sınıflanmamış hata',s:`Acele etme. Soruyu bir kez daha oku, her seçeneği düşün.`,d:`Bu hata belirli bir kavram yanılgısına uymuyor. Aynı konuda tekrar ederse dersin Öğren anlatımını yeniden izlemek ve kitaptaki sayfalara bakmak iyi olur.`,p:null}};
const FEN={units:{},lessons:[],unit(n,o){this.units[n]=o},mis(o){for(const k in o)M[k]={p:null,...o[k]}},lesson(o){this.lessons.push(o)}};
const SK1={};
