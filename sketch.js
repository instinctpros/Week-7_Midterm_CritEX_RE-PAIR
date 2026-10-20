/* RE:PAIR / guided midterm edition
(function(){
'use strict';
const {data,sources,quotes}=globalThis.REPAIR_CONTENT;
const {RepairFlow,validField}=globalThis.REPAIR_FLOW;
const flow=new RepairFlow(data);
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lines=s=>esc(s).replace(/\n/g,'<br>');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const art={...globalThis.REPAIR_ART};
const human=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="0" r="12"/><path d="M0 12v51m0-39-23 29m23-29 23 29M0 63l-22 38M0 63l22 38"/></g>`;
const svg=body=>`<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const illustrations={
 comparison:'<path d="M40 180h220M60 180v-95m-15 35q15-35 30 0m-15-15q-25-25-28-8m28 45q28-25 33-3M155 180V65m-15 37q15-35 30 0m-15-20q-25-30-30-10m30 50q30-30 35-7M105 180V45m-6 20h12m-12 20h9m-9 20h12m-12 20h9m-9 20h12m-12 20h9M210 180V95m-6 20h12m-12 20h9m-9 20h12"/>',
 success:`${human(145,78,.8)}<path d="M46 180h210M45 45h45v30q-23 30-45 0zm0 8H30q0 30 21 25m39-25h15q0 30-21 25M67 90v20m-17 0h34M210 180v-65h44v65m-34-35h13m-23-30 22-22 22 22"/><path d="m110 52 35-10 34 10" stroke-dasharray="3 5"/>`,
 enough:'<path d="M45 80h105v70q-50 34-105 0zM150 95h24q25 25-3 42h-21M45 92h105M35 181h230M207 99h45v52q-23 18-45 0zM213 70q-8-15 0-26m20 26q-8-15 0-26"/><path d="M187 85h78v83h-78z" stroke-dasharray="3 5"/>',
 relationships:`<path d="M29 40h88v72H29zM39 50h68v52H39zM50 112v15m40-15v15M57 19l16 21 16-21M25 183h251"/>${human(176,82,.8)}${human(241,82,.8)}<path d="m194 115 29 0M146 151h124m-108 0v30m91-30v30"/>`,
 needs:`${human(70,78,.9)}${human(231,78,.9)}<path d="M107 35h90v55h-30l-18 15V90h-42zM120 52h64m-64 15h45M30 183h242"/>`,
 leadership:`${human(70,90,.75)}${human(148,90,.75)}${human(226,90,.75)}<path d="M20 183h260M150 20 30 173m120-153 120 153M42 173h215" stroke-dasharray="3 5"/><path d="M129 20h42m-21-7v20"/>`,
 civic:`${human(68,78,.9)}<path d="M164 180V47h88v133m-88-133 67 14v119m-26-67v6M28 183h244M102 65h31v34h-19l-12 9zM111 77h13"/><path d="m126 150 24-5m-8-5 8 5-5 8"/>`,
 belief:`${human(150,77,.95)}<path d="M103 18h94v30h-94zM115 32h68M104 52l-30 38m30-38 16 10M47 180h207"/><path d="M211 50c0-25 40-25 40-2 0 13-20 14-20 30m0 11v1"/>`,
 disagreement:`${human(71,80,.85)}${human(230,80,.85)}<path d="M91 25h70v55h-22l-17 12V80H91zM142 40h70v55h-20l-15 13V95h-35zM28 184h244"/><path d="M150 52v13" stroke-dasharray="2 4"/>`,
 doing:`${human(90,63,.9)}<path d="M34 180h104v-24h38v-30h38V96h39V65h28" stroke-dasharray="4 5"/><path d="M34 180h104v-24h38m-38 0v24"/><path d="m188 48 30-16m-10-3 10 3-4 11"/>`,
 fear:`<g opacity=".3" transform="translate(30 -25) scale(1.35)">${human(80,65,.9)}</g>${human(94,78,.8)}<path d="M190 183v-79h52v79m-52-79 38 12v67M37 184h236m-57-42v6"/>`,
 time:'<path d="M82 25h112M82 180h112M93 25c0 48 16 58 45 77-29 19-45 29-45 78m90-155c0 48-16 58-45 77 29 19 45 29 45 78M105 158l33-26 33 26zM112 51h52l-26 30z"/><path d="M235 182v-54m0 14q-31-4-26-29 27-4 26 29Zm0-7q30-3 25-27-26-4-25 27ZM207 183h59"/>',
 wins:'<path d="M35 45q60-20 115 0 55-20 115 0v124q-60-18-115 0-55-18-115 0zM150 45v124M52 104h76m-76 15h61m42-25 69 54 10-13-69-54zM199 60l6 12 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z"/>',
 present:`${human(87,80,.9)}<path d="M162 32h100v120H162zM212 32v120M162 92h100M152 169h120M175 169v-26h25v26m0-20h10v11h-10M34 185h237"/><path d="M235 80q-28-1-23-26 26 0 23 26Zm0 0v24M180 48v18m-9-9h18"/>`
};
Object.entries(illustrations).forEach(([id,body])=>art[id]=svg(body));
$('#cover-art').innerHTML=art.cover;
const arrow=`<svg class="delicate-arrow" viewBox="0 0 200 160" aria-hidden="true"><path d="M8 5C50 30 77 113 184 147m-13-17 13 17-22 0"/></svg>`;
function fieldMarkup(field,prefix){
 const fid=prefix+'-'+field.id;
 if(field.type==='choice')return `<fieldset class="field" data-field="${field.id}" data-type="choice"><legend>${esc(field.label)}</legend><div class="options" role="group" aria-label="${esc(field.label)}">${field.options.map((value,i)=>`<button class="option" type="button" data-value="${esc(value)}" aria-pressed="false">${esc(value)}</button>`).join('')}</div><p class="print-choice">My response: ____________________________________</p></fieldset>`;
 return `<div class="field" data-field="${field.id}" data-type="text"><label for="${fid}">${esc(field.label)}</label><textarea id="${fid}" name="${field.id}" required maxlength="2000" rows="2" placeholder="${esc(field.placeholder||'A sentence is enough.')}"></textarea></div>`;
}
function formMarkup(index,phase,fields,label){return `<form data-index="${index}" data-phase="${phase}" novalidate>${fields.map(f=>fieldMarkup(f,`${index}-${phase}`)).join('')}<button type="submit" class="action" disabled>${label} <span aria-hidden="true">↘</span></button><p class="stage-hint" role="status">Make a choice${fields.some(f=>f.type==='text')?' and add your reflection':''} to continue.</p></form>`;}
function researchMarkup(key){if(!key)return '';const s=sources[key];return `<details class="research"><summary>Read the ${key==='civic'?'official resource':'research'}</summary><p>${esc(s.body)}</p><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)} ↗</a></details>`;}
function quoteMarkup(key){if(!key)return '';const [q,name]=quotes[key];return `<figure class="interview-note"><blockquote>“${esc(q)}”</blockquote><figcaption>${esc(name)}<br>Interview 2026 excerpt</figcaption></figure>`;}
$('#journey').innerHTML=data.map((s,i)=>{
 const action={id:'action',label:'Which action will you carry with you?',type:'choice',options:s.actions};
 const repairFields=s.plan?[s.plan,action]:[action];
 return `<section class="inspection" id="${s.id}" data-index="${i}" ${i?'hidden':''} aria-labelledby="title-${s.id}"><header class="inspection-header"><span class="inspection-count">${String(i+1).padStart(2,'0')} / 20</span><h2 id="title-${s.id}">${esc(s.title)}</h2><span class="inspection-meta">${esc(s.chapter)}</span></header><div class="diagonal"><article class="stage notice" data-stage="notice" tabindex="-1" aria-label="${esc(s.title)}: notice"><div class="stage-label"><span aria-hidden="true">↓</span></div><h3>${lines(s.q)}</h3>${formMarkup(i,'notice',s.fields,'Follow the trail')}${arrow}</article><article class="stage reveal" data-stage="reveal" hidden tabindex="-1" aria-label="${esc(s.title)}: reveal"><div class="stage-label"><span>02 / REVEAL</span><span>↓</span></div><div class="reveal-body"><h3>${lines(s.reveal)}</h3><p>${esc(s.insight)}</p><p class="branch-line" hidden></p></div>${quoteMarkup(s.quote)}${researchMarkup(s.research)}${formMarkup(i,'reveal',[s.reflect],'Find your repair')}${arrow}</article><article class="stage repair" data-stage="repair" hidden tabindex="-1" aria-label="${esc(s.title)}: repair"><div class="stage-label"><span>03 / REPAIR</span><span>↗</span></div><div class="drawing" aria-hidden="true">${window.REPAIR_ILLUSTRATIONS ? `<img class="personal-illustration" src="${window.REPAIR_ILLUSTRATIONS[i]}" alt="" width="1000" height="1000" decoding="async">` : (art[s.art]||art.pause)}</div><h3>${esc(s.repair)}</h3>${formMarkup(i,'repair',repairFields,i===19?'Close the circle':'Carry this forward')}<button class="plain pause-link" type="button">This is enough for now.</button></article></div></section>`;
}).join('');
$('#source-list').innerHTML='<ol>'+Object.values(sources).map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a><p>${esc(s.body)}</p></li>`).join('')+'</ol>';
const contents=$('#contents-dialog');
function refreshContents(){
 $('#contents-list').innerHTML=data.map((s,i)=>`<button class="contents-row" data-go="${i}" ${flow.available(i)?'':'disabled'}><span>${String(i+1).padStart(2,'0')}</span><span>${esc(s.title)}</span><span aria-label="${flow.states[i].repair?'repair chosen':flow.available(i)?'available':'not yet opened'}">${flow.states[i].repair?'✓':flow.available(i)?'↘':'·'}</span></button>`).join('');
}
refreshContents();
$('.contents-toggle').addEventListener('click',()=>{refreshContents();contents.showModal();});
$$('.close-dialog').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}}));
$('#contents-list').addEventListener('click',event=>{const b=event.target.closest('[data-go]');if(!b||b.disabled)return;const i=Number(b.dataset.go);if(!flow.available(i))return;contents.close();const stage=$('.stage',document.getElementById(data[i].id));stage.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});stage.focus({preventScroll:true});});
function readForm(form){const answers={};$$('[data-field]',form).forEach(field=>{answers[field.dataset.field]=field.dataset.type==='choice'?$('.option[aria-pressed=true]',field)?.dataset.value||'':$('textarea',field).value.trim();});return answers;}
function formValid(form){const i=Number(form.dataset.index),phase=form.dataset.phase,s=data[i],a=readForm(form);if(phase==='notice')return s.fields.every(f=>validField(f,a[f.id]));if(phase==='reveal')return validField(s.reflect,a[s.reflect.id]);return s.actions.includes(a.action)&&(!s.plan||validField(s.plan,a[s.plan.id]));}
function checkForm(form){const valid=formValid(form);$('button[type=submit]',form).disabled=!valid;if(!form.dataset.submitted)$('.stage-hint',form).textContent=valid?'Follow the trail when you’re ready.':'Make a choice'+(form.querySelector('textarea')?' and add your reflection':'')+' to continue.';}
function revealStage(element){if(!element.hidden)return;element.hidden=false;element.classList.add('is-bleeding');registerStage(element);requestAnimationFrame(()=>requestAnimationFrame(()=>element.classList.remove('is-bleeding')));}
function updateBranch(i){const s=data[i],branch=$('.branch-line',document.getElementById(s.id));const value=s.branchField?flow.states[i].answers[s.branchField]:null;if(s.branches&&s.branches[value]){branch.hidden=false;branch.textContent=s.branches[value];}}
const journey=$('#journey');
journey.addEventListener('click',event=>{
 const option=event.target.closest('.option');if(option){const field=option.closest('[data-field]');$$('.option',field).forEach(b=>b.setAttribute('aria-pressed',String(b===option)));const form=option.closest('form');checkForm(form);if(formValid(form))advanceForm(form);}
 if(event.target.closest('.pause-link'))$('#pause-dialog').showModal();
});
journey.addEventListener('input',event=>{const form=event.target.closest('form');if(form)checkForm(form);});
journey.addEventListener('change',event=>{const form=event.target.closest('form');if(form&&formValid(form))advanceForm(form);});
journey.addEventListener('focusin',event=>event.target.closest('.stage')?.classList.remove('has-interacted'));
function nextStageFor(form){
 const i=Number(form.dataset.index),phase=form.dataset.phase,section=document.getElementById(data[i].id);
 return phase==='notice'?$('.reveal',section):phase==='reveal'?$('.repair',section):i===19?$('#ending'):$('.notice',document.getElementById(data[i+1].id));
}
function advanceForm(form){
 const i=Number(form.dataset.index),phase=form.dataset.phase,a=readForm(form),section=document.getElementById(data[i].id);if(!formValid(form))return false;
 let accepted=false;
 if(phase==='notice'){accepted=flow.submitNotice(i,a);if(accepted){updateBranch(i);revealStage($('.reveal',section));}}
 else if(phase==='reveal'){accepted=flow.submitReveal(i,a[data[i].reflect.id]);if(accepted)revealStage($('.repair',section));}
 else{accepted=flow.submitRepair(i,a.action,data[i].plan?a[data[i].plan.id]:'');if(accepted){section.classList.add('complete');if(i<data.length-1){const next=document.getElementById(data[i+1].id);next.hidden=false;registerStage($('.notice',next));}else{$('#ending').hidden=false;$('#trail-marker').hidden=true;}refreshContents();}}
 if(!accepted)return false;
 form.dataset.submitted='true';form.closest('.stage').classList.add('has-interacted');
 $('button[type=submit]',form).innerHTML=phase==='notice'?'Follow the trail <span>↘</span>':phase==='reveal'?'Find your repair <span>↘</span>':i===19?'Your invitation <span>↘</span>':'Keep following <span>↘</span>';
 $('.stage-hint',form).textContent=phase==='notice'?'Follow the trail to see what it means.':phase==='reveal'?'A small repair is waiting below.':i===19?'Take something kind into your day.':'One choice. A little further along.';
 $('#trail-label').textContent='There’s more to unfold. Follow the trail above.';$('#trail-back').textContent='Return to the trail ↑';
 $('#session-note').textContent=phase==='notice'?'Your reveal is ready below.':phase==='reveal'?'Your repair is ready below.':i===19?'Your offline invitation is ready below.':'Your next question is ready below.';
 requestTick();return true;
}
journey.addEventListener('submit',event=>{
 event.preventDefault();const form=event.target;if(!advanceForm(form))return;
 nextStageFor(form)?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});
});
$('#trail-back').addEventListener('click',()=>{const stage=visibleStages.at(-1);stage?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});});
// Native scrolling stays native. Only the nearest reached stage is emphasized.
let visibleStages=[],framePending=false,lastFocus=null;
function registerStage(stage){if(!visibleStages.includes(stage))visibleStages.push(stage);requestTick();}
function requestTick(){if(!framePending){framePending=true;requestAnimationFrame(updateFocus);}}
function updateFocus(){
 framePending=false;const vh=innerHeight;let nearest=null,distance=Infinity;
 for(const stage of visibleStages){if(stage.hidden||stage.closest('.inspection').hidden)continue;const b=stage.getBoundingClientRect();if(b.bottom<80||b.top>vh)continue;const anchor=b.top+Math.min(b.height*.3,vh*.36);const d=Math.abs(anchor-vh*.4);if(d<distance){distance=d;nearest=stage;}}
 if(nearest!==lastFocus){lastFocus?.classList.remove('in-focus');nearest?.classList.add('in-focus');lastFocus=nearest;}
 const ritual=$('.ritual'),b=ritual.getBoundingClientRect(),range=Math.max(1,ritual.offsetHeight-(vh-78)),progress=Math.max(0,Math.min(.999,-b.top/range));const index=Math.min(2,Math.floor(progress*3));$$('.ritual-message').forEach((el,i)=>{el.classList.toggle('active',i===index);el.setAttribute('aria-hidden',String(i!==index));});
 document.documentElement.style.setProperty('--drift',reduced?'0px':`${Math.sin(scrollY/2200)*14}px`);
}
addEventListener('scroll',requestTick,{passive:true});addEventListener('resize',requestTick);
if(!reduced)document.body.classList.add('focus-mode');
registerStage($('.stage.notice'));
// The opening directions introduce the same deliberate diagonal as the workbook.
const instructionIntro=$('.cover-instructions');
if(!reduced){
 instructionIntro.classList.add('instruction-sequence');
 if('IntersectionObserver' in window){
  const introObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){instructionIntro.classList.add('sequence-started');introObserver.disconnect();}},{threshold:.25});
  introObserver.observe(instructionIntro);
 }else instructionIntro.classList.add('sequence-started');
}

const rewards=[
 {title:'A long, warm bubble bath.',description:'Let the water be the only thing asking for your attention. No multitasking. No need to make this productive.',label:'A bubble bath'},
 {title:'One unhurried solo date.',description:'Take yourself somewhere you enjoy. A bench, a bookstore, a walk, or ice cream if you’d like. It need not cost anything.',label:'A solo date'},
 {title:'Something good, slowly.',description:'Make tea, enjoy a snack, or choose your own small decadent pleasure. Stay with the experience for a moment.',label:'A small decadent pleasure'},
 {title:'A real moment of rest.',description:'Put something down. Sit, stretch, or lie back. Nothing needs to come from these few minutes.',label:'Restorative rest'}
];
let chosenReward=null;
$('.reward-picker').innerHTML=rewards.map((r,i)=>`<button class="option" data-reward="${i}" aria-pressed="false">${r.label}</button>`).join('');
$('.reward-picker').addEventListener('click',event=>{const b=event.target.closest('[data-reward]');if(!b)return;chosenReward=rewards[Number(b.dataset.reward)];$$('[data-reward]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));$('#reward-card').hidden=false;$('#reward-title').textContent=chosenReward.title;$('#reward-description').textContent=chosenReward.description;});
$('#download-card').addEventListener('click',()=>{
 if(!chosenReward)return;const title=esc(chosenReward.title);const description=chosenReward.description;const words=description.split(' '),rows=[];let row='';for(const word of words){if((row+' '+word).length>46){rows.push(row);row=word;}else row+=(row?' ':'')+word;}if(row)rows.push(row);
 const card=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650"><rect width="900" height="650" fill="#efb19d"/><rect x="35" y="35" width="830" height="580" fill="none" stroke="#24211e"/><g fill="#24211e"><text x="75" y="110" font-family="monospace" font-size="17">RE:PAIR / AN INVITATION INTO YOUR LIFE</text><text x="75" y="215" font-family="Georgia,serif" font-style="italic" font-size="43">${title}</text>${rows.map((line,i)=>`<text x="75" y="290" dy="${i*32}" font-family="Arial,sans-serif" font-size="23">${esc(line)}</text>`).join('')}<text x="75" y="525" font-family="Arial,sans-serif" font-size="19">You did not have to earn rest or pleasure.</text><text x="75" y="565" font-family="monospace" font-size="13">KRYSTAL JOY BROWN / NOTICE → REVEAL → REPAIR</text></g></svg>`;
 const url=URL.createObjectURL(new Blob([card],{type:'image/svg+xml'})),link=document.createElement('a');link.href=url;link.download='REPAIR-an-offline-invitation.svg';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
let printSnapshot=null;
function preparePrint(){if(printSnapshot)return;printSnapshot=$$('[hidden]').map(el=>({el}));printSnapshot.forEach(({el})=>{if(el.matches('.inspection,.stage'))el.hidden=false;});$$('.research,.notes details,.notes-shell').forEach(el=>{el.dataset.printOpen=String(el.open);el.open=true;});}
function restorePrint(){if(printSnapshot){printSnapshot.forEach(({el})=>el.hidden=true);printSnapshot=null;}$$('[data-print-open]').forEach(el=>{el.open=el.dataset.printOpen==='true';delete el.dataset.printOpen;});requestTick();}
$('#print-manual').addEventListener('click',()=>{preparePrint();window.print();});addEventListener('beforeprint',preparePrint);addEventListener('afterprint',restorePrint);
})();
