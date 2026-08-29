(() => {
  'use strict';
  const D=window.GAME_DATA;
  const SAVE_KEY='lifeSimV04Save';
  const $=id=>document.getElementById(id);
  const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.round(n));
  const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
  let s=null;
  let eventQueue=[];

  function person(name,relation,age,quality=65){return {id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),name,relation,age,quality,alive:true};}
  function randomName(pool){return pool[Math.floor(Math.random()*pool.length)];}
  function makeFamily(){
    const parent1=person(randomName(D.names.adults),'Parent',24+Math.floor(Math.random()*16),65+Math.floor(Math.random()*21));
    const parent2=person(randomName(D.names.adults),'Parent',24+Math.floor(Math.random()*18),60+Math.floor(Math.random()*26));
    const siblings=[];
    const count=Math.random()<.55?Math.floor(Math.random()*3):0;
    for(let i=0;i<count;i++) siblings.push(person(randomName(D.names.children),'Sibling',Math.floor(Math.random()*7),55+Math.floor(Math.random()*31)));
    return {parents:[parent1,parent2],siblings,children:[],quality:70};
  }
  function freshState(){return {version:'0.4.0',age:0,cash:0,health:100,happiness:70,intelligence:50,looks:50,fitness:50,social:50,stress:10,karma:50,education:'None',program:null,programYears:0,programNeed:0,job:null,salary:0,performance:0,jobYears:0,debt:0,credit:null,investments:0,assets:[],relationship:'Single',relationshipQuality:null,businessLevel:0,businessIncome:0,criminalRecord:false,family:makeFamily(),history:['Age 0: You were born.'],pendingEvent:null};}
  function normalizeState(raw){
    const base=freshState();
    const merged={...base,...raw};
    merged.family={...base.family,...(raw.family||{})};
    merged.family.parents=Array.isArray(merged.family.parents)?merged.family.parents:base.family.parents;
    merged.family.siblings=Array.isArray(merged.family.siblings)?merged.family.siblings:[];
    merged.family.children=Array.isArray(merged.family.children)?merged.family.children:[];
    merged.assets=Array.isArray(merged.assets)?merged.assets:[];
    merged.history=Array.isArray(merged.history)?merged.history:[];
    merged.pendingEvent=null;
    return merged;
  }
  function saveGame(show=false){
    try{localStorage.setItem(SAVE_KEY,JSON.stringify(s));$('autosaveStatus').textContent='Saved';if(show)$('saveMessage').textContent='Game saved in this browser.';}
    catch(e){$('autosaveStatus').textContent='Save unavailable';if(show)$('saveMessage').textContent='Browser storage is unavailable.';}
  }
  function loadAutosave(){
    try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return false;s=normalizeState(JSON.parse(raw));return true;}catch(e){return false;}
  }
  function log(text){s.history.push(text);if(s.history.length>250)s.history=s.history.slice(-250);}
  function stat(key,delta){if(['cash','debt','investments','salary','businessIncome'].includes(key)){s[key]+=delta;return;}s[key]=clamp((s[key]||0)+delta);}
  function stage(){if(s.age<2)return'Baby';if(s.age<5)return'Toddler';if(s.age<13)return'Child';if(s.age<18)return'Teenager';if(s.age<65)return'Adult';return'Senior';}
  function annualExpenses(){let e=s.age>=18?18000:0;s.assets.forEach(k=>{if(D.assets[k])e+=D.assets[k].annual;});return e;}
  function worth(){return s.cash+s.investments+s.assets.reduce((a,k)=>a+(D.assets[k]?.value||0),0)-s.debt;}
  function meetsEdu(req){return D.eduRank[s.education]>=D.eduRank[req];}
  function hasLivingFamily(){return [...s.family.parents,...s.family.siblings].some(p=>p.alive);}

  function renderJobs(){
    const sel=$('jobSelect');const prev=sel.value;sel.innerHTML='';
    Object.entries(D.jobs).forEach(([k,j])=>{const ok=s.age>=j.minAge&&meetsEdu(j.edu)&&s.intelligence>=j.intel&&s.social>=j.social;const o=document.createElement('option');o.value=k;o.textContent=j.name+' — '+money(j.salary)+(ok?'':' 🔒');sel.appendChild(o);});
    if(prev&&D.jobs[prev])sel.value=prev;
  }
  function renderPeople(list,container){
    container.innerHTML='';
    if(!list.length){container.textContent='None.';container.classList.add('muted');return;}
    container.classList.remove('muted');
    list.forEach(p=>{const row=document.createElement('div');row.className='person';const left=document.createElement('div');left.textContent=p.name+' • '+p.relation+(p.alive?'':' • Deceased');const right=document.createElement('span');right.textContent='Age '+p.age+' • Bond '+Math.round(p.quality);row.append(left,right);container.appendChild(row);});
  }
  function render(){
    $('ageVal').textContent=s.age;$('cashVal').textContent=money(s.cash);$('worthVal').textContent=money(worth());$('stageVal').textContent=stage();
    $('healthVal').textContent=s.health;$('happyVal').textContent=s.happiness;$('intVal').textContent=s.intelligence;$('looksVal').textContent=s.looks;$('fitVal').textContent=s.fitness;$('socialVal').textContent=s.social;$('stressVal').textContent=s.stress;$('karmaVal').textContent=s.karma;
    $('eduVal').textContent=s.program?s.program+' in progress':s.education;$('eduProgress').textContent=s.program?s.programYears+' / '+s.programNeed+' years':'—';
    $('jobVal').textContent=s.job?D.jobs[s.job].name:'None';$('salaryVal').textContent=money(s.salary);$('performanceVal').textContent=s.performance;
    $('debtVal').textContent=money(s.debt);$('investVal').textContent=money(s.investments);$('creditVal').textContent=s.credit===null?'—':Math.round(s.credit);$('expensesVal').textContent=money(annualExpenses());
    $('assetsVal').textContent=s.assets.length?s.assets.map(k=>D.assets[k]?.name||k).join(', '):'No major assets.';
    $('relationshipVal').textContent=s.relationship;$('relationshipQuality').textContent=s.relationshipQuality===null?'—':s.relationshipQuality;
    $('businessVal').textContent=s.businessLevel?'Level '+s.businessLevel+' company':'None';$('businessIncomeVal').textContent=money(s.businessIncome);
    const family=[...s.family.parents,...s.family.siblings];renderPeople(family,$('familyList'));renderPeople(s.family.children,$('childrenList'));
    $('log').innerHTML='';[...s.history].reverse().slice(0,120).forEach(t=>{const d=document.createElement('div');d.textContent=t;$('log').appendChild(d);});
    $('studyBtn').disabled=s.age<5;$('exerciseBtn').disabled=s.age<4;$('socializeBtn').disabled=s.age<4;$('relaxBtn').disabled=s.age<8;$('familyTimeBtn').disabled=!hasLivingFamily();
    $('collegeBtn').disabled=s.age<18||s.program!==null||D.eduRank[s.education]>=3;$('tradeBtn').disabled=s.age<18||s.program!==null||D.eduRank[s.education]>=2;$('gradBtn').disabled=s.age<22||s.program!==null||s.education!=='College';
    $('workBtn').disabled=!s.job;$('promotionBtn').disabled=!s.job;$('loanBtn').disabled=s.age<18;$('investBtn').disabled=s.age<18;$('payDebtBtn').disabled=s.debt<=0;
    $('dateBtn').disabled=s.age<16||s.relationship!=='Single';$('partnerTimeBtn').disabled=s.relationship==='Single';$('marryBtn').disabled=s.relationship!=='Dating';$('childBtn').disabled=s.relationship==='Single'||s.age<18||s.age>55;
    $('startBusinessBtn').disabled=s.age<18||s.businessLevel>0;$('upgradeBusinessBtn').disabled=s.businessLevel===0;$('crimeBtn').disabled=s.age<12;
    renderJobs();
  }
  function commit(showSave=false){render();saveGame(showSave);}
  function applyEffects(effect){
    Object.entries(effect||{}).forEach(([key,val])=>{
      if(key==='familyQuality'){s.family.quality=clamp(s.family.quality+val);[...s.family.parents,...s.family.siblings].forEach(p=>p.quality=clamp(p.quality+val));return;}
      if(key==='relationshipQuality'&&s.relationshipQuality!==null){s.relationshipQuality=clamp(s.relationshipQuality+val);return;}
      if(key in s)stat(key,val);
    });
  }
  function eligibleEvents(){return D.events.filter(e=>s.age>=e.minAge&&s.age<=e.maxAge&&(!e.requiresJob||!!s.job)&&(!e.requiresFamily||hasLivingFamily()));}
  function weightedPick(items){const total=items.reduce((a,e)=>a+(e.weight||1),0);let r=Math.random()*total;for(const e of items){r-=e.weight||1;if(r<=0)return e;}return items[items.length-1];}
  function queueRandomEvent(){if(Math.random()>.62)return;const pool=eligibleEvents();if(pool.length)eventQueue.push(weightedPick(pool));}
  function showNextEvent(){
    if(!eventQueue.length)return;
    const ev=eventQueue.shift();s.pendingEvent=ev.id;$('eventTitle').textContent=ev.title;$('eventText').textContent=ev.text;const wrap=$('eventChoices');wrap.innerHTML='';
    ev.choices.forEach(choice=>{const b=document.createElement('button');const label=document.createElement('strong');label.textContent=choice.label;b.appendChild(label);if(choice.effect){const small=document.createElement('small');small.textContent=Object.entries(choice.effect).map(([k,v])=>(v>0?'+':'')+v+' '+k).join(' • ');b.appendChild(small);}b.addEventListener('click',()=>{applyEffects(choice.effect);log('Age '+s.age+': '+choice.result);s.pendingEvent=null;$('eventOverlay').classList.add('hidden');commit();setTimeout(showNextEvent,80);});wrap.appendChild(b);});
    $('eventOverlay').classList.remove('hidden');
  }
  function ageFamily(){
    [...s.family.parents,...s.family.siblings,...s.family.children].forEach(p=>{if(!p.alive)return;p.age++;if(p.quality>0&&Math.random()<.18)p.quality=clamp(p.quality-1);if(p.age>70){const deathChance=Math.min(.18,(p.age-70)*.008);if(Math.random()<deathChance){p.alive=false;log('Age '+s.age+': '+p.name+' ('+p.relation+') passed away.');stat('happiness',-10);stat('stress',8);}}});
  }
  function ageYear(){
    if(!$('eventOverlay').classList.contains('hidden'))return;
    s.age++;ageFamily();
    if(s.age===5)log('Age 5: You started school.');
    if(s.age===18&&D.eduRank[s.education]<1){s.education='High School';log('Age 18: You graduated high school.');}
    if(s.age>=18&&s.credit===null)s.credit=650;
    if(s.program){s.programYears++;stat('stress',4);stat('intelligence',3);if(s.programYears>=s.programNeed){s.education=s.program==='Graduate School'?'Graduate':s.program;log('Age '+s.age+': You completed '+s.program+'.');s.program=null;s.programYears=0;s.programNeed=0;}}
    if(s.job){s.jobYears++;const taxes=s.salary*.18;s.cash+=s.salary-taxes-annualExpenses();stat('performance',-2);stat('stress',3);if(s.performance<20&&Math.random()<.2){log('Age '+s.age+': You were fired for poor performance.');s.job=null;s.salary=0;s.performance=0;}}else if(s.age>=18){s.cash-=annualExpenses();stat('happiness',-3);stat('stress',4);}
    if(s.businessLevel){const profit=s.businessIncome*(.8+Math.random()*.5);s.cash+=profit;log('Age '+s.age+': Your business produced '+money(profit)+' profit.');}
    if(s.debt>0){s.debt*=1.07;if(s.credit!==null)s.credit=Math.max(300,s.credit-5);}
    if(s.investments>0)s.investments*=1+((Math.random()*.22)-.06);
    if(s.stress>70){stat('health',-5);stat('happiness',-4);}if(s.fitness<30)stat('health',-2);if(s.age>50)stat('health',-(1+Math.random()*3));if(s.age>70)stat('fitness',-2);
    if(s.relationship!=='Single'&&s.relationshipQuality!==null){s.relationshipQuality=clamp(s.relationshipQuality-2);if(s.relationshipQuality<15&&Math.random()<.25){log('Age '+s.age+': Your relationship ended.');s.relationship='Single';s.relationshipQuality=null;stat('happiness',-15);}}
    queueRandomEvent();commit();showNextEvent();
  }
  function startProgram(name,cost,years){if(s.cash>=cost)s.cash-=cost;else s.debt+=cost;s.program=name;s.programYears=0;s.programNeed=years;log('Age '+s.age+': Started '+name+'.');commit();}

  document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===b.dataset.tab));}));
  $('ageBtn').addEventListener('click',ageYear);
  $('studyBtn').addEventListener('click',()=>{stat('intelligence',4);stat('stress',3);stat('happiness',-1);$('choiceMessage').textContent='Intelligence +4, Stress +3.';commit();});
  $('exerciseBtn').addEventListener('click',()=>{stat('fitness',4);stat('health',2);stat('stress',-2);$('choiceMessage').textContent='Fitness +4, Health +2, Stress -2.';commit();});
  $('socializeBtn').addEventListener('click',()=>{stat('social',4);stat('happiness',3);stat('stress',-1);$('choiceMessage').textContent='Social +4, Happiness +3.';commit();});
  $('relaxBtn').addEventListener('click',()=>{stat('stress',-7);stat('happiness',3);$('choiceMessage').textContent='Stress -7, Happiness +3.';commit();});
  $('familyTimeBtn').addEventListener('click',()=>{[...s.family.parents,...s.family.siblings].filter(p=>p.alive).forEach(p=>p.quality=clamp(p.quality+5));s.family.quality=clamp(s.family.quality+5);stat('happiness',4);stat('stress',-2);$('choiceMessage').textContent='Family bonds improved.';commit();});
  $('collegeBtn').addEventListener('click',()=>startProgram('College',12000,4));$('tradeBtn').addEventListener('click',()=>startProgram('Trade School',5000,2));$('gradBtn').addEventListener('click',()=>startProgram('Graduate School',25000,4));
  $('applyBtn').addEventListener('click',()=>{const k=$('jobSelect').value,j=D.jobs[k];if(s.age<j.minAge)return $('careerMessage').textContent='Too young for this job.';if(!meetsEdu(j.edu))return $('careerMessage').textContent='Requires '+j.edu+'.';if(s.intelligence<j.intel)return $('careerMessage').textContent='Requires Intelligence '+j.intel+'+.';if(s.social<j.social)return $('careerMessage').textContent='Requires Social '+j.social+'+.';const chance=.55+s.social/300+s.intelligence/400-(s.criminalRecord?.18:0);if(Math.random()>chance){$('careerMessage').textContent='Interview unsuccessful. Improve your stats and try again.';return;}s.job=k;s.salary=j.salary;s.performance=50;s.jobYears=0;stat('happiness',4);$('careerMessage').textContent='You got the job!';log('Age '+s.age+': Hired as '+j.name+'.');commit();});
  $('workBtn').addEventListener('click',()=>{stat('performance',8);stat('stress',5);stat('happiness',-1);$('careerMessage').textContent='Performance +8, Stress +5.';commit();});
  $('promotionBtn').addEventListener('click',()=>{if(!s.job)return;const chance=.15+s.performance/130+s.social/500;if(Math.random()<chance){s.salary=Math.round(s.salary*1.1);stat('happiness',5);$('careerMessage').textContent='Promotion approved! New salary: '+money(s.salary);log('Age '+s.age+': You earned a promotion.');}else{$('careerMessage').textContent='Promotion denied. Improve performance or social skills.';stat('stress',2);}commit();});
  $('loanBtn').addEventListener('click',()=>{if(s.credit<560){$('financeMessage').textContent='Loan denied. Credit too low.';return;}s.cash+=5000;s.debt+=5000;s.credit-=12;$('financeMessage').textContent='Borrowed $5,000 at 7% annual interest.';commit();});
  $('investBtn').addEventListener('click',()=>{if(s.cash<1000){$('financeMessage').textContent='Need $1,000 cash.';return;}s.cash-=1000;s.investments+=1000;$('financeMessage').textContent='Invested $1,000.';commit();});
  $('payDebtBtn').addEventListener('click',()=>{const p=Math.min(1000,s.cash,s.debt);if(p<=0)return;s.cash-=p;s.debt-=p;if(s.credit!==null)s.credit=Math.min(850,s.credit+9);$('financeMessage').textContent='Paid '+money(p)+' toward debt.';commit();});
  document.querySelectorAll('[data-asset]').forEach(btn=>btn.addEventListener('click',()=>{const k=btn.dataset.asset,a=D.assets[k];if(s.age<a.minAge)return $('assetMessage').textContent='Too young to buy this.';if(s.assets.includes(k))return $('assetMessage').textContent='You already own it.';if(a.type==='cash'){if(s.cash<a.price)return $('assetMessage').textContent='Not enough cash.';s.cash-=a.price;}else{if(s.credit===null||s.credit<620)return $('assetMessage').textContent='Financing denied. Credit 620+ required.';const down=Math.round(a.price*.1);if(s.cash<down)return $('assetMessage').textContent='Need '+money(down)+' for a 10% down payment.';s.cash-=down;s.debt+=a.price-down;s.credit-=15;}s.assets.push(k);stat('happiness',5);$('assetMessage').textContent='Purchased '+a.name+'.';log('Age '+s.age+': Bought '+a.name+'.');commit();}));
  $('dateBtn').addEventListener('click',()=>{const chance=(s.looks+s.social+s.happiness)/300;if(Math.random()<chance){s.relationship='Dating';s.relationshipQuality=60;stat('happiness',8);$('relationshipMessage').textContent='You started dating someone.';log('Age '+s.age+': You entered a relationship.');}else $('relationshipMessage').textContent='No luck this time. Looks, Social and Happiness affect dating success.';commit();});
  $('partnerTimeBtn').addEventListener('click',()=>{if(s.relationship==='Single')return;s.relationshipQuality=clamp(s.relationshipQuality+8);stat('happiness',4);stat('stress',-2);$('relationshipMessage').textContent='Relationship quality +8.';commit();});
  $('marryBtn').addEventListener('click',()=>{if(s.relationshipQuality<75)return $('relationshipMessage').textContent='Relationship quality must be 75+.';s.relationship='Married';stat('happiness',10);$('relationshipMessage').textContent='You got married!';log('Age '+s.age+': You got married.');commit();});
  $('childBtn').addEventListener('click',()=>{if(s.relationship==='Single')return;const chance=.62;if(Math.random()<chance){const baby=person(randomName(D.names.children),'Child',0,80);s.family.children.push(baby);stat('happiness',10);stat('stress',8);s.cash-=2500;$('relationshipMessage').textContent='You welcomed '+baby.name+' into the family.';log('Age '+s.age+': Your child '+baby.name+' was born.');}else{$('relationshipMessage').textContent='No child this year.';stat('stress',2);}commit();});
  $('startBusinessBtn').addEventListener('click',()=>{if(s.cash<10000)return $('businessMessage').textContent='Need $10,000.';s.cash-=10000;s.businessLevel=1;s.businessIncome=12000;stat('stress',8);$('businessMessage').textContent='Started a small business.';commit();});
  $('upgradeBusinessBtn').addEventListener('click',()=>{if(s.cash<10000)return $('businessMessage').textContent='Need $10,000.';s.cash-=10000;s.businessLevel++;s.businessIncome=Math.round(s.businessIncome*1.55);stat('stress',5);$('businessMessage').textContent='Business upgraded to level '+s.businessLevel+'.';commit();});
  $('crimeBtn').addEventListener('click',()=>{stat('karma',-12);const caught=Math.random()<(.25+(50-s.karma)/250);if(caught){s.criminalRecord=true;s.cash-=1000;stat('happiness',-8);stat('stress',12);if(s.credit!==null)s.credit=Math.max(300,s.credit-20);$('crimeMessage').textContent='Caught. $1,000 fine and a criminal record.';log('Age '+s.age+': You were caught committing a crime.');}else{const g=300+Math.random()*1500;s.cash+=g;$('crimeMessage').textContent='You got away with '+money(g)+'. Karma fell.';}commit();});
  $('manualSaveBtn').addEventListener('click',()=>saveGame(true));
  $('exportBtn').addEventListener('click',()=>{$('saveBox').value=JSON.stringify(s);$('saveMessage').textContent='Save exported. Copy the text somewhere safe.';});
  $('importBtn').addEventListener('click',()=>{try{const raw=JSON.parse($('saveBox').value);if(typeof raw.age!=='number')throw new Error('invalid');s=normalizeState(raw);log('Loaded imported save at age '+s.age+'.');$('saveMessage').textContent='Save imported successfully.';commit();}catch(e){$('saveMessage').textContent='That save data is invalid.';}});
  $('resetBtn').addEventListener('click',()=>{if(!confirm('Restart your life and erase the autosave?'))return;s=freshState();eventQueue=[];try{localStorage.removeItem(SAVE_KEY);}catch(e){}commit();$('saveMessage').textContent='Started a new life.';});

  if(!loadAutosave())s=freshState();render();saveGame();
})();
