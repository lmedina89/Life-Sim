(()=>{'use strict';
const D=window.GAME_DATA,$=id=>document.getElementById(id),$$=q=>[...document.querySelectorAll(q)];
const clamp=n=>Math.max(0,Math.min(100,Math.round(Number(n)||0)));
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.round(Number(n)||0));
const uid=()=>globalThis.crypto&&typeof globalThis.crypto.randomUUID==='function'?globalThis.crypto.randomUUID():`${Date.now()}-${Math.random()}`;
const rn=a=>a[Math.floor(Math.random()*a.length)], rand=(a,b)=>a+Math.random()*(b-a);
const eduRank=D.educationRanks||{'None':0,'High School':1,'Trade School':2,'College':3,'Graduate':4};
const AP_MAX=D.rules?.actionPointsPerYear||10;
const F=D.balance.finance,R=D.balance.relationships;
let s=null,eventQueue=[],toastTimer=null;

function npc(name,relation,age,quality=65,gender='Unknown'){return{id:uid(),name,gender,relation,age,quality,alive:true,ageAtDeath:null,traits:[rn(D.traits)],career:null,education:'None',partner:null,children:0,wealth:Math.round(rand(0,25000)),skill:Math.round(rand(25,70)),milestones:[]}}
function makeFamily(){return{parents:[npc(rn(D.names.adults),'Parent',Math.floor(rand(25,41)),68),npc(rn(D.names.adults),'Parent',Math.floor(rand(25,43)),68)],siblings:Math.random()<.6?[npc(rn(D.names.children),'Sibling',Math.floor(rand(0,7)),62)]:[],children:[],grandchildren:[],ancestors:[]}}
function hiddenTraits(){return{luck:Math.round(rand(25,85)),longevity:Math.round(rand(35,90)),fertility:Math.round(rand(35,90)),risk:Math.round(rand(15,85))}}
function freshState(name='Player',gender='Male',birthplace='Columbia, SC',background='Balanced',difficulty='Normal'){
  const st={version:D.version,name,gender,birthplace,location:birthplace,background,difficulty,age:0,cash:0,savings:0,debt:0,credit:null,investments:0,
    health:100,happiness:70,intelligence:50,looks:50,fitness:50,social:50,stress:10,karma:50,
    skills:{technology:10,mechanical:10,business:10,communication:10,creativity:10},hidden:hiddenTraits(),
    schoolLevel:'Not started',gpa:null,club:'None',education:'None',major:'None',university:'State University',program:null,programTrack:'None',programYears:0,programNeed:0,scholarship:0,certifications:[],educationHistory:[],certificationHistory:[],
    job:null,salary:0,jobStartingSalary:0,performance:0,jobYears:0,totalYearsWorked:0,company:null,bossQuality:null,lifetimeEarnings:0,taxesPaid:0,jobsHeld:0,pendingJobOffer:null,careerReputation:20,careerHistory:[],retired:false,retirementIncome:0,
    structuredHistory:[],milestones:[],hobbies:{},exPartners:[],lastAnnualSummary:null,
    housing:'parents',homePurchasePrice:0,mortgageBalance:0,mortgageRate:0,mortgageYearsRemaining:0,lifestyle:'Modest',inventory:[],relationship:'Single',partner:null,datingPreference:gender==='Male'?'Women':gender==='Female'?'Men':'Anyone',custody:'—',friends:[],family:makeFamily(),
    business:null,criminalRecord:false,jailYears:0,conditions:[],medicalCost:0,lastInvestmentChange:0,lastInvestmentRate:null,lastDebtInterest:0,lastDebtShortfall:0,
    economy:{state:'Normal',inflation:1,marketIndex:1,interest:0.05,housingIndex:1},
    achievements:[],history:[`Age 0: ${name} was born in ${birthplace}.`],pendingConsequences:[],actionPoints:AP_MAX,actionUse:{},settings:{eventFrequency:'normal',confirmRisk:true},
    stats:{highestNetWorth:0,highestSalary:0,childrenRaised:0,crimes:0,businessesStarted:0,homesOwned:0,moves:0},dead:false,deathCause:null,generation:1};
  Object.entries(D.backgrounds[background]?.mods||{}).forEach(([k,v])=>{if(k in st)st[k]+=v});return st;
}
function normalize(raw){
  const b=freshState(raw?.name||'Player',raw?.gender||'Male',raw?.birthplace||'Columbia, SC',raw?.background||'Balanced',raw?.difficulty||'Normal');
  const m={...b,...raw,actionPoints:Number.isFinite(raw?.actionPoints)?raw.actionPoints:AP_MAX,actionUse:{...(raw?.actionUse||{})},skills:{...b.skills,...(raw?.skills||{})},hidden:{...b.hidden,...(raw?.hidden||{})},economy:{...b.economy,...(raw?.economy||{})},settings:{...b.settings,...(raw?.settings||{})},stats:{...b.stats,...(raw?.stats||{})},family:{...b.family,...(raw?.family||{})}};
  ['parents','siblings','children','grandchildren','ancestors'].forEach(k=>m.family[k]=Array.isArray(m.family[k])?m.family[k]:[]);['inventory','friends','certifications','conditions','achievements','history','pendingConsequences','educationHistory','certificationHistory','careerHistory','structuredHistory','milestones','exPartners'].forEach(k=>m[k]=Array.isArray(m[k])?m[k]:[]);
  m.hobbies=m.hobbies&&typeof m.hobbies==='object'?m.hobbies:{};
  if(!Number.isFinite(m.careerReputation))m.careerReputation=20;
  if(!Number.isFinite(m.retirementIncome))m.retirementIncome=0;
  m.retired=!!m.retired;if(!m.programTrack)m.programTrack=m.major||'None';
  const normalizeNpc=p=>{if(!p)return p;if(!p.id)p.id=uid();if(!Array.isArray(p.traits))p.traits=[];if(!Array.isArray(p.milestones))p.milestones=[];if(p.alive===false&&!Number.isFinite(p.ageAtDeath))p.ageAtDeath=p.age;return p};
  ['parents','siblings','children','grandchildren','ancestors'].forEach(k=>m.family[k]=m.family[k].map(normalizeNpc));m.friends=m.friends.map(normalizeNpc);m.exPartners=m.exPartners.map(normalizeNpc);if(m.partner)m.partner=normalizeNpc(m.partner);
  if(!Number.isFinite(m.jobStartingSalary))m.jobStartingSalary=m.job?Number(m.salary||0):0;
  if(m.pendingJobOffer&&(!m.pendingJobOffer.jobKey||!D.jobs[m.pendingJobOffer.jobKey]))m.pendingJobOffer=null;
  if(!D.lifestyles?.[m.lifestyle])m.lifestyle='Modest';
  if(!Number.isFinite(m.mortgageBalance))m.mortgageBalance=0;
  if(!Number.isFinite(m.mortgageRate))m.mortgageRate=0;
  if(!Number.isFinite(m.mortgageYearsRemaining))m.mortgageYearsRemaining=0;
  if(!Number.isFinite(m.homePurchasePrice))m.homePurchasePrice=D.housing[m.housing]?.owned?(D.housing[m.housing].price||0):0;
  if(m.job&&!m.careerHistory.some(x=>x.active)){const j=D.jobs[m.job];m.careerHistory.unshift({id:uid(),jobKey:m.job,title:j?.name||m.job,track:j?.track||'Other',company:m.company||'Unknown',startAge:Math.max(18,m.age-(m.jobYears||0)),endAge:null,startingSalary:Math.round(m.jobStartingSalary||m.salary||0),finalSalary:Math.round(m.salary||0),years:m.jobYears||0,active:true,legacyImported:true})}
  return m;
}
function slotKey(slot){return`${D.saveKey}:slot:${slot}`}
function saveAutosave(show=false){try{localStorage.setItem(`${D.saveKey}:auto`,JSON.stringify(s));$('autosaveStatus').textContent='Saved';if(show)msg('saveMessage','Game saved.')}catch(e){$('autosaveStatus').textContent='Save unavailable'}}
function loadAutosave(){try{let raw=localStorage.getItem(`${D.saveKey}:auto`);if(!raw){for(const k of D.legacyKeys){raw=localStorage.getItem(k);if(raw)break}}if(!raw)return false;s=normalize(JSON.parse(raw));return true}catch{return false}}
function saveSlot(slot){try{localStorage.setItem(slotKey(slot),JSON.stringify(s));msg('slotMessage',`Saved to Slot ${slot}.`)}catch{msg('slotMessage','Unable to save slot.')}}
function loadSlot(slot){try{const raw=localStorage.getItem(slotKey(slot));if(!raw)return msg('slotMessage',`Slot ${slot} is empty.`);s=normalize(JSON.parse(raw));eventQueue=[];msg('slotMessage',`Loaded Slot ${slot}.`);commit()}catch{msg('slotMessage','Unable to load slot.')}}
function log(text){
  if(!text)return;
  const line=/^Age\s+\d+:/i.test(text)?text:`Age ${s.age}: ${text}`;
  s.history.push(line);
  const limit=D.rules?.historyLimit||900;if(s.history.length>limit)s.history=s.history.slice(-limit);
}
function recordLife(type,title,data={}){
  const rec={id:uid(),age:s.age,type,title,...data};s.structuredHistory.unshift(rec);if(s.structuredHistory.length>500)s.structuredHistory.length=500;return rec;
}
function queueMilestone(title,text){
  eventQueue.unshift({id:`milestone-${uid()}`,category:'Milestone',title,text,choices:[{label:'Continue',result:`${title} became part of my life story.`,effect:{}}],milestone:true});
}
function addMilestone(id,title,description,show=true){
  if(s.milestones.some(x=>x.id===id))return false;s.milestones.unshift({id,title,description,age:s.age});recordLife('milestone',title,{description});if(show)queueMilestone(title,description);return true;
}
function currentCareerRecord(){return s.careerHistory.find(x=>x.active)||null}
function closeCareerRecord(reason='Left role'){
  const rec=currentCareerRecord();if(!rec)return;rec.active=false;rec.endAge=s.age;rec.finalSalary=Math.round(s.salary||rec.finalSalary||0);rec.years=Math.max(0,s.age-rec.startAge);rec.endReason=reason;
}
function startCareerRecord(jobKey,company,salary){
  const j=D.jobs[jobKey];s.careerHistory.unshift({id:uid(),jobKey,title:j?.name||jobKey,track:j?.track||'Other',company,startAge:s.age,endAge:null,startingSalary:Math.round(salary),finalSalary:Math.round(salary),years:0,active:true});recordLife('career',`Started ${j?.name||jobKey}`,{jobKey,company,salary:Math.round(salary)});
}
function checkDefinedMilestones(){
  const nw=netWorth(),j=s.job?D.jobs[s.job]:null;
  const pass={firstJob:s.jobsHeld>0,firstHome:s.stats.homesOwned>0,married:s.relationship==='Married',parent:s.family.children.length>0,firstBusiness:s.stats.businessesStarted>0,millionaire:nw>=1e6,tenMillion:nw>=1e7,retired:s.retired,executive:!!j&&(j.level||0)>=6};
  for(const m of D.milestones||[])if(pass[m.condition])addMilestone(m.id,m.title,m.description);
}
function historyGroups(){
  const groups=new Map();
  for(const raw of s.history){
    const line=String(raw||'');
    const m=line.match(/^Age\s+(\d+):\s*(.*)$/i);
    const age=m?Number(m[1]):0, text=m?m[2]:line;
    if(!groups.has(age))groups.set(age,[]);
    groups.get(age).push(text);
  }
  return [...groups.entries()].sort((a,b)=>b[0]-a[0]).slice(0,(D.rules?.historyYearsVisible||35));
}
function renderHistory(){
  const el=$('log');
  el.innerHTML=historyGroups().map(([age,items])=>`<section class=\"year-log\"><h3>Age: ${age} ${age===1?'year':'years'}</h3><div class=\"year-events\">${items.map(x=>`<div class=\"log-entry\">${escapeHtml(x)}</div>`).join('')}</div></section>`).join('');
  requestAnimationFrame(()=>{el.scrollTop=0});
}
function ambientYear(){
  const pools=[];
  if(s.age<5)pools.push('I spent time playing at home.','I learned something new about the world.','My family spent time with me.');
  else if(s.age<11)pools.push('I had an ordinary day at elementary school.','I played outside after school.','I talked with my family about my day.','I spent time on a hobby.');
  else if(s.age<14)pools.push('I navigated another year of middle school.','I spent time with classmates.','I worked on school assignments.','I thought about what I might want to do when I grow up.');
  else if(s.age<18)pools.push('I made it through another year of high school.','I spent time with friends after school.','I thought about life after graduation.','I dealt with the usual pressures of being a teenager.');
  else if(s.age<65)pools.push('Another year of adult life passed.','I took care of everyday responsibilities.','I thought about my goals for the future.');
  else pools.push('I reflected on another year of life.','I spent more time thinking about family and the years behind me.','I tried to take things at a comfortable pace.');
  if(s.job)pools.push(`I continued working at ${s.company}.`);
  if(s.partner)pools.push(`I spent time with ${s.partner.name}.`);
  if(s.family.children.some(c=>c.alive&&c.age<18))pools.push('I spent time raising my children.');
  const count=Math.min(pools.length,Math.random()<.35?2:1), used=new Set();
  for(let i=0;i<count;i++){let x=rn(pools);while(used.has(x)&&used.size<pools.length)x=rn(pools);used.add(x);log(x)}
}
function toast(text){const t=$('toast');t.textContent=text;t.classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.add('hidden'),1900)}
function stat(k,d){if(k in s.skills){s.skills[k]=clamp(s.skills[k]+d);return}if(['cash','savings','debt','investments','salary','scholarship'].includes(k)){s[k]=Math.max(0,(s[k]||0)+d);return}s[k]=clamp((s[k]||0)+d)}
function actionCost(key,cost=1){if(s.dead)return false;if((s.actionPoints??0)<cost){toast('No Action Points left this year. Age up to refresh them.');return false}s.actionPoints-=cost;s.actionUse[key]=(s.actionUse[key]||0)+1;return true}
function actionMultiplier(key){const n=s.actionUse[key]||1;const curve=D.rules?.diminishingReturns||[1,.6,.3,.1];return curve[Math.min(n-1,curve.length-1)]??curve[curve.length-1]}
function scaled(v,key){return v<0?v:Math.max(1,Math.round(v*actionMultiplier(key)))}
function pathValue(path){return String(path||'').split('.').reduce((v,k)=>v==null?undefined:v[k],s)}
function metricValue(name){if(name==='netWorth')return netWorth();if(name==='businessValue')return businessValue();if(name==='homeOwned')return !!D.housing[s.housing]?.owned;if(name==='familyAlive')return [...s.family.parents,...s.family.siblings].some(p=>p.alive);if(name==='hasLivingChild')return s.family.children.some(p=>p.alive);if(name==='hasMinorChild')return s.family.children.some(p=>p.alive&&p.age<18);if(name==='hasVehicle')return s.inventory.some(i=>i.type==='Vehicle');if(name==='hasFriend')return s.friends.some(f=>f.alive);if(name==='skilledHobby')return Object.values(s.hobbies||{}).some(v=>v>=35);return undefined}
function requirementMissing(req){
  if(!req)return null;const v=req.value,label=req.label;
  switch(req.type){
    case'ageMin':return s.age>=v?null:(label||`Age ${v}+`);
    case'educationMin':return (eduRank[s.education]||0)>=(eduRank[v]||0)?null:(label||v);
    case'intelligenceMin':return s.intelligence>=v?null:(label||`Intelligence ${v}+`);
    case'socialMin':return s.social>=v?null:(label||`Social ${v}+`);
    case'skillMin':return (s.skills[req.skill]||0)>=v?null:(label||`${req.skill[0].toUpperCase()+req.skill.slice(1)} ${v}+`);
    case'cashMin':return s.cash>=v?null:(label||`${money(v)} cash`);
    case'creditMin':return (s.credit??0)>=v?null:(label||`Credit ${v}+`);
    case'notJailed':return s.jailYears<=0?null:(label||'Not while jailed');
    case'hasPartner':return !!s.partner?null:(label||'Relationship required');
    case'noPartner':return !s.partner?null:(label||'Must be single');
    case'relationshipIs':return s.relationship===v?null:(label||`${v} relationship`);
    case'partnerAgeMin':return s.partner&&s.partner.age>=v?null:(label||`Partner age ${v}+`);
    case'partnerQualityMin':return s.partner&&s.partner.quality>=v?null:(label||`Relationship quality ${v}+`);
    case'programNone':return !s.program?null:(label||'Finish current program first');
    case'arrayLengthMin':{const a=pathValue(req.path);return Array.isArray(a)&&a.length>=v?null:(label||`${v}+ ${req.path}`)}
    case'valueMin':return Number(pathValue(req.path)||0)>=v?null:(label||`${req.path} ${v}+`);
    case'valueMax':return Number(pathValue(req.path)||0)<=v?null:(label||`${req.path} ${v} or less`);
    case'valueEquals':return pathValue(req.path)===v?null:(label||`${req.path}: ${v}`);
    case'truthy':return !!pathValue(req.path)?null:(label||req.path);
    case'metricMin':return Number(metricValue(req.metric)||0)>=v?null:(label||`${req.metric} ${v}+`);
    case'metricTruthy':return !!metricValue(req.metric)?null:(label||req.metric);
    case'certification':return s.certifications.includes(v)?null:(label||v);
    case'certificationAny':return (req.values||[]).some(x=>s.certifications.includes(x))?null:(label||`One of: ${(req.values||[]).join(', ')}`);
    case'majorIn':return (req.values||[]).includes(s.major)?null:(label||`Major: ${(req.values||[]).join(' / ')}`);
    case'graduatePathIn':{const latest=s.educationHistory.filter(x=>x.level==='Graduate').slice(-1)[0];return (req.values||[]).includes(latest?.track||s.programTrack)?null:(label||`Graduate path: ${(req.values||[]).join(' / ')}`)}
    case'reputationMin':return (s.careerReputation||0)>=v?null:(label||`Reputation ${v}+`);
    case'fitnessMin':return s.fitness>=v?null:(label||`Fitness ${v}+`);
    case'criminalRecordFalse':return !s.criminalRecord?null:(label||'Clean criminal record');
    default:return null;
  }
}
function missingRequirements(requirements=[]){return requirements.map(requirementMissing).filter(Boolean)}
function meetsRequirements(requirements=[]){return missingRequirements(requirements).length===0}
function jobMissing(j){return missingRequirements(j.requirements||[])}
function refreshJobOptions(){const sel=$('jobSelect'),value=sel.value,track=$('careerTrackSelect')?.value||'All Careers';sel.innerHTML='';Object.entries(D.jobs).filter(([,j])=>track==='All Careers'||j.track===track).sort((a,b)=>(a[1].level||0)-(b[1].level||0)||a[1].name.localeCompare(b[1].name)).forEach(([k,j])=>{const miss=jobMissing(j),[lo,hi]=marketSalaryRange(j),o=new Option(`${miss.length?'🔒 ':''}${j.name} — ${compactMoney(lo)}–${compactMoney(hi)}`,k);o.dataset.locked=miss.length?'1':'0';sel.add(o)});if([...sel.options].some(o=>o.value===value))sel.value=value;showJobRequirements()}
function showJobRequirements(){const j=D.jobs[$('jobSelect').value];if(!j)return;const miss=jobMissing(j),[lo,hi]=marketSalaryRange(j),est=estimatedJobOffer(j),preferred=j.preferredEdu?` • Preferred education: ${j.preferredEdu}`:'';
  $('jobRequirements').innerHTML=miss.length?`<span class="locked-text">🔒 Locked — ${escapeHtml(miss.join(' • '))}</span>`:'<span class="unlocked-text">✓ You meet the requirements for this job.</span>';
  $('jobMarketPreview').innerHTML=`<strong>${escapeHtml(j.name)}</strong><span>${escapeHtml(j.track||'Career')} • Level ${j.level||1}</span><span>Market range: ${money(lo)} – ${money(hi)}</span><span>Estimated offer: about ${money(est)}</span><small>Required education: ${escapeHtml(j.edu||'None')}${escapeHtml(preferred)}</small>${j.next&&D.jobs[j.next]?`<small>Career path: ${escapeHtml(j.name)} → ${escapeHtml(D.jobs[j.next].name)}</small>`:''}<small>Your professional reputation: ${Math.round(s.careerReputation||0)}/100</small>${s.job?`<small>Current salary: ${money(s.salary)}${s.salary>hi?' • This move would likely require a pay cut.':''}</small>`:''}`;
}
function renderJobOffer(){
  const o=s.pendingJobOffer,panel=$('jobOfferPanel');if(!o){panel.classList.add('hidden');return}
  const j=D.jobs[o.jobKey];panel.classList.remove('hidden');$('jobOfferTitle').textContent=`${j.name} — Job Offer`;$('jobOfferDetails').innerHTML=`<div class="offer-lines"><span>${escapeHtml(o.company)}</span><strong>${money(o.offer)} / year</strong><small>Market range: ${money(o.marketMin)} – ${money(o.marketMax)}</small>${s.job?`<small>Current salary: ${money(s.salary)}${o.offer<s.salary?' • Pay cut':''}</small>`:''}</div>`;$('negotiateOfferBtn').disabled=!!o.negotiated;
}
function applyNeglect(){const u=s.actionUse||{};if(s.age>=5&&s.age<18&&!u.schoolStudy){s.gpa=Math.max(0,(s.gpa||0)-.08);log('I did not put much effort into school this year.')}if(s.partner&&!u.partnerTime){s.partner.quality=clamp(s.partner.quality-4);log(`I did not make much time for ${s.partner.name} this year.`)}const familyAlive=[...s.family.parents,...s.family.siblings,...s.family.children].some(x=>x.alive);if(familyAlive&&!u.familyTime){[...s.family.parents,...s.family.siblings,...s.family.children].filter(x=>x.alive).forEach(x=>x.quality=clamp(x.quality-2));}if(s.age>=12&&!u.exercise){stat('fitness',-2)}if(s.job&&!u.work&&!u.network){stat('performance',-3)}}
function stage(){return (D.lifeStages||[]).find(x=>s.age<=x.maxAge)?.label||'Senior'}
function location(){return D.locations[s.location]||D.locations['Columbia, SC']}
function diff(){return D.difficulties[s.difficulty]||D.difficulties.Normal}
function inventoryValue(){return s.inventory.reduce((sum,x)=>sum+x.value,0)}
function homeValue(){const h=D.housing[s.housing];return h?.owned?Math.round(h.price*location().housing*s.economy.housingIndex):0}
function homeEquity(){return Math.max(0,homeValue()-(s.mortgageBalance||0))}
function businessValue(){if(!s.business)return 0;return Math.max(0,Math.round((s.business.cash||0)+(s.business.revenue||0)*2.2+(s.business.employees||0)*7500+(s.business.reputation||50)*500))}
function netWorth(){return Math.round(s.cash+s.savings+s.investments+inventoryValue()+homeValue()+businessValue()-s.debt-(s.mortgageBalance||0))}
function mortgageAnnualPayment(){
  const p=Math.max(0,s.mortgageBalance||0);if(!p)return 0;
  const years=Math.max(1,s.mortgageYearsRemaining||D.balance.yearly.finance.mortgage.termYears||30),annual=Math.max(.001,s.mortgageRate||s.economy.interest+(D.balance.yearly.finance.mortgage.rateSpread||0)),r=annual/12,n=years*12;
  return Math.round(Math.min(p*(1+annual),r?12*(p*r/(1-Math.pow(1+r,-n))):p/years));
}
function childAnnualCost(){
  const c=D.balance.yearly.finance.childCosts||{baby:8000,child:6500,teen:8500};
  return s.family.children.filter(x=>x.alive&&x.age<18).reduce((sum,x)=>sum+(x.age<5?c.baby:x.age<13?c.child:c.teen),0);
}
function vehicleAnnualCost(){return s.inventory.filter(x=>x.type==='Vehicle').reduce((sum,x)=>sum+(D.inventoryCatalog[x.key]?.annualCost||x.annualCost||0),0)}
function billsBreakdown(){
  const zero={personal:0,rent:0,mortgage:0,propertyTax:0,maintenance:0,insurance:0,hoa:0,utilities:0,vehicles:0,children:0,medical:0,total:0,monthly:0};if(s.age<18)return zero;
  const h=D.housing[s.housing]||D.housing.parents,l=D.lifestyles[s.lifestyle]||D.lifestyles.Modest,expenseMult=diff().expense,locCost=location().cost,safeInflation=Math.max(.5,s.economy.inflation||1),b={...zero};
  if(s.housing==='parents')b.personal=(D.rules?.livingWithParentsBase||1000)*locCost*safeInflation*(l.parentFactor||1);
  else b.personal=l.personalAnnual*locCost*safeInflation;
  if(h.kind==='rent'){b.rent=(h.annual||0)*location().housing*safeInflation;b.utilities=(h.utilitiesAnnual||0)*locCost*safeInflation}
  if(h.owned){const value=homeValue();b.mortgage=mortgageAnnualPayment();b.propertyTax=value*(h.propertyTaxRate||0);b.maintenance=value*(h.maintenanceRate||0);b.insurance=value*(h.insuranceRate||0);b.hoa=(h.hoaAnnual||0)*safeInflation;b.utilities=(h.utilitiesAnnual||0)*locCost*safeInflation}
  b.vehicles=vehicleAnnualCost()*safeInflation;b.children=childAnnualCost()*locCost*safeInflation;b.medical=s.medicalCost||0;
  const fixedMortgage=b.mortgage;Object.keys(b).forEach(k=>{if(!['total','monthly','mortgage'].includes(k))b[k]=Math.round(b[k]*expenseMult)});b.mortgage=Math.round(fixedMortgage);b.total=Math.round(Object.entries(b).filter(([k])=>!['total','monthly'].includes(k)).reduce((sum,[,v])=>sum+v,0));b.monthly=Math.round(b.total/12);return b;
}
function annualExpenses(){return billsBreakdown().total}
function compactMoney(n){const v=Number(n)||0,a=Math.abs(v);if(a<1000)return money(v);const units=[[1e12,'T'],[1e9,'B'],[1e6,'M'],[1e3,'K']];const [div,suffix]=units.find(([x])=>a>=x)||[1,''];const x=v/div;return `$${Math.abs(x)>=100?x.toFixed(0):Math.abs(x)>=10?x.toFixed(1):x.toFixed(2)}${suffix}`}
function marketSalaryRange(j){const factor=location().wage*s.economy.inflation;const lo=Math.round((j.marketMin||j.salary*.8)*factor),hi=Math.round((j.marketMax||j.salary*1.25)*factor);return [lo,Math.max(lo,hi)]}
function jobSalary(j){const [lo,hi]=marketSalaryRange(j);return Math.round((lo+hi)/2)}
function educationOfferSteps(j){return Math.max(0,(eduRank[s.education]||0)-(eduRank[j.edu||'None']||0))}
function majorMatchesJob(j){const m=D.majors[s.major];return !!(m&&j.skill&&m.skill===j.skill)}
function jobSkillValue(j){return j?.skill?(j.skill in s.skills?(s.skills[j.skill]||0):(Number(s[j.skill])||0)):0}
function relatedExperienceYears(j){return (s.careerHistory||[]).filter(r=>r.track&&j?.track&&r.track===j.track).reduce((sum,r)=>sum+Math.max(0,r.years||((r.endAge??s.age)-r.startAge)||0),0)}
function estimatedJobOffer(j){const cfg=D.balance.career.apply.offer,[lo,hi]=marketSalaryRange(j),span=hi-lo,related=relatedExperienceYears(j),exp=Math.min(1,((s.totalYearsWorked||0)+related*(cfg.relatedExperienceMultiplier||0))/cfg.experienceYearsForMax),skill=j.skill?Math.max(0,(jobSkillValue(j)-(j.skillMin||0))/Math.max(1,100-(j.skillMin||0))):0,edu=Math.min(2,educationOfferSteps(j)),cert=Math.min(.08,(s.certifications?.length||0)*cfg.certWeight),perf=s.job?Math.max(0,(s.performance||0)-50)/50:0,pref=j.preferredEdu&&eduRank[s.education]>=eduRank[j.preferredEdu]?cfg.preferredEducationWeight:0,major=majorMatchesJob(j)?cfg.majorMatchWeight:0,currentLeverage=s.salary>=lo&&s.salary<=hi?cfg.currentSalaryLeverageWeight:0;
  const reputation=Math.max(0,(s.careerReputation||0)-20)/80;const position=Math.min(.96,.20+exp*cfg.experienceWeight+skill*cfg.skillWeight+edu*cfg.educationStepWeight+cert+perf*cfg.performanceWeight+reputation*(cfg.reputationWeight||0)+pref+major+currentLeverage);
  return Math.round(lo+span*position)}
function salaryCeiling(j){const a=D.balance.career.promotion,rep=(s.careerReputation||0)>=a.reputationThreshold?(a.exceptionalCeilingMultiplier||1.35):(a.salaryCeilingMultiplier||1.03);return Math.round(marketSalaryRange(j)[1]*rep)}

function renderBillsBreakdown(b){
  const rows=[['Personal / Lifestyle',b.personal],['Rent',b.rent],['Mortgage',b.mortgage],['Property Tax',b.propertyTax],['Home Maintenance',b.maintenance],['Home Insurance',b.insurance],['HOA',b.hoa],['Utilities',b.utilities],['Vehicles',b.vehicles],['Children',b.children],['Medical',b.medical]].filter(([,v])=>v>0);
  return `<strong>Bills & Expenses</strong><div class="bill-list">${rows.map(([k,v])=>`<span>${k}</span><b>${money(v)}/yr</b>`).join('')}</div><div class="bill-total"><span>Total</span><strong>${money(b.total)}/yr • ${money(b.monthly)}/mo</strong></div>`;
}
function housingMarketPrice(key){const h=D.housing[key];return h?.owned?Math.round(h.price*location().housing*s.economy.housingIndex):0}
function renderHousingDetails(){
  const h=D.housing[s.housing]||D.housing.parents,value=homeValue(),equity=homeEquity(),payment=mortgageAnnualPayment(),b=billsBreakdown();
  if(h.owned)$('housingDetails').innerHTML=`<strong>${escapeHtml(h.name)}</strong><div class="property-grid"><span>Purchase Price</span><b>${money(s.homePurchasePrice||h.price)}</b><span>Current Value</span><b>${money(value)}</b><span>Mortgage Balance</span><b>${money(s.mortgageBalance||0)}</b><span>Mortgage Rate</span><b>${(100*(s.mortgageRate||0)).toFixed(2)}%</b><span>Monthly Payment</span><b>${money(Math.round(payment/12))}</b><span>Property Tax</span><b>${money(b.propertyTax)}/yr</b><span>Maintenance</span><b>${money(b.maintenance)}/yr</b><span>Equity</span><b>${money(equity)}</b></div>`;
  else if(h.kind==='rent')$('housingDetails').innerHTML=`<strong>${escapeHtml(h.name)}</strong><div class="property-grid"><span>Rent</span><b>${money(b.rent)}/yr</b><span>Monthly Housing</span><b>${money(Math.round((b.rent+b.utilities)/12))}</b><span>Equity</span><b>$0</b></div>`;
  else $('housingDetails').innerHTML=`<strong>Living with Parents</strong><p class="muted">Very low household costs while you live at home. Your selected lifestyle still affects personal spending.</p>`;
  const key=$('housingSelect').value||'parents',choice=D.housing[key],price=housingMarketPrice(key);
  if(choice?.owned){const down=Math.round(price*(D.balance.yearly.finance.mortgage.downPayment||.1));$('housingChoicePreview').innerHTML=`<strong>${escapeHtml(choice.name)}</strong><span>Market price: ${money(price)}</span><span>Down payment: ${money(down)}</span><small>Credit 620+ • ${D.balance.yearly.finance.mortgage.termYears}-year mortgage</small>`}
  else if(choice?.kind==='rent')$('housingChoicePreview').innerHTML=`<strong>${escapeHtml(choice.name)}</strong><span>Estimated rent: ${money(Math.round(choice.annual*location().housing*s.economy.inflation))}/year</span>`;
  else $('housingChoicePreview').innerHTML='<strong>Living with Parents</strong><span>Lowest-cost housing option.</span>';
  const owns=!!h.owned;$('mortgageControls').classList.toggle('hidden',!owns||!(s.mortgageBalance>0));$('payMortgageBtn').classList.toggle('hidden',!owns||!(s.mortgageBalance>0));
}
function makeProgress(label,val){return`<div class="stat"><div class="stat-head"><span>${label}</span><strong>${Math.round(val)}</strong></div><div class="meter"><i style="width:${clamp(val)}%"></i></div></div>`}
function achievementTest(a){return meetsRequirements(a.requirements||[])}
function checkAchievements(){for(const a of D.achievements){if(!s.achievements.includes(a.id)&&achievementTest(a)){s.achievements.push(a.id);log(`Age ${s.age}: Achievement unlocked — ${a.name}.`);toast(`🏆 ${a.name}`)}}}
function updateStats(){const nw=netWorth();s.stats.highestNetWorth=Math.max(s.stats.highestNetWorth,nw);s.stats.highestSalary=Math.max(s.stats.highestSalary,s.salary||0)}
function commit(){checkAchievements();updateStats();checkDefinedMilestones();render();saveAutosave();if(eventQueue[0]?.milestone)showEvent()}
function msg(id,text){const el=$(id);if(el)el.textContent=text}
function canAdult(){return s.age>=(D.rules?.adultAge||18)&&!s.dead&&s.jailYears<=0}
function occupationLabel(){
  if(s.jailYears>0)return `Incarcerated • ${s.jailYears} yr${s.jailYears===1?'':'s'} remaining`;
  if(s.age>=5&&s.age<18)return s.schoolLevel&&s.schoolLevel!=='Not started'?`${s.schoolLevel} Student`:'Student';
  if(s.program)return `${s.program}${s.major&&s.major!=='None'?` • ${s.major}`:''}`;
  if(s.job)return `${D.jobs[s.job]?.name||'Employed'}${s.company?` • ${s.company}`:''}`;
  if(s.retired)return `Retired${s.retirementIncome?` • ${money(s.retirementIncome)}/yr`:''}`;
  if(s.age<5)return stage();
  return 'Unemployed';
}
function avatarLetter(){const n=(s.name||'P').trim();return (n[0]||'P').toUpperCase()}

function render(){
  const occ=occupationLabel(),ap=Math.max(0,Math.min(AP_MAX,s.actionPoints ?? AP_MAX));
  $('ageVal').textContent=s.age;$('stageVal').textContent=stage();$('actionsVal').textContent=`${ap}/${AP_MAX}`;$('headerAP').textContent=`${ap}/${AP_MAX}`;$('cashVal').textContent=money(s.cash);$('worthVal').textContent=`${money(netWorth())} net worth`;$('locationVal').textContent=s.location;$('economyVal').textContent=s.economy.state;
  $('headerName').textContent=s.name;$('headerRole').textContent=occ;$('headerCash').textContent=compactMoney(s.cash);$('homeNameVal').textContent=s.name;$('homeRoleVal').textContent=occ;$('avatarVal').textContent=avatarLetter();
  $('actionDots').innerHTML=Array.from({length:AP_MAX},(_,i)=>`<i class="action-dot${i<ap?' on':''}"></i>`).join('');
  $('statsGrid').innerHTML=['happiness','health','intelligence','looks'].map(k=>makeProgress(k==='intelligence'?'Smarts':k[0].toUpperCase()+k.slice(1),s[k])).join('');
  if($('allStatsGrid'))$('allStatsGrid').innerHTML=['health','happiness','intelligence','looks','fitness','social','stress','karma'].map(k=>makeProgress(k[0].toUpperCase()+k.slice(1),s[k])).join('');
  $('skillsGrid').innerHTML=Object.entries(s.skills).map(([k,v])=>makeProgress(k[0].toUpperCase()+k.slice(1),v)).join('');
  $('conditionsVal').textContent=s.conditions.length?s.conditions.map(c=>c.name).join(', '):'None';$('medicalVal').textContent=money(s.medicalCost);
  renderHistory();
  $('datingPreferenceSelect').value=s.datingPreference||'Anyone';
  ['savings','investment','mortgage'].forEach(prefix=>{const sel=$(`${prefix}AmountSelect`),input=$(`${prefix}CustomAmount`);if(sel&&input)input.classList.toggle('hidden',sel.value!=='custom')});
  $('schoolVal').textContent=s.schoolLevel;$('gpaVal').textContent=s.gpa===null?'—':s.gpa.toFixed(2);$('clubVal').textContent=s.club;$('eduVal').textContent=s.education;$('majorVal').textContent=s.major;$('scholarshipVal').textContent=money(s.scholarship);$('eduProgress').textContent=s.program?`${s.program} ${s.programYears}/${s.programNeed}`:'—';renderEducationCostPreview();
  $('certList').innerHTML=s.certifications.length?s.certifications.map(x=>`<span class="chip">${escapeHtml(x)}</span>`).join(''):'<span class="muted">No certifications yet.</span>';
  refreshJobOptions();const j=s.job?D.jobs[s.job]:null;$('jobVal').textContent=j?.name||'None';$('companyVal').textContent=s.company||'—';$('salaryVal').textContent=money(s.salary);$('startingSalaryVal').textContent=s.job?money(s.jobStartingSalary||s.salary):money(0);$('careerEarningsVal').textContent=money(s.lifetimeEarnings);$('performanceVal').textContent=Math.round(s.performance);$('experienceVal').textContent=`${s.jobYears||0} yrs`;$('bossVal').textContent=s.bossQuality===null?'—':Math.round(s.bossQuality);$('careerReputationVal').textContent=Math.round(s.careerReputation||0);$('careerStatusVal').textContent=s.retired?`Retired • ${money(s.retirementIncome)}/yr`:s.job?'Active':'Not employed';renderJobOffer();
  const bills=billsBreakdown();$('cash2Val').textContent=money(s.cash);$('savingsVal').textContent=money(s.savings);$('debtVal').textContent=money(s.debt);$('debtRateVal').textContent=`${(s.economy.interest*100).toFixed(1)}%`;$('debtInterestVal').textContent=s.lastDebtInterest?`+${money(s.lastDebtInterest)}`:money(0);$('creditVal').textContent=s.credit===null?'—':Math.round(s.credit);$('monthlyExpensesVal').textContent=money(bills.monthly);$('expensesVal').textContent=money(bills.total);$('lifestyleSelect').value=s.lifestyle||'Modest';$('billsBreakdown').innerHTML=renderBillsBreakdown(bills);$('investVal').textContent=money(s.investments);$('investmentReturnVal').textContent=s.lastInvestmentRate===null?'—':`${s.lastInvestmentChange>=0?'+':''}${money(s.lastInvestmentChange)} (${s.lastInvestmentRate>=0?'+':''}${(s.lastInvestmentRate*100).toFixed(1)}%)`;$('investmentReturnVal').className=s.lastInvestmentRate===null?'':s.lastInvestmentChange>=0?'positive':'negative';$('housingVal').textContent=D.housing[s.housing]?.name||s.housing;$('homeEquityVal').textContent=money(homeEquity());renderHousingDetails();
  $('inventoryList').innerHTML=s.inventory.length?s.inventory.map(i=>`<div class="item-row"><div><strong>${escapeHtml(i.name)}</strong><div class="person-meta">${escapeHtml(i.type)} • Condition ${Math.round(i.condition)}%</div></div><strong>${money(i.value)}</strong></div>`).join(''):'<p class="muted">Nothing notable owned.</p>';
  $('businessVal').textContent=s.business?s.business.name:'None';$('businessValueVal').textContent=money(businessValue());$('employeesVal').textContent=s.business?.employees||0;$('businessRepVal').textContent=s.business?Math.round(s.business.reputation):'—';
  $('relationshipVal').textContent=s.relationship;$('partnerVal').textContent=s.partner?.name||'—';$('relationshipQuality').textContent=s.partner?Math.round(s.partner.quality):'—';$('custodyVal').textContent=s.custody||'—';
  $('familyList').innerHTML=[...s.family.parents,...s.family.siblings].map(personRow).join('')||'<p class="muted">No family listed.</p>';
  $('childrenList').innerHTML=s.family.children.map(personRow).join('')||'<p class="muted">No children.</p>';$('friendsList').innerHTML=s.friends.map(personRow).join('')||'<p class="muted">No close friends.</p>';renderFamilyTree();renderHobbies();renderLifeRecord();renderAnnualRecap();
  $('recordVal').textContent=s.criminalRecord?'Criminal record':'Clean';$('jailVal').textContent=s.jailYears>0?`${s.jailYears} year(s) remaining`:'No';
  $('achievementsVal').innerHTML=s.achievements.length?s.achievements.map(id=>{const a=D.achievements.find(x=>x.id===id);return`<span class="chip" title="${escapeHtml(a?.description||'')}">🏆 ${escapeHtml(a?.name||id)}</span>`}).join(''):'<span class="muted">No achievements yet.</span>';
  $('lifetimeStats').innerHTML=lifetimeStatsHtml();
  $('eventFreqSelect').value=s.settings.eventFrequency;$('confirmRiskSelect').value=s.settings.confirmRisk?'yes':'no';
  const disabled=s.dead; $('ageBtn').disabled=disabled;$$('button[data-ap]').forEach(b=>b.disabled=disabled);
  $('investBtn').disabled=disabled||s.cash<=0;$('sellInvestBtn').disabled=disabled||s.investments<=0;
  const livingFamily=[...s.family.parents,...s.family.siblings,...s.family.children,...(s.family.grandchildren||[])].filter(x=>x.alive);$('familyTimeBtn').disabled=disabled||!livingFamily.length||(s.actionPoints??0)<R.familyTime.ap;if(!livingFamily.length)msg('familyMessage','No living family members are available to spend time with.');else if((s.actionPoints??0)<R.familyTime.ap)msg('familyMessage',`Need ${R.familyTime.ap} AP.`);else if($('familyMessage').textContent.startsWith('No living')||$('familyMessage').textContent.startsWith('Need '))msg('familyMessage','');
  const supportKids=s.family.children.filter(x=>x.alive&&x.age<18);$('childSupportBtn').disabled=disabled||!supportKids.length||s.cash<R.childSupport.cost||(s.actionPoints??0)<R.childSupport.ap;
  if(!supportKids.length)msg('childSupportMessage',`Locked: You don't have children to support.`);else if(s.cash<R.childSupport.cost)msg('childSupportMessage',`Locked: Need ${money(R.childSupport.cost)} cash.`);else if((s.actionPoints??0)<R.childSupport.ap)msg('childSupportMessage',`Locked: Need ${R.childSupport.ap} AP.`);else msg('childSupportMessage','');
  $('studySchoolBtn').disabled=s.age<5||s.age>=18||disabled;$$('#schoolClubActions button').forEach(b=>b.disabled=s.age<5||s.age>=18||disabled||((s.actionPoints??0)<Number(b.dataset.ap||1)));
  ['dropoutBtn','certBtn','applyBtn','workBtn','networkBtn','promotionBtn','retireBtn','quitBtn','loanBtn','bankruptcyBtn','housingBtn','sellHomeBtn','payMortgageBtn','startBusinessBtn','hireBtn','upgradeBusinessBtn','sellBusinessBtn','businessBankruptcyBtn','dateBtn','partnerTimeBtn','giftBtn','argueBtn','proposeBtn','marryBtn','breakupBtn','childBtn','crimeBtn','moveBtn'].forEach(id=>$(id).disabled=disabled);
  $('acceptOfferBtn').disabled=disabled||!s.pendingJobOffer;$('negotiateOfferBtn').disabled=disabled||!s.pendingJobOffer||!!s.pendingJobOffer?.negotiated;$('declineOfferBtn').disabled=disabled||!s.pendingJobOffer;
  $('dropoutBtn').disabled=disabled||!s.program;
  $('workBtn').disabled=disabled||!s.job||s.jailYears>0;$('networkBtn').disabled=disabled||!s.job||s.jailYears>0;$('promotionBtn').disabled=disabled||!s.job||s.jailYears>0;$('quitBtn').disabled=disabled||!s.job;const rr=D.balance.career.retirement;$('retireBtn').disabled=disabled||!s.job||s.age<rr.minAge||(s.totalYearsWorked||0)<rr.minYears;
  $('sellHomeBtn').disabled=disabled||!D.housing[s.housing]?.owned;$('payMortgageBtn').disabled=disabled||!(s.mortgageBalance>0)||s.cash<=0;
  $('payDebtBtn').disabled=disabled||s.debt<=0||s.cash<=0;$('payDebt10000Btn').disabled=disabled||s.debt<=0||s.cash<=0;$('payDebt25Btn').disabled=disabled||s.debt<=0||s.cash<=0;$('payDebtAllBtn').disabled=disabled||s.debt<=0||s.cash<=0;
  $$('button[data-ap]').forEach(b=>{const cost=Number(b.dataset.ap||1);if((s.actionPoints??0)<cost)b.disabled=true});
}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function personRow(p){const q=p.alive?clamp(p.quality):0;return`<div class="person-row"><div><strong>${escapeHtml(p.name)} <span class="relation-label">(${escapeHtml(p.relation)})</span></strong><div class="person-meta">Age ${p.age}${p.alive?'':' • Deceased'}${(p.traits||[]).length?` • ${escapeHtml(p.traits.join(', '))}`:''}</div>${p.alive?`<div class="relationship-bar"><i style="width:${q}%"></i></div>`:''}</div><strong>${p.alive?`${q}%`:'—'}</strong></div>`}
function lifetimeStatsHtml(){const pairs=[['Generation',s.generation],['Lifetime earnings',money(s.lifetimeEarnings)],['Taxes paid',money(s.taxesPaid)],['Highest salary',money(s.stats.highestSalary)],['Highest net worth',money(s.stats.highestNetWorth)],['Jobs held',s.jobsHeld],['Years worked',s.totalYearsWorked],['Children',s.family.children.length],['Moves',s.stats.moves],['Crimes attempted',s.stats.crimes],['Businesses started',s.stats.businessesStarted],['Current net worth',money(netWorth())]];return pairs.map(([a,b])=>`<span>${a}</span><strong>${b}</strong>`).join('')}

function recordCard(title,meta='',detail=''){return `<div class="record-card"><strong>${escapeHtml(title)}</strong>${meta?`<div class="record-meta">${escapeHtml(meta)}</div>`:''}${detail?`<div class="record-detail">${escapeHtml(detail)}</div>`:''}</div>`}
function renderFamilyTree(){
  const people=[...(s.family.ancestors||[]),...s.family.parents,...s.family.siblings,...s.exPartners,...(s.partner?[s.partner]:[]),...s.family.children,...(s.family.grandchildren||[])];
  const living=people.filter(p=>p.alive).length,deceased=people.filter(p=>!p.alive).length;
  $('familyTreeSummary').innerHTML=`<strong>${people.length} recorded relatives</strong><span>${living} living • ${deceased} deceased</span>`;
  $('familyTreeList').innerHTML=people.length?people.map(p=>recordCard(`${p.alive?'🟢':'⚫'} ${p.name} — ${p.relation}`,p.alive?`Age ${p.age}`:`Died age ${p.ageAtDeath||p.age}`,`${(p.traits||[]).join(', ')||'No recorded traits'}${p.education&&p.education!=='None'?` • ${p.education}`:''}${p.career?` • ${p.career}`:''}`)).join(''):'<p class="muted">No family history recorded yet.</p>';
}
function renderLifeRecord(){
  const active=currentCareerRecord(),peak=money(s.stats.highestNetWorth||netWorth());
  $('lifeRecordSummary').innerHTML=`<strong>${escapeHtml(s.name)} • Generation ${s.generation}</strong><span>${s.education} • ${s.totalYearsWorked} years worked • Peak net worth ${peak}</span><span>${s.milestones.length} milestones • ${s.achievements.length} achievements</span>`;
  $('educationRecord').innerHTML=s.educationHistory.length?s.educationHistory.slice().reverse().map(r=>recordCard(`${r.level}: ${r.track||r.program}`,`Age ${r.age}${r.school?` • ${r.school}`:''}`,r.gpa!=null?`GPA ${Number(r.gpa).toFixed(2)}`:'')).join(''):(s.education!=='None'?recordCard(s.education,`Current record${s.major&&s.major!=='None'?` • ${s.major}`:''}`):'<p class="muted">No completed post-secondary education recorded.</p>');
  $('certificationRecord').innerHTML=s.certificationHistory.length?s.certificationHistory.slice().reverse().map(r=>recordCard(r.name,`Age ${r.age} • ${r.category}`)).join(''):(s.certifications.length?s.certifications.map(x=>recordCard(x,'Legacy save')).join(''):'<p class="muted">No certifications earned.</p>');
  $('careerRecord').innerHTML=s.careerHistory.length?s.careerHistory.map(r=>recordCard(`${r.active?'● ':''}${r.title}`,`${r.company} • Age ${r.startAge}${r.endAge!=null?`–${r.endAge}`:'–Present'}`,`${money(r.startingSalary)} starting • ${money(r.finalSalary||r.startingSalary)} final${r.endReason?` • ${r.endReason}`:''}`)).join(''):'<p class="muted">No career history yet.</p>';
  $('milestoneRecord').innerHTML=s.milestones.length?s.milestones.map(r=>recordCard(r.title,`Age ${r.age}`,r.description)).join(''):'<p class="muted">Major milestones will appear here.</p>';
}
function renderHobbies(){
  const host=$('hobbyProgress');const entries=Object.entries(s.hobbies||{}).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  host.innerHTML=entries.length?entries.map(([k,v])=>recordCard(D.hobbies?.[k]?.label||k,`Proficiency ${Math.round(v)}/100`)).join(''):'<p class="muted">No developed hobbies yet. Try an activity below.</p>';
}
function renderAnnualRecap(){
  const a=s.lastAnnualSummary;if(!a){$('annualRecap').innerHTML='<p class="muted">Age up once to generate a yearly recap.</p>';return}
  const rows=[['Salary / retirement income',a.income],['Annual expenses',-a.expenses],['Investment change',a.investmentChange],['Net worth change',a.netWorthChange]];
  $('annualRecap').innerHTML=`<strong>Age ${a.age} Recap</strong><div class="bill-list">${rows.map(([k,v])=>`<span>${k}</span><b>${v>=0?'+':''}${money(v)}</b>`).join('')}</div><div class="bill-total"><span>Net Worth</span><strong>${money(a.netWorthBefore)} → ${money(a.netWorthAfter)}</strong></div>${a.majorEvents?.length?`<p class="muted">${a.majorEvents.map(escapeHtml).join(' • ')}</p>`:''}`;
}
function schoolYear(){const y=D.balance.yearly.school;if(s.age===5){s.schoolLevel='Elementary School';s.gpa=2.6;log('Age 5: You started elementary school.')}if(s.age===11){s.schoolLevel='Middle School';log('Age 11: You started middle school.')}if(s.age===14){s.schoolLevel='High School';log('Age 14: You started high school.')}if(s.age>=5&&s.age<18&&s.gpa!==null){s.gpa=Math.max(0,Math.min(4,s.gpa+rand(...y.gpaDrift)+(s.intelligence-50)/y.intelligenceWeight-(s.stress-40)/y.stressWeight));}if(s.age===18){s.schoolLevel='Graduated';if((s.gpa||0)>=1.8){s.education='High School';log(`Age 18: You graduated high school with a ${s.gpa.toFixed(2)} GPA.`)}else log('Age 18: You did not graduate high school.');if(s.credit===null)s.credit=650}}
function educationYear(){
  if(!s.program)return;const y=D.balance.yearly.school;s.programYears++;stat('stress',y.educationStress);
  const uni=s.program==='College'||s.program==='Graduate School'?(D.universities[s.university]||D.universities['State University']):{learning:1,tuition:1};stat('intelligence',y.educationIntelligence*uni.learning);
  const tuition=Math.max(0,s.programAnnualCost*uni.tuition-(s.scholarship||0));if(tuition>0){const pay=Math.min(s.cash,tuition);s.cash-=pay;s.debt+=tuition-pay}s.scholarship=0;
  if(s.programYears>=s.programNeed){
    const completed=s.program,track=s.programTrack||'None',school=s.university,level=completed==='Graduate School'?'Graduate':completed;
    s.education=level;let reward='',def=null;
    if(completed==='College'){s.major=track;def=D.majors[track]}
    else def=D.educationTracks?.[completed]?.options?.[track];
    if(def?.skill&&def.bonus){if(def.skill==='intelligence')stat('intelligence',def.bonus);else stat(def.skill,def.bonus);reward=`${def.skill==='intelligence'?'Smarts':effectLabel(def.skill)} +${def.bonus}`}
    const rec={id:uid(),level,program:completed,track,school:completed==='Trade School'?'Trade School':school,age:s.age,gpa:s.gpa};s.educationHistory.push(rec);recordLife('education',`Completed ${completed}`,rec);
    log(`Age ${s.age}: Completed ${completed}${track!=='None'?` — ${track}`:''}.`);
    eventQueue.unshift({title:'🎓 Graduation!',text:`You completed ${completed}${track!=='None'?` — ${track}`:''}${completed!=='Trade School'?` at ${school}`:''}.${reward?` ${reward}.`:''}`,choices:[{label:'Celebrate',result:'I celebrated my graduation.',effect:{happiness:4}}]});
    s.program=null;s.programTrack='None';s.programYears=0;s.programNeed=0;s.programAnnualCost=0;
  }
}
function economyYear(){const y=D.balance.yearly.economy,roll=Math.random();if(roll<y.recessionChance)s.economy.state='Recession';else if(roll>y.boomThreshold)s.economy.state='Boom';else s.economy.state='Normal';const state=s.economy.state,inflationRate=rand(...y.inflation[state]);s.economy.inflation*=1+inflationRate;s.economy.marketIndex*=rand(...y.market[state]);s.economy.housingIndex*=rand(...y.housing[state]);s.economy.interest=rand(...y.interest[state])}
function careerYear(){
  const y=D.balance.yearly.career;
  if(s.jailYears>0){s.jailYears--;stat('happiness',y.jailHappiness);stat('stress',y.jailStress);if(s.jailYears===0)log(`Age ${s.age}: You were released from jail.`);return}
  if(s.job){
    s.jobYears++;s.totalYearsWorked++;const gross=s.salary,tax=gross*location().tax,net=gross-tax,expenses=annualExpenses();s.cash+=net-expenses;s.lifetimeEarnings+=gross;s.taxesPaid+=tax;stat('performance',-y.performanceDecay);stat('stress',y.stressGain);s.bossQuality=clamp((s.bossQuality??50)+rand(...y.bossDrift));const rec=currentCareerRecord();if(rec){rec.years=Math.max(0,s.age-rec.startAge);rec.finalSalary=Math.round(s.salary)}
    if(s.performance>=85)s.careerReputation=clamp((s.careerReputation||0)+1);
    const layoffChance=(y.layoffChance[s.economy.state]??y.layoffChance.Normal)*diff().layoff;
    if(Math.random()<layoffChance&&s.performance<y.layoffPerformanceThreshold){closeCareerRecord('Laid off');recordLife('career','Laid off',{company:s.company,job:s.job});log(`Age ${s.age}: You were laid off from ${s.company}.`);s.job=null;s.salary=0;s.jobStartingSalary=0;s.performance=0;s.company=null;s.bossQuality=null;s.pendingJobOffer=null;stat('stress',10)}
    else if(s.performance<y.firePerformanceThreshold&&Math.random()<y.fireChance){closeCareerRecord('Fired');s.careerReputation=clamp((s.careerReputation||0)-8);recordLife('career','Fired',{company:s.company,job:s.job});log(`Age ${s.age}: You were fired for poor performance.`);s.job=null;s.salary=0;s.jobStartingSalary=0;s.performance=0;s.company=null;s.bossQuality=null;s.pendingJobOffer=null;stat('stress',12)}
  }else if(s.age>=18){
    if(s.retired&&s.retirementIncome>0){s.cash+=s.retirementIncome;log(`Age ${s.age}: Retirement income paid ${money(s.retirementIncome)}.`)}
    s.cash-=annualExpenses();if(!s.retired){stat('happiness',y.unemployedHappiness);stat('stress',y.unemployedStress)}
  }
}
function financeYear(){const y=D.balance.yearly.finance,home=D.housing[s.housing];if(home?.owned)stat('happiness',1);else if(s.housing==='apartment')stat('happiness',0);const lifestyle=D.lifestyles[s.lifestyle]||D.lifestyles.Modest;if(lifestyle.happiness)stat('happiness',lifestyle.happiness);if(lifestyle.stress)stat('stress',lifestyle.stress);if((s.mortgageBalance||0)>0){const interest=Math.round(s.mortgageBalance*(s.mortgageRate||s.economy.interest+y.mortgage.rateSpread)),payment=mortgageAnnualPayment(),principal=Math.max(0,Math.min(s.mortgageBalance,payment-interest));s.mortgageBalance=Math.max(0,s.mortgageBalance-principal);s.mortgageYearsRemaining=Math.max(0,(s.mortgageYearsRemaining||y.mortgage.termYears)-1);if(s.mortgageBalance<=1){s.mortgageBalance=0;s.mortgageYearsRemaining=0;log('I paid off my home mortgage.')}}s.lastDebtInterest=0;s.lastDebtShortfall=0;if(s.debt>0){const beforeDebt=s.debt;s.debt*=1+s.economy.interest;s.lastDebtInterest=Math.round(s.debt-beforeDebt);if(s.lastDebtInterest>0)log(`My outstanding debt accrued ${money(s.lastDebtInterest)} in interest this year.`);if(s.credit!==null)s.credit=Math.max(300,s.credit-y.debtCreditPenalty)}if(s.savings>0)s.savings*=1+Math.max(y.savingsInterestFloor,s.economy.interest*y.savingsInterestMultiplier);if(s.investments>0){const before=s.investments,marketReturn=rand(...(s.economy.marketIndex>1?y.investmentReturnAboveOne:y.investmentReturnBelowOne));s.investments=Math.max(0,s.investments*(1+marketReturn));s.lastInvestmentChange=Math.round(s.investments-before);s.lastInvestmentRate=marketReturn;log(`My investments ${s.lastInvestmentChange>=0?'gained':'lost'} ${money(Math.abs(s.lastInvestmentChange))} this year (${marketReturn>=0?'+':''}${(marketReturn*100).toFixed(1)}%).`)}else{s.lastInvestmentChange=0;s.lastInvestmentRate=null}for(const i of s.inventory){i.condition=clamp(i.condition-(i.conditionLoss||6)+rand(...y.inventoryConditionDrift));i.value=Math.max(50,i.value*(1-rand(...y.inventoryDepreciation)));if(i.type==='Vehicle'&&i.condition<y.vehicleBreakdownCondition&&Math.random()<y.vehicleBreakdownChance){const repair=Math.round(rand(...y.vehicleRepair)),paid=Math.min(s.cash,repair);s.cash-=paid;s.debt+=repair-paid;i.condition=clamp(i.condition+y.vehicleRepairConditionGain);log(`Age ${s.age}: ${i.name} broke down. Repairs cost ${money(repair)}.`)}}if(s.cash<0){const shortfall=Math.round(Math.abs(s.cash));s.lastDebtShortfall=shortfall;s.debt+=shortfall;s.cash=0;if(s.credit!==null)s.credit=Math.max(300,s.credit-y.negativeCashCreditPenalty);log(`I couldn't cover ${money(shortfall)} of my annual expenses, so it was added to my debt.`)}}
function npcYear(){
  const everyone=[...s.family.parents,...s.family.siblings,...s.family.children,...(s.family.grandchildren||[]),...s.friends];if(s.partner)everyone.push(s.partner);
  for(const p of everyone){
    if(!p||!p.alive)continue;p.age++;p.quality=clamp(p.quality+rand(-3,2));
    if(!p.career&&p.age>=18&&Math.random()<.55)p.career=rn(Object.values(D.jobs)).name;
    if(p.age>=18&&!p.education)p.education=p.age>=24&&Math.random()<.35?'College':'High School';
    if(p.age>=18)p.wealth=Math.max(0,(p.wealth||0)+rand(-2000,9000));
    if(p.relation==='Child'&&p.age===18){p.independent=true;p.milestones=p.milestones||[];p.milestones.push({age:p.age,title:'Reached adulthood'});recordLife('family',`${p.name} became an adult`,{personId:p.id})}
    if(p.relation==='Child'&&p.age>=24&&p.age<=42&&Math.random()<.035){const gc=npc(rn(D.names.children),'Grandchild',0,72);gc.parentId=p.id;s.family.grandchildren.push(gc);p.children=(p.children||0)+1;recordLife('birth',`${gc.name}, your grandchild, was born`,{personId:gc.id,parentId:p.id});log(`Age ${s.age}: Your child ${p.name} welcomed ${gc.name}, your grandchild.`)}
    if(p.age>70&&Math.random()<Math.min(.22,(p.age-69)/180)){p.alive=false;p.ageAtDeath=p.age;p.milestones=p.milestones||[];p.milestones.push({age:p.age,title:'Died'});recordLife('familyDeath',`${p.name} died`,{personId:p.id,relation:p.relation,ageAtDeath:p.age});log(`Age ${s.age}: ${p.name}, your ${p.relation.toLowerCase()}, died at age ${p.age}.`);if(s.partner?.id===p.id){s.relationship='Widowed';s.exPartners.push(p);s.partner=null;queueMilestone('🕯️ Loss in the Family',`${p.name}, your spouse, died at age ${p.age}.`)}stat('happiness',-10);stat('stress',8)}
  }
}
function relationshipYear(){if(!s.partner)return;const y=D.balance.yearly.relationships;s.partner.quality=clamp(s.partner.quality+rand(...y.partnerQualityDrift));if(s.partner.quality<y.breakupQualityThreshold&&Math.random()<y.breakupChance){log(`Age ${s.age}: Your relationship with ${s.partner.name} ended.`);s.relationship='Single';s.partner=null;stat('happiness',y.breakupHappiness)}}
function healthYear(){s.medicalCost=0;s.conditions=s.conditions.map(c=>({...c,duration:c.duration-1})).filter(c=>c.duration>0);for(const [id,ill] of Object.entries(D.illnesses)){if(s.age<ill.minAge||s.conditions.some(c=>c.id===id))continue;let chance=ill.chance*diff().health*(1+(100-s.health)/100)*(1+s.stress/160);if(Math.random()<chance){s.conditions.push({id,name:ill.name,duration:ill.duration});s.medicalCost+=ill.cost;stat('health',ill.health);log(`Age ${s.age}: You developed ${ill.name}. Medical costs were ${money(ill.cost)}.`)}}if(s.stress>70){stat('health',-4);stat('happiness',-3)}if(s.fitness<30)stat('health',-2);if(s.age>50)stat('health',-rand(.8,2.8));if(s.conditions.length)stat('health',-s.conditions.length)}
function businessYear(){if(!s.business)return;const ind=D.industries[s.business.industry];const econ=s.economy.state==='Boom'?1.16:s.economy.state==='Recession'?.82:1;const revenue=ind.baseRevenue*(1+s.business.level*.45)*(1+s.business.employees*.18)*econ*rand(.78,1.25);const payroll=s.business.employees*32000;const other=revenue*(1-ind.margin);const profit=revenue-payroll-other;s.business.revenue=Math.round(revenue);s.business.cash=Math.max(0,s.business.cash+profit);s.business.reputation=clamp(s.business.reputation+rand(-3,4));log(`Age ${s.age}: ${s.business.name} ${profit>=0?'earned':'lost'} ${money(Math.abs(profit))}.`);if(s.business.cash<=0&&profit<0&&Math.random()<.35){log(`Age ${s.age}: ${s.business.name} closed after running out of cash.`);s.business=null;stat('happiness',-10)}}
function processConsequences(){const due=s.pendingConsequences.filter(x=>x.age<=s.age);s.pendingConsequences=s.pendingConsequences.filter(x=>x.age>s.age);for(const c of due){applyEffects(c.effect||{});log(`Age ${s.age}: ${c.text}`)}}
function maybeDeath(){if(s.age<45&&s.health>10)return false;let chance=Math.max(0,(s.age-55)/700)+(100-s.health)/1200+(s.age>85?(s.age-85)/110:0)-(s.hidden.longevity-50)/2500;chance=Math.max(.001,chance);if(Math.random()<chance){s.dead=true;s.deathCause=s.health<25?'health complications':'natural causes';log(`Age ${s.age}: ${s.name} died from ${s.deathCause}.`);showDeath();return true}return false}
function ageYear(){if(s.dead)return;if(eventQueue.length)return showEvent();const before={netWorth:netWorth(),income:s.job?s.salary:(s.retired?s.retirementIncome:0),expenses:annualExpenses()};applyNeglect();s.age++;s.actionPoints=AP_MAX;s.actionUse={};ambientYear();processConsequences();economyYear();schoolYear();educationYear();npcYear();healthYear();careerYear();financeYear();businessYear();relationshipYear();const afterWorth=netWorth();s.lastAnnualSummary={age:s.age,income:Math.round(before.income||0),expenses:Math.round(before.expenses||0),investmentChange:Math.round(s.lastInvestmentChange||0),netWorthBefore:Math.round(before.netWorth),netWorthAfter:Math.round(afterWorth),netWorthChange:Math.round(afterWorth-before.netWorth),majorEvents:s.structuredHistory.filter(x=>x.age===s.age).slice(0,4).map(x=>x.title)};recordLife('annualRecap',`Age ${s.age} recap`,{netWorthAfter:Math.round(afterWorth)});if(maybeDeath()){commit();openPanel('life');return}queueEvent();commit();openPanel('life');showEvent()}

function conditionPass(c){switch(c){case'goodStudent':return(s.gpa||0)>=3.1;case'employed':return!!s.job;case'recession':return s.economy.state==='Recession'&&!!s.job;case'hasFamily':return s.family.parents.some(p=>p.alive)||s.family.siblings.some(p=>p.alive);case'hasChild':return s.family.children.some(p=>p.alive);case'hasBusiness':return!!s.business;case'hasPartner':return!!s.partner;default:return true}}
function queueEvent(){const chance={low:.35,normal:.58,high:.82}[s.settings.eventFrequency]||.58;if(Math.random()>chance)return;const valid=D.events.filter(e=>s.age>=e.minAge&&s.age<=e.maxAge&&meetsRequirements(e.requirements||[])&&conditionPass(e.condition)&&(!e.careerTracks||e.careerTracks.includes(D.jobs[s.job]?.track)));if(!valid.length)return;const weighted=[];valid.forEach(e=>{for(let i=0;i<(e.weight||1);i++)weighted.push(e)});eventQueue.push(rn(weighted))}
function showEvent(){if(!eventQueue.length)return;$('eventOverlay').classList.remove('hidden');const e=eventQueue[0];$('eventTitle').textContent=e.title;$('eventText').textContent=e.text;$('eventChoices').innerHTML='';e.choices.forEach(c=>{const b=document.createElement('button');b.textContent=c.label;b.onclick=()=>chooseEvent(c,e);$('eventChoices').appendChild(b)})}
function applyEffects(e,options={}){const scaledKeys=new Set(options.scaledKeys||[]),key=options.actionKey;for(const[k,v]of Object.entries(e||{})){const value=key&&scaledKeys.has(k)?scaled(v,key):v;if(k==='salaryPct'){const proposed=Math.round(s.salary*(1+value));s.salary=s.job?Math.min(salaryCeiling(D.jobs[s.job]),proposed):proposed;continue}if(k==='businessCash'&&s.business){s.business.cash=Math.max(0,s.business.cash+value);continue}if(k==='businessRep'&&s.business){s.business.reputation=clamp(s.business.reputation+value);continue}if(k==='bossQuality'){s.bossQuality=clamp((s.bossQuality??50)+value);continue}if(k==='partnerQuality'&&s.partner){s.partner.quality=clamp(s.partner.quality+value);continue}if(k==='careerReputation'){s.careerReputation=clamp((s.careerReputation||0)+value);continue}stat(k,value)}}
function runDefinedAction(def,options={}){if(!def)return false;const miss=missingRequirements(def.requirements||[]);if(miss.length){if(options.messageId)msg(options.messageId,`Locked: ${miss.join(' • ')}.`);else toast(`Locked: ${miss.join(' • ')}`);return false}const key=def.actionKey||def.id;if(def.ap&&!actionCost(key,def.ap))return false;applyEffects(def.effects||{},{actionKey:key,scaledKeys:def.scaled||[]});if(def.bossQuality!==undefined){const gain=def.bossQualityScaled?scaled(def.bossQuality,key):def.bossQuality;s.bossQuality=clamp((s.bossQuality??50)+gain)}if(def.narrative)log(def.narrative);if(def.toast)toast(def.toast);if(def.ap&&(s.actionUse[key]||0)>1&&!def.toast)toast('Repeated action: reduced benefit');return true}
function chooseEvent(c,e){if(c.cost&&s.cash<c.cost){toast(`Need ${money(c.cost)}.`);return}if(c.cost)s.cash-=c.cost;let outcome=c.effect||{};if(c.chance){let p=.5;if(c.chance==='scholarship')p=.35+(s.gpa||0)/8+s.intelligence/500+s.hidden.luck/700;if(c.chance==='jobOffer')p=.45+s.social/350+s.performance/500;if(c.chance==='businessDeal')p=.42+s.skills.business/250+(s.business?.reputation||0)/500+s.hidden.luck/900;outcome=Math.random()<p?(c.success||{}):(c.failure||{})}applyEffects(outcome);if(c.familyQuality)[...s.family.parents,...s.family.siblings].filter(x=>x.alive).forEach(x=>x.quality=clamp(x.quality+c.familyQuality));if(c.partnerQuality&&s.partner)s.partner.quality=clamp(s.partner.quality+c.partnerQuality);if(c.childBoost){const child=s.family.children.filter(x=>x.alive)[0];if(child){child.skill=clamp((child.skill||50)+c.childBoost);child.quality=clamp(child.quality+4)}}if(c.spawnFriend)makeFriend(true);if(c.delayed)s.pendingConsequences.push({age:s.age+c.delayed.years,text:c.delayed.text,effect:c.delayed.effect});log(`Age ${s.age}: ${e.title} — ${c.result}`);eventQueue.shift();$('eventOverlay').classList.add('hidden');commit();showEvent()}
function showDeath(){closeCareerRecord('Died');recordLife('death',`${s.name} died`,{cause:s.deathCause});const topCareer=s.careerHistory[0]?.title||'No recorded career',summary=`<p><strong>${escapeHtml(s.name)}</strong> lived to age <strong>${s.age}</strong>.</p><p>${escapeHtml(s.education)} • ${escapeHtml(topCareer)}${s.retired?' • Retired':''}</p><div class="kv">${lifetimeStatsHtml()}<span>Certifications</span><strong>${s.certifications.length}</strong><span>Milestones</span><strong>${s.milestones.length}</strong><span>Career records</span><strong>${s.careerHistory.length}</strong></div><p>Cause: ${escapeHtml(s.deathCause||'Unknown')}</p>`;$('deathSummary').innerHTML=summary;$('legacyChoices').innerHTML='';const adults=s.family.children.filter(c=>c.alive&&c.age>=18);for(const child of adults){const b=document.createElement('button');b.textContent=`Continue as ${child.name}, age ${child.age}`;b.onclick=()=>continueGeneration(child);$('legacyChoices').appendChild(b)}$('deathOverlay').classList.remove('hidden')}
function continueGeneration(child){const inherited=Math.max(0,netWorth()*.55),old=s;const ns=freshState(child.name,child.gender&&child.gender!=='Unknown'?child.gender:old.gender,old.birthplace,old.background,old.difficulty);ns.age=child.age;ns.location=old.location;ns.generation=old.generation+1;ns.cash=inherited;ns.education=child.age>=22?'College':child.age>=18?'High School':'None';ns.intelligence=clamp(child.skill||50);ns.social=clamp(child.quality||55);const parent=npc(old.name,'Parent',old.age,80,old.gender);parent.alive=false;parent.ageAtDeath=old.age;parent.career=old.careerHistory?.[0]?.title||null;parent.education=old.education;ns.family.parents=[parent];ns.family.siblings=old.family.children.filter(c=>c.id!==child.id).map(c=>({...c,relation:'Sibling'}));ns.family.ancestors=[...(old.family.ancestors||[]),...old.family.parents.map(p=>({...p,relation:p.relation==='Parent'?'Grandparent':p.relation}))];ns.achievements=[...old.achievements,'legacy'];ns.history=[`Generation ${ns.generation}: ${child.name} inherited ${money(inherited)} and continued the family legacy.`];ns.structuredHistory=[{id:uid(),age:ns.age,type:'generation',title:`Generation ${ns.generation} began`,inheritance:Math.round(inherited)}];s=ns;eventQueue=[];$('deathOverlay').classList.add('hidden');commit();toast('Legacy continued')}

function educationCost(name){
  const p=D.education[name];if(!p)return null;
  const uni=p.usesUniversity?(D.universities[$('universitySelect').value]||D.universities['State University']):{tuition:1};
  const annual=Math.round(p.cost*uni.tuition),firstYear=Math.max(0,annual-(s.scholarship||0));
  return {annual,years:p.years,total:Math.max(0,annual*p.years-(s.scholarship||0)),firstYear};
}
function selectedEducationProgram(){return $('educationProgramSelect').value||'College'}
function educationTrackOptions(program){
  if(program==='College')return Object.keys(D.majors||{});
  return Object.keys(D.educationTracks?.[program]?.options||{});
}
function syncEducationTrackOptions(){
  const program=selectedEducationProgram(),sel=$('majorSelect'),choices=educationTrackOptions(program),previous=sel.value||s.programTrack||s.major;
  sel.innerHTML='';choices.forEach(x=>sel.add(new Option(x,x)));
  if(choices.includes(previous))sel.value=previous;
  $('educationTrackLabel').textContent=D.educationTracks?.[program]?.label||'Major';
}
function renderEducationCostPreview(){
  const name=selectedEducationProgram(),p=D.education[name],c=educationCost(name);if(!p||!c)return;
  syncEducationTrackOptions();
  const needsUni=!!p.usesUniversity;$('universityField').classList.toggle('hidden',!needsUni);$('majorField').classList.toggle('hidden',educationTrackOptions(name).length===0);
  const miss=missingRequirements(p.requirements||[]),uni=needsUni?$('universitySelect').value:null,admission=needsUni?(D.universities[uni]?.admission||0):0,admissionMiss=needsUni&&(s.gpa||2.5)<admission,track=$('majorSelect').value||'None';
  const finance=c.firstYear>s.cash?'Student loans may be required':'Current cash can cover the first year';
  $('educationCostPreview').innerHTML=`<div class="education-cost-row"><strong>${escapeHtml(name)}</strong><span>${track!=='None'?`${escapeHtml(track)} • `:''}${needsUni?`${escapeHtml(uni)} • `:''}${money(c.annual)}/year • ${c.years} years</span><span>Estimated total: ${money(c.total)}</span><small>${s.scholarship?`Scholarship: ${money(s.scholarship)} • `:''}${finance}</small>${miss.length?`<small class="locked-text">🔒 ${escapeHtml(miss.join(' • '))}</small>`:''}${admissionMiss?`<small class="locked-text">🔒 ${escapeHtml(uni)} requires about a ${admission.toFixed(1)} GPA.</small>`:''}</div>`;
  $('enrollEducationBtn').textContent=`Enroll in ${name}`;$('enrollEducationBtn').disabled=!!(miss.length||admissionMiss||s.dead);
}
function startProgram(name){
  const p=D.education[name];if(!p)return;const miss=missingRequirements(p.requirements||[]);if(miss.length)return msg('educationMessage',`Locked: ${miss.join(' • ')}.`);
  if(p.usesUniversity){const u=$('universitySelect').value,req=D.universities[u]?.admission||0;if((s.gpa||2.5)<req)return msg('educationMessage',`${u} requires about a ${req.toFixed(1)} GPA.`);s.university=u}
  s.program=name;s.programTrack=$('majorSelect').value||'None';s.programYears=0;s.programNeed=p.years;s.programAnnualCost=p.cost;
  log(`Age ${s.age}: Started ${name}${s.programTrack!=='None'?` — ${s.programTrack}`:''}.`);recordLife('education',`Started ${name}`,{track:s.programTrack,school:p.usesUniversity?s.university:null});msg('educationMessage',`Enrolled in ${name}.`);commit()
}
function jobOK(j){return meetsRequirements(j.requirements||[])}
function makeFriend(silent=false){if(s.friends.length>=12)return silent?null:msg('choiceMessage','You already have a large close-friend circle.');const f=npc(rn(D.names.adults),'Friend',Math.max(5,s.age+Math.floor(rand(-3,4))),Math.floor(rand(50,76)));s.friends.push(f);stat('social',3);stat('happiness',2);if(!silent)log(`Age ${s.age}: You became friends with ${f.name}.`);commit();return f}
function riskyConfirm(text){return !s.settings.confirmRisk||confirm(text)}

function makeDataButton(def,handler){const b=document.createElement('button');b.type='button';b.textContent=def.label||def.name||def.id;b.dataset.ap=String(def.ap||1);b.dataset.contentId=def.id||'';b.onclick=handler;return b}
function effectValue(key){return key in s.skills?s.skills[key]:s[key]}
function effectLabel(key){return key==='intelligence'?'Smarts':key[0].toUpperCase()+key.slice(1)}
function actionProgressText(def,before){
  const parts=[];
  for(const key of Object.keys(def.effects||{})){
    const old=before[key],now=effectValue(key);
    if(!Number.isFinite(old)||!Number.isFinite(now))continue;
    const delta=Math.round(now-old);
    if(delta===0)continue;
    parts.push(`${effectLabel(key)} ${Math.round(old)} → ${Math.round(now)} (${delta>0?'+':''}${delta})`);
  }
  return parts.join(' • ')||'No visible change — this stat may already be at its limit.';
}
function bindDataDrivenContent(){
  const mind=$('mindBodyActions'),skills=$('skillActions'),clubs=$('schoolClubActions'),hobbies=$('hobbyActions');
  if(mind)mind.innerHTML='';if(skills)skills.innerHTML='';if(clubs)clubs.innerHTML='';if(hobbies)hobbies.innerHTML='';
  Object.values(D.activities||{}).forEach(a=>{const host=a.group==='skills'?skills:mind;if(!host)return;host.appendChild(makeDataButton(a,()=>{const def={...a,scaled:Object.keys(a.effects||{}).filter(k=>(a.effects[k]||0)>0)},before={};Object.keys(a.effects||{}).forEach(k=>before[k]=effectValue(k));if(!runDefinedAction(def))return;const feedback=actionProgressText(def,before);commit();msg(a.group==='skills'?'skillMessage':'choiceMessage',feedback)}))});
  Object.values(D.schoolClubs||{}).forEach(c=>{if(!clubs)return;clubs.appendChild(makeDataButton(c,()=>{if(s.age<5||s.age>=18)return toast('School clubs are available while you are in school.');if(!runDefinedAction(c))return;s.club=c.name;commit()}))});
  Object.entries(D.hobbies||{}).forEach(([key,h])=>{if(!hobbies)return;hobbies.appendChild(makeDataButton(h,()=>{const def={...h,actionKey:`hobby:${key}`,scaled:Object.keys(h.effects||{}).filter(k=>(h.effects[k]||0)>0)};if(!runDefinedAction(def))return;const gain=scaled(5,def.actionKey);s.hobbies[key]=clamp((s.hobbies[key]||0)+gain);recordLife('hobby',`Practiced ${h.label}`,{hobby:key,proficiency:s.hobbies[key]});commit();msg('hobbyMessage',`${h.label} proficiency is now ${Math.round(s.hobbies[key])}/100.`)}))});
  const lawyer=$('lawyerSelect');if(lawyer){lawyer.innerHTML='';Object.entries(D.legalDefense||{}).forEach(([id,x])=>lawyer.add(new Option(`${x.name}${x.cost?` (${money(x.cost)})`:''}`,id)))}
}


const scrollLifeStoryNewest=()=>requestAnimationFrame(()=>{const el=$('log');if(el)el.scrollTop=0});
function openPanel(name){$$('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));$$('.panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===name));window.scrollTo({top:0,behavior:'smooth'});if(name==='life')scrollLifeStoryNewest()}

function bind(){
  $$('.tab').forEach(b=>b.onclick=()=>openPanel(b.dataset.tab));
  $('homeBtn').onclick=()=>openPanel('life');$('settingsBtn').onclick=()=>openPanel('stats');$$('.menu-close').forEach(b=>b.onclick=()=>openPanel('life'));
  $('jobSelect').onchange=showJobRequirements;$('careerTrackSelect').onchange=refreshJobOptions;$('savingsAmountSelect').onchange=()=>{$('savingsCustomAmount').classList.toggle('hidden',$('savingsAmountSelect').value!=='custom')};$('investmentAmountSelect').onchange=()=>{$('investmentCustomAmount').classList.toggle('hidden',$('investmentAmountSelect').value!=='custom')};$('mortgageAmountSelect').onchange=()=>{$('mortgageCustomAmount').classList.toggle('hidden',$('mortgageAmountSelect').value!=='custom')};$('housingSelect').onchange=renderHousingDetails;$('lifestyleSelect').onchange=()=>{s.lifestyle=$('lifestyleSelect').value;msg('financeMessage',`${s.lifestyle} lifestyle selected.`);commit()};bindDataDrivenContent();$('careerTrackSelect').add(new Option('All Careers','All Careers'));[...new Set(Object.values(D.jobs).map(j=>j.track||'Other'))].sort().forEach(x=>$('careerTrackSelect').add(new Option(x,x)));D.genders.forEach(x=>$('genderInput').add(new Option(x,x)));Object.keys(D.locations).forEach(x=>{$('birthplaceInput').add(new Option(x,x));$('moveSelect').add(new Option(x,x))});Object.keys(D.backgrounds).forEach(x=>$('backgroundInput').add(new Option(x,x)));Object.keys(D.difficulties).forEach(x=>$('difficultyInput').add(new Option(x,x)));Object.keys(D.majors).forEach(x=>$('majorSelect').add(new Option(x,x)));Object.keys(D.universities).forEach(x=>$('universitySelect').add(new Option(x,x)));D.balance.finance.transferOptions.forEach(x=>{$('savingsAmountSelect').add(new Option(x.label,x.id));$('investmentAmountSelect').add(new Option(x.label,x.id));$('mortgageAmountSelect').add(new Option(x.label,x.id))});Object.keys(D.lifestyles).forEach(x=>$('lifestyleSelect').add(new Option(x,x)));Object.entries(D.certifications).forEach(([x,c])=>$('certSelect').add(new Option(`${x} — ${c.category||'General'} • ${money(c.cost||0)}`,x)));Object.entries(D.housing).forEach(([k,h])=>$('housingSelect').add(new Option(h.name,k)));Object.entries(D.inventoryCatalog).forEach(([k,i])=>$('itemSelect').add(new Option(`${i.name} — ${money(i.price)}`,k)));Object.keys(D.industries).forEach(x=>$('industrySelect').add(new Option(x,x)));Object.entries(D.crimes).forEach(([k,c])=>$('crimeSelect').add(new Option(c.name,k)));
  $('newLifeBtn').onclick=()=>{if(!riskyConfirm('Start a new life and replace the current autosave?'))return;s=freshState($('nameInput').value.trim()||'Player',$('genderInput').value,$('birthplaceInput').value,$('backgroundInput').value,$('difficultyInput').value);eventQueue=[];$('deathOverlay').classList.add('hidden');msg('characterMessage','New life started.');commit()};$('ageBtn').onclick=ageYear;
  $('studySchoolBtn').onclick=()=>{if(s.age<5||s.age>=18)return;if(!actionCost('schoolStudy'))return;const m=actionMultiplier('schoolStudy');s.gpa=Math.min(4,(s.gpa??2.5)+.18*m);stat('intelligence',scaled(2,'schoolStudy'));stat('stress',3);log('I studied harder for school.');msg('schoolMessage',m<1?'GPA improved, but repeated studying had diminishing returns.':'GPA improved.');commit()};

  $('datingPreferenceSelect').onchange=()=>{s.datingPreference=$('datingPreferenceSelect').value;commit()};$('educationProgramSelect').onchange=renderEducationCostPreview;$('universitySelect').onchange=renderEducationCostPreview;$('majorSelect').onchange=renderEducationCostPreview;
  $('enrollEducationBtn').onclick=()=>startProgram(selectedEducationProgram());$('dropoutBtn').onclick=()=>{if(!s.program)return msg('educationMessage','You are not enrolled.');log(`Age ${s.age}: Dropped out of ${s.program}.`);s.program=null;s.programYears=0;s.programNeed=0;s.programAnnualCost=0;stat('stress',-4);commit()};
  $('certBtn').onclick=()=>{const name=$('certSelect').value,c=D.certifications[name];if(s.certifications.includes(name))return msg('certMessage','Already earned.');const miss=missingRequirements(c.requirements||[]);if(miss.length)return msg('certMessage',`Locked: ${miss.join(' • ')}.`);if(s.cash<c.cost){s.debt+=c.cost}else s.cash-=c.cost;s.certifications.push(name);s.certificationHistory.push({id:uid(),name,category:c.category||'General',age:s.age});Object.entries(c.boost||{}).forEach(([k,v])=>stat(k,v));recordLife('certification',`Earned ${name}`,{category:c.category||'General'});log(`Age ${s.age}: Earned ${name}.`);msg('certMessage','Certification earned.');commit()};
  $('applyBtn').onclick=()=>{const k=$('jobSelect').value,j=D.jobs[k],a=D.balance.career.apply;if(!jobOK(j))return msg('careerMessage',`Locked: ${jobMissing(j).join(' • ')}.`);if(!actionCost(a.actionKey,a.ap))return;const chance=a.baseChance+s.social/a.socialDivisor+s.intelligence/a.intelligenceDivisor+(j.skill?jobSkillValue(j)/a.jobSkillDivisor:0)+s.certifications.length*a.certBonusEach-(s.criminalRecord?a.criminalPenalty:0)+s.hidden.luck/a.luckDivisor;if(Math.random()>chance){s.pendingJobOffer=null;msg('careerMessage','Interview unsuccessful. Improve your qualifications and try again.');return commit()}const [marketMin,marketMax]=marketSalaryRange(j),offer=estimatedJobOffer(j);s.pendingJobOffer={jobKey:k,company:rn(D.companies),offer,marketMin,marketMax,negotiated:false};msg('careerMessage','Interview successful — review the offer below.');commit()};
  $('acceptOfferBtn').onclick=()=>{const o=s.pendingJobOffer;if(!o)return;const j=D.jobs[o.jobKey];if(s.job){closeCareerRecord('Changed jobs');log(`I left ${s.company} for a new opportunity.`)}s.job=o.jobKey;s.salary=o.offer;s.jobStartingSalary=o.offer;s.performance=D.balance.career.apply.startPerformance;s.jobYears=0;s.company=o.company;s.bossQuality=Math.round(rand(...D.balance.career.apply.bossQuality));s.jobsHeld++;s.retired=false;s.retirementIncome=0;s.pendingJobOffer=null;startCareerRecord(s.job,s.company,s.salary);s.careerReputation=clamp((s.careerReputation||20)+2);log(`Hired as ${j.name} at ${s.company} for ${money(s.salary)} per year.`);msg('careerMessage',`Offer accepted at ${money(s.salary)}.`);commit()};
  $('negotiateOfferBtn').onclick=()=>{const o=s.pendingJobOffer;if(!o||o.negotiated)return;const cfg=D.balance.career.apply.negotiation,j=D.jobs[o.jobKey],steps=educationOfferSteps(j),chance=Math.min(.9,cfg.baseChance+s.social/cfg.socialDivisor+s.intelligence/cfg.intelligenceDivisor+(s.totalYearsWorked||0)/cfg.experienceDivisor+steps*cfg.educationStepBonus+s.certifications.length*cfg.certBonusEach+(s.performance||0)/cfg.performanceDivisor+(s.careerReputation||0)/(cfg.reputationDivisor||1400));o.negotiated=true;if(Math.random()<chance){const old=o.offer,bump=rand(...cfg.raiseRange),target=Math.round(old*(1+bump));o.offer=Math.min(o.marketMax,target);msg('jobOfferMessage',o.offer>old?`Negotiation worked: ${money(old)} → ${money(o.offer)}.`:'The offer is already at the top of the market range.')}else msg('jobOfferMessage','The employer held firm on the original offer.');commit()};
  $('declineOfferBtn').onclick=()=>{if(!s.pendingJobOffer)return;s.pendingJobOffer=null;msg('careerMessage','You declined the offer.');commit()};
  $('workBtn').onclick=()=>{if(runDefinedAction(D.balance.career.work))commit()};$('networkBtn').onclick=()=>{if(runDefinedAction(D.balance.career.network))commit()};
  $('promotionBtn').onclick=()=>{if(!s.job)return;const a=D.balance.career.promotion;if(!actionCost(a.actionKey,a.ap))return;const j=D.jobs[s.job],next=j.next&&D.jobs[j.next];
    if(next&&jobOK(next)&&s.performance>=a.minPerformance&&s.bossQuality>=a.minBossQuality){
      closeCareerRecord('Promoted');const oldTitle=j.name;s.job=j.next;s.salary=estimatedJobOffer(next);s.jobStartingSalary=s.salary;s.performance=a.promotionPerformance;s.jobYears=0;s.careerReputation=clamp((s.careerReputation||0)+5);startCareerRecord(s.job,s.company,s.salary);recordLife('promotion',`Promoted to ${next.name}`,{from:oldTitle,salary:s.salary});log(`Promoted to ${next.name} at ${money(s.salary)} per year.`);msg('careerMessage',`Promoted to ${next.name}! New salary ${money(s.salary)}.`);
    }else if(Math.random()<a.raiseBaseChance+s.performance/a.performanceDivisor+s.social/a.socialDivisor+(s.bossQuality||0)/a.bossDivisor){
      const old=s.salary,ceiling=salaryCeiling(j),proposed=Math.round(old*rand(...a.raiseRange));s.salary=Math.min(ceiling,proposed);const rec=currentCareerRecord();if(rec)rec.finalSalary=s.salary;
      if(s.salary>old){const pct=((s.salary/old-1)*100).toFixed(1);s.careerReputation=clamp((s.careerReputation||0)+1);recordLife('raise',`${pct}% raise`,{salary:s.salary});log(`Received a ${pct}% raise: ${money(old)} → ${money(s.salary)}.`);msg('careerMessage',`Raise approved +${pct}% • ${money(old)} → ${money(s.salary)}.`)}
      else msg('careerMessage',`You're at the compensation ceiling for ${j.name}. The next major pay jump requires a promotion or job change.`);
    }else msg('careerMessage','Promotion or raise denied.');commit()
  };
  $('retireBtn').onclick=()=>{const r=D.balance.career.retirement;if(!s.job)return msg('careerMessage','You need an active career to retire from.');if(s.age<r.minAge||(s.totalYearsWorked||0)<r.minYears)return msg('careerMessage',`Retirement unlocks at age ${r.minAge} with ${r.minYears} years worked.`);const title=D.jobs[s.job]?.name||'career',base=s.salary;closeCareerRecord('Retired');s.retirementIncome=Math.round(base*r.incomeRate);s.retired=true;s.job=null;s.salary=0;s.jobStartingSalary=0;s.performance=0;s.company=null;s.bossQuality=null;s.pendingJobOffer=null;s.careerReputation=clamp((s.careerReputation||0)+r.reputationBonus);recordLife('retirement',`Retired from ${title}`,{retirementIncome:s.retirementIncome});log(`Age ${s.age}: Retired from ${title}. Estimated annual retirement income is ${money(s.retirementIncome)}.`);msg('careerMessage',`Retired. Annual retirement income: ${money(s.retirementIncome)}.`);commit()};
  $('quitBtn').onclick=()=>{if(!s.job)return;closeCareerRecord('Quit');log(`Age ${s.age}: You quit your job at ${s.company}.`);s.job=null;s.salary=0;s.jobStartingSalary=0;s.performance=0;s.company=null;s.bossQuality=null;s.pendingJobOffer=null;commit()};
  const transferOption=(selectId,customId,available)=>{const id=$(selectId).value,opt=D.balance.finance.transferOptions.find(x=>x.id===id)||D.balance.finance.transferOptions[0];if(opt.custom){const n=Number($(customId).value);return Number.isFinite(n)&&n>0?Math.round(n):0}if(opt.all)return Math.max(0,Math.round(available));if(opt.percent)return Math.max(0,Math.round(available*opt.percent));return Math.max(0,Math.round(opt.amount||0))};
  const moveMoney=(from,to,amount,messageId)=>{const available=Number(s[from]||0),a=Math.min(Math.max(0,Math.round(amount)),Math.round(available));if(a<=0)return msg(messageId,from==='cash'?'Not enough cash for that transfer.':`No ${from} funds available for that transfer.`);s[from]-=a;s[to]+=a;const labels={cash:'Checking',savings:'Savings',investments:'Investments'};log(`${money(a)} moved ${labels[from]} → ${labels[to]}.`);commit();msg(messageId,`${money(a)} moved ${labels[from]} → ${labels[to]}.`)};
  $('saveMoneyBtn').onclick=()=>moveMoney('cash','savings',transferOption('savingsAmountSelect','savingsCustomAmount',s.cash),'financeMessage');
  $('withdrawSavingsBtn').onclick=()=>moveMoney('savings','cash',transferOption('savingsAmountSelect','savingsCustomAmount',s.savings),'financeMessage');
  $('loanBtn').onclick=()=>{const f=F.loan,miss=missingRequirements(f.requirements||[]);if(miss.length)return msg('financeMessage',`Loan denied: ${miss.join(' • ')}.`);s.cash+=f.amount;s.debt+=f.amount;s.credit-=f.creditPenalty;commit()};
  const payDebt=amount=>{const f=F.debtPayment,p=Math.min(Math.max(0,Math.round(amount)),Math.round(s.cash),Math.round(s.debt));if(p<=0)return msg('financeMessage',s.debt<=0?'You have no debt to pay.':'You need cash to make a debt payment.');s.cash-=p;s.debt=Math.max(0,s.debt-p);if(s.credit!==null)s.credit=Math.min(850,s.credit+f.creditGain);log(`I paid ${money(p)} toward my debt.`);commit();msg('financeMessage',`${money(p)} paid toward debt.`)};
  $('payDebtBtn').onclick=()=>payDebt(F.debtPayment.options?.[0]||F.debtPayment.amount);
  $('payDebt10000Btn').onclick=()=>payDebt(F.debtPayment.options?.[1]||10000);
  $('payDebt25Btn').onclick=()=>payDebt(s.debt*(F.debtPayment.percentOption||.25));
  $('payDebtAllBtn').onclick=()=>payDebt(s.debt);
  $('investBtn').onclick=()=>moveMoney('cash','investments',transferOption('investmentAmountSelect','investmentCustomAmount',s.cash),'investmentMessage');
  $('sellInvestBtn').onclick=()=>moveMoney('investments','cash',transferOption('investmentAmountSelect','investmentCustomAmount',s.investments),'investmentMessage');
  $('bankruptcyBtn').onclick=()=>{const f=F.bankruptcy;if(!riskyConfirm('Declare bankruptcy? This clears debt but destroys credit and investments.'))return;s.debt=0;s.credit=f.credit;s.investments=0;stat('happiness',f.happiness);stat('stress',f.stress);log(`Age ${s.age}: Declared bankruptcy.`);commit()};
  $('housingBtn').onclick=()=>{const key=$('housingSelect').value,h=D.housing[key],current=D.housing[s.housing];if(s.age<h.minAge)return msg('housingMessage','Too young for that housing option.');if(current?.owned&&key!==s.housing)return msg('housingMessage','Sell your current home before moving or buying another property.');if(key===s.housing)return msg('housingMessage',`You already live in ${h.name}.`);if(key==='parents'){s.housing='parents';s.homePurchasePrice=0;log(`Age ${s.age}: Moved in with family.`);commit();return}if(!h.owned){s.housing=key;s.homePurchasePrice=0;log(`Age ${s.age}: Moved into an apartment.`);commit();return}const price=housingMarketPrice(key),mort=D.balance.yearly.finance.mortgage,down=Math.round(price*mort.downPayment);if((s.credit||0)<620)return msg('housingMessage','Credit 620+ required.');if(s.cash<down)return msg('housingMessage',`Need ${money(down)} for the down payment.`);s.cash-=down;s.housing=key;s.homePurchasePrice=price;s.mortgageBalance=price-down;s.mortgageRate=s.economy.interest+mort.rateSpread;s.mortgageYearsRemaining=mort.termYears;s.credit=Math.max(300,s.credit-12);s.stats.homesOwned++;recordLife('homePurchase',`Bought ${h.name}`,{price,down});log(`Age ${s.age}: Bought a ${h.name} for ${money(price)} with ${money(down)} down.`);msg('housingMessage',`Home purchased. Mortgage: ${money(s.mortgageBalance)} at ${(s.mortgageRate*100).toFixed(2)}%.`);commit()};
  $('payMortgageBtn').onclick=()=>{if(!(s.mortgageBalance>0))return msg('housingMessage','Your home has no mortgage balance.');const a=Math.min(s.cash,s.mortgageBalance,transferOption('mortgageAmountSelect','mortgageCustomAmount',s.mortgageBalance));if(a<=0)return msg('housingMessage','Choose a valid payment amount and make sure you have enough cash.');s.cash-=a;s.mortgageBalance=Math.max(0,s.mortgageBalance-a);log(`I made an extra ${money(a)} mortgage payment.`);if(s.mortgageBalance<=0){s.mortgageBalance=0;s.mortgageYearsRemaining=0;msg('housingMessage','Mortgage paid off!')}else msg('housingMessage',`${money(a)} paid toward the mortgage. ${money(s.mortgageBalance)} remaining.`);commit()};
  $('sellHomeBtn').onclick=()=>{const h=D.housing[s.housing];if(!h?.owned)return msg('housingMessage','You do not currently own a home to sell.');const value=homeValue(),cost=Math.round(value*(D.balance.yearly.finance.mortgage.saleCost||.06)),net=Math.round(value-cost-(s.mortgageBalance||0));if(!riskyConfirm(`Sell ${h.name} for about ${money(value)}? Selling costs are about ${money(cost)}.`))return;if(net>=0)s.cash+=net;else s.debt+=Math.abs(net);log(`Age ${s.age}: Sold ${h.name} for ${money(value)}${net>=0?`, receiving ${money(net)} after mortgage and selling costs`:` and owed ${money(Math.abs(net))} after the sale`}.`);s.housing='parents';s.homePurchasePrice=0;s.mortgageBalance=0;s.mortgageRate=0;s.mortgageYearsRemaining=0;msg('housingMessage',net>=0?`${money(net)} added to Checking after the sale.`:'The sale deficiency was added to debt.');commit()};
  $('maintainItemsBtn').onclick=()=>{if(!s.inventory.length)return msg('inventoryMessage','You do not own anything to maintain.');if(s.cash<500)return msg('inventoryMessage','Need $500.');s.cash-=500;s.inventory.forEach(i=>i.condition=clamp(i.condition+18));msg('inventoryMessage','Owned items maintained.');commit()};$('buyItemBtn').onclick=()=>{const key=$('itemSelect').value,it=D.inventoryCatalog[key];if(s.cash<it.price)return msg('inventoryMessage',`Need ${money(it.price)}.`);s.cash-=it.price;s.inventory.push({id:uid(),key,name:it.name,type:it.type,condition:100,value:Math.round(it.price*.82),conditionLoss:it.conditionLoss,annualCost:it.annualCost||0});log(`Age ${s.age}: Bought ${it.name}.`);commit()};
  $('startBusinessBtn').onclick=()=>{if(!canAdult())return msg('businessMessage','You must be an adult and not incarcerated.');if(s.business)return msg('businessMessage','You already own a business.');const industry=$('industrySelect').value,ind=D.industries[industry];if(s.cash<ind.start)return msg('businessMessage',`Need ${money(ind.start)}.`);s.cash-=ind.start;s.business={name:`${s.name}'s ${industry}`,industry,level:1,employees:0,reputation:50,cash:ind.start*.3,revenue:0};s.stats.businessesStarted++;stat('business',8);recordLife('business',`Started ${s.business.name}`,{industry});log(`Age ${s.age}: Started ${s.business.name}.`);commit()};$('hireBtn').onclick=()=>{if(!s.business)return;if(s.business.cash<5000)return msg('businessMessage','Business needs $5,000 cash to hire.');s.business.cash-=5000;s.business.employees++;s.business.reputation=clamp(s.business.reputation+2);commit()};$('upgradeBusinessBtn').onclick=()=>{if(!s.business)return;if(s.cash<10000)return msg('businessMessage','Need $10,000 personal cash.');s.cash-=10000;s.business.cash+=10000;s.business.level++;stat('business',4);commit()};$('businessBankruptcyBtn').onclick=()=>{if(!s.business)return;if(!riskyConfirm('Close the business through bankruptcy? Its cash and value will be lost.'))return;log(`Age ${s.age}: ${s.business.name} entered bankruptcy.`);s.business=null;stat('happiness',-8);stat('stress',10);commit()};$('sellBusinessBtn').onclick=()=>{if(!s.business)return;const v=businessValue();if(!riskyConfirm(`Sell the business for about ${money(v)}?`))return;s.cash+=v;recordLife('businessSale',`Sold ${s.business.name}`,{value:v});log(`Age ${s.age}: Sold ${s.business.name} for ${money(v)}.`);s.business=null;commit()};
  $('dateBtn').onclick=()=>{const r=R.date,miss=missingRequirements(r.requirements||[]);if(miss.length)return msg('relationshipMessage',`Locked: ${miss.join(' • ')}.`);if(!actionCost('dating',r.ap))return;const chance=(s.looks+s.social+s.happiness)/330+s.hidden.luck/1000;if(Math.random()<chance){const minPartnerAge=s.age>=18?18:r.minAge,pref=s.datingPreference||'Anyone',gender=pref==='Women'?'Female':pref==='Men'?'Male':(Math.random()<.5?'Female':'Male'),pool=gender==='Female'?(D.names.female||D.names.adults):(D.names.male||D.names.adults);s.partner=npc(rn(pool),'Partner',Math.max(minPartnerAge,s.age+Math.floor(rand(-3,4))),r.startQuality,gender);s.relationship='Dating';stat('happiness',r.happiness);log(`Age ${s.age}: Started dating ${s.partner.name}.`);msg('relationshipMessage',`You started dating ${s.partner.name}.`)}else msg('relationshipMessage','No luck this time.');commit()};
  $('partnerTimeBtn').onclick=()=>{if(!s.partner)return;const r=R.partnerTime;if(!actionCost('partnerTime',r.ap))return;s.partner.quality=clamp(s.partner.quality+scaled(r.quality,'partnerTime'));stat('happiness',scaled(r.happiness,'partnerTime'));stat('stress',r.stress);log(`I went on a date with ${s.partner.name}.`);commit()};
  $('giftBtn').onclick=()=>{if(!s.partner)return;const r=R.gift;if(s.cash<r.cost)return msg('relationshipMessage',`Need ${money(r.cost)}.`);if(!actionCost('partnerTime',r.ap))return;s.cash-=r.cost;s.partner.quality=clamp(s.partner.quality+r.quality);log(`I bought ${s.partner.name} a gift.`);commit()};
  $('argueBtn').onclick=()=>{if(!s.partner)return;const r=R.argue;if(!actionCost('partnerTime',r.ap))return;const good=Math.random()<r.baseSuccess+s.skills.communication/180;if(good){s.partner.quality=clamp(s.partner.quality+r.qualitySuccess);stat('stress',r.stressSuccess);log(`I talked through a problem with ${s.partner.name}.`);msg('relationshipMessage','You talked through the problem.')}else{s.partner.quality=clamp(s.partner.quality+r.qualityFail);stat('stress',r.stressFail);log(`I got into an argument with ${s.partner.name}.`);msg('relationshipMessage','The conversation turned into an argument.')}commit()};
  $('proposeBtn').onclick=()=>{if(!s.partner)return msg('relationshipMessage','You need a partner first.');const r=R.propose,miss=missingRequirements(r.requirements||[]);if(miss.length)return msg('relationshipMessage',`Locked: ${miss.join(' • ')}.`);const accepted=Math.random()<r.baseSuccess+s.partner.quality/220+s.social/500;if(accepted){s.relationship='Engaged';s.partner.relation='Fiancé';log(`Age ${s.age}: ${s.partner.name} accepted your proposal.`);msg('relationshipMessage','You are engaged!')}else{s.partner.quality=clamp(s.partner.quality+r.declineQuality);msg('relationshipMessage','The proposal was declined.')}commit()};
  $('marryBtn').onclick=()=>{if(!s.partner)return msg('relationshipMessage','You need a partner first.');const r=R.marry,miss=missingRequirements(r.requirements||[]);if(miss.length)return msg('relationshipMessage',`Locked: ${miss.join(' • ')}.`);s.relationship='Married';s.partner.relation='Spouse';stat('happiness',r.happiness);recordLife('relationship',`Married ${s.partner.name}`,{personId:s.partner.id});log(`Age ${s.age}: Married ${s.partner.name}.`);commit()};
  $('breakupBtn').onclick=()=>{if(!s.partner)return;const name=s.partner.name;log(`Age ${s.age}: ${s.relationship==='Married'?`Divorced ${name}`:`Ended the relationship with ${name}`}.`);if(s.relationship==='Married'&&s.family.children.some(c=>c.alive&&c.age<18)){s.custody='Shared';log(`Age ${s.age}: Shared custody was arranged for the children.`)}s.partner.relation=s.relationship==='Married'?'Ex-Spouse':'Ex-Partner';s.exPartners.push(s.partner);recordLife('relationship',`${s.relationship==='Married'?'Divorced':'Separated from'} ${name}`,{personId:s.partner.id});s.relationship='Single';s.partner=null;stat('happiness',R.breakup.happiness);commit()};
  $('childBtn').onclick=()=>{const r=R.child,miss=missingRequirements(r.requirements||[]);if(miss.length)return msg('relationshipMessage',`Locked: ${miss.join(' • ')}.`);if(!actionCost('childAttempt',r.ap))return;const chance=r.baseChance+s.hidden.fertility/180;if(Math.random()<chance){const c=npc(rn(D.names.children),'Child',0,82);c.skill=Math.round(rand(35,65));s.family.children.push(c);s.cash=Math.max(0,s.cash-r.birthCost);stat('happiness',r.happiness);stat('stress',r.stress);recordLife('birth',`${c.name} was born`,{personId:c.id});log(`Age ${s.age}: Child ${c.name} was born.`);msg('relationshipMessage',`You welcomed ${c.name}.`)}else msg('relationshipMessage','No child this year.');commit()};
  $('familyTimeBtn').onclick=()=>{const r=R.familyTime,living=[...s.family.parents,...s.family.siblings,...s.family.children,...(s.family.grandchildren||[])].filter(p=>p.alive);if(!living.length)return msg('familyMessage','No living family members are available to spend time with.');if(!actionCost('familyTime',r.ap))return;const gain=scaled(r.quality,'familyTime');living.forEach(p=>p.quality=clamp(p.quality+gain));stat('happiness',scaled(r.happiness,'familyTime'));stat('stress',r.stress);log('I spent quality time with my family.');msg('familyMessage',`Spent time with ${living.length} living family member${living.length===1?'':'s'}.`);commit()};
  $('childSupportBtn').onclick=()=>{const r=R.childSupport,kids=s.family.children.filter(x=>x.alive&&x.age<18);if(!kids.length)return msg('childSupportMessage',`Locked: You don't have children to support.`);if(s.cash<r.cost)return msg('childSupportMessage',`Locked: Need ${money(r.cost)} cash.`);if((s.actionPoints??0)<r.ap)return msg('childSupportMessage',`Locked: Need ${r.ap} AP.`);if(!actionCost('familyTime',r.ap))return;s.cash-=r.cost;kids.forEach(k=>{k.quality=clamp(k.quality+r.quality);k.skill=clamp((k.skill||50)+r.skill)});s.stats.childrenRaised+=kids.length;log('I spent extra time and money supporting my children.');msg('childSupportMessage','You supported your children.');commit()};
  $('makeFriendBtn').onclick=()=>{if(!actionCost('socialize',R.makeFriend.ap))return;makeFriend()};

  $('crimeBtn').onclick=()=>{const key=$('crimeSelect').value,c=D.crimes[key];if(s.age<(c.minAge||18))return msg('crimeMessage',`You must be age ${c.minAge||18}+ for this action.`);if(s.jailYears>0)return msg('crimeMessage','You are currently incarcerated.');if(!riskyConfirm(`Attempt ${c.name}? You may be fined or jailed.`))return;if(!actionCost('crime',2))return;s.stats.crimes++;stat('karma',c.karma);const lawyer=D.legalDefense?.[$('lawyerSelect').value]||{cost:0,defense:0,jailReduction:0};let legalCost=lawyer.cost||0,defense=lawyer.defense||0,jailReduction=lawyer.jailReduction||0;if(legalCost){const lp=Math.min(s.cash,legalCost);s.cash-=lp;s.debt+=legalCost-lp}const caught=Math.random()<(c.caught*diff().crime+(50-s.karma)/450-(s.hidden.luck-50)/900-defense);if(caught){s.criminalRecord=true;const reducedFine=Math.round(c.fine*(1-defense*1.7));const shortage=Math.max(0,reducedFine-s.cash);s.cash=Math.max(0,s.cash-reducedFine);s.debt+=shortage;if(c.jail)s.jailYears=Math.max(0,c.jail-jailReduction);if(s.credit!==null)s.credit=Math.max(300,s.credit-20);stat('stress',12);log(`Age ${s.age}: Caught committing ${c.name}${c.jail?` and sentenced to ${c.jail} year(s)`:''}.`);msg('crimeMessage',`Caught. Court outcome: fine ${money(reducedFine)}${s.jailYears?` • Jail: ${s.jailYears} yrs`:' • No jail'}.`)}else{const gain=rand(c.gain[0],c.gain[1]);s.cash+=gain;log(`Age ${s.age}: Got away with ${c.name} and gained ${money(gain)}.`);msg('crimeMessage',`Got away with ${money(gain)}.`)}commit()};
  $('moveBtn').onclick=()=>{if(s.age<18)return msg('moveMessage','You must be 18+ to move on your own.');const city=$('moveSelect').value;if(city===s.location)return msg('moveMessage','You already live there.');if(s.cash<3000)return msg('moveMessage','Need $3,000 to move.');s.cash-=3000;s.location=city;s.stats.moves++;log(`Age ${s.age}: Moved to ${city}.`);commit()};
  $('saveSettingsBtn').onclick=()=>{s.settings.eventFrequency=$('eventFreqSelect').value;s.settings.confirmRisk=$('confirmRiskSelect').value==='yes';commit();toast('Settings saved')};$('saveSlotBtn').onclick=()=>saveSlot($('slotSelect').value);$('loadSlotBtn').onclick=()=>loadSlot($('slotSelect').value);$('deleteSlotBtn').onclick=()=>{const n=$('slotSelect').value;if(!riskyConfirm(`Delete Slot ${n}?`))return;localStorage.removeItem(slotKey(n));msg('slotMessage',`Deleted Slot ${n}.`)};
  $('manualSaveBtn').onclick=()=>saveAutosave(true);$('exportBtn').onclick=()=>{$('saveBox').value=JSON.stringify(s);msg('saveMessage','Save exported.');};$('importBtn').onclick=()=>{try{s=normalize(JSON.parse($('saveBox').value));msg('saveMessage','Save imported.');commit()}catch{msg('saveMessage','Invalid save data.')}};$('resetBtn').onclick=()=>{if(!riskyConfirm('Erase this life?'))return;s=freshState();eventQueue=[];commit()};$('restartAfterDeathBtn').onclick=()=>{s=freshState();eventQueue=[];$('deathOverlay').classList.add('hidden');commit()};
}

function init(){bind();$('educationProgramSelect').value='College';if(!loadAutosave())s=freshState();$('nameInput').value=s.name;$('genderInput').value=s.gender;$('birthplaceInput').value=s.birthplace;$('backgroundInput').value=s.background;$('difficultyInput').value=s.difficulty;$('moveSelect').value=s.location;$('universitySelect').value=s.university||'State University';render();saveAutosave()}
init();
})();
