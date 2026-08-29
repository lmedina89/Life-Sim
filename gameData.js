window.GAME_DATA = {
  version: '0.6.2',
  saveKey: 'lifeSimV06',
  legacyKeys: ['lifeSimV05Save','lifeSimV04Save'],
  genders: ['Male','Female','Nonbinary'],
  backgrounds: {
    Balanced: { label:'Balanced', description:'A stable, average start.', mods:{} },
    Academic: { label:'Academic', description:'Strong learning habits, a little less social.', mods:{intelligence:8,social:-2,happiness:-2} },
    Athletic: { label:'Athletic', description:'Healthy and physically gifted.', mods:{fitness:8,health:5,intelligence:-2} },
    Social: { label:'Social', description:'Outgoing and charismatic.', mods:{social:8,happiness:4,intelligence:-2} },
    Wealthy: { label:'Wealthy', description:'More family resources and an easier financial start.', mods:{cash:5000,happiness:3,karma:-2} },
    Struggling: { label:'Struggling', description:'Fewer resources, more grit.', mods:{stress:8,karma:4,intelligence:2} }
  },
  difficulties: {
    Easy: { expense:0.85, layoff:0.75, health:0.8, crime:0.8, eventReward:1.15 },
    Normal: { expense:1, layoff:1, health:1, crime:1, eventReward:1 },
    Hard: { expense:1.2, layoff:1.3, health:1.25, crime:1.2, eventReward:0.9 }
  },
  locations: {
    'Columbia, SC': { wage:0.94, cost:0.82, tax:0.18, housing:0.78 },
    'Charlotte, NC': { wage:1.02, cost:0.97, tax:0.19, housing:0.95 },
    'Atlanta, GA': { wage:1.05, cost:1.00, tax:0.19, housing:1.00 },
    'New York, NY': { wage:1.22, cost:1.55, tax:0.25, housing:1.75 },
    'Los Angeles, CA': { wage:1.18, cost:1.48, tax:0.24, housing:1.68 },
    'Chicago, IL': { wage:1.08, cost:1.08, tax:0.22, housing:1.04 },
    'Miami, FL': { wage:1.04, cost:1.18, tax:0.18, housing:1.22 },
    'Houston, TX': { wage:1.06, cost:0.96, tax:0.18, housing:0.92 }
  },
  names: {
    adults:['Alex','Jordan','Taylor','Morgan','Casey','Riley','Cameron','Avery','Parker','Drew','Jamie','Skyler','Logan','Reese','Quinn','Hayden'],
    children:['Noah','Liam','Mia','Emma','Lucas','Ava','Ethan','Sofia','Mason','Zoe','Leo','Maya','Elijah','Isla','Mateo','Nora']
  },
  traits: ['Ambitious','Easygoing','Loyal','Jealous','Intelligent','Reckless','Generous','Frugal','Funny','Private','Driven','Creative'],
  companies: ['Apex Systems','Blue Ridge Manufacturing','Nova Health','Pioneer Logistics','Vertex Automation','Horizon Retail','Crescent Energy','Atlas Technologies'],
  majors: {
    'Computer Science': { skill:'technology', bonus:10 },
    'Business': { skill:'business', bonus:10 },
    'Engineering': { skill:'mechanical', bonus:10 },
    'Communications': { skill:'communication', bonus:10 },
    'Fine Arts': { skill:'creativity', bonus:10 },
    'Biology': { skill:'intelligence', bonus:8 }
  },
  certifications: {
    'CompTIA Network+': { cost:380, age:18, skill:'technology', min:45, boost:8 },
    'CompTIA Security+': { cost:420, age:18, skill:'technology', min:55, boost:8 },
    'ITIL Foundation': { cost:500, age:18, skill:'communication', min:35, boost:7 },
    'Electrical License': { cost:650, age:20, skill:'mechanical', min:60, boost:9 },
    'Project Management': { cost:650, age:21, skill:'business', min:55, boost:8 }
  },
  jobs: {
    fastfood:{name:'Fast Food Worker',track:'Service',salary:22000,minAge:16,edu:'None',intel:0,social:0,skill:null,skillMin:0,next:'retail'},
    retail:{name:'Retail Associate',track:'Service',salary:28000,minAge:16,edu:'None',intel:0,social:35,skill:'communication',skillMin:20,next:'supervisor'},
    supervisor:{name:'Retail Supervisor',track:'Service',salary:42000,minAge:19,edu:'High School',intel:35,social:50,skill:'communication',skillMin:40,next:'manager'},
    manager:{name:'Operations Manager',track:'Operations',salary:105000,minAge:24,edu:'College',intel:60,social:70,skill:'business',skillMin:55,next:'director'},
    director:{name:'Operations Director',track:'Operations',salary:145000,minAge:30,edu:'College',intel:68,social:75,skill:'business',skillMin:70,next:null},
    warehouse:{name:'Warehouse Technician',track:'Industrial',salary:39000,minAge:18,edu:'High School',intel:35,social:0,skill:'mechanical',skillMin:25,next:'industrialtech'},
    industrialtech:{name:'Industrial Technician',track:'Industrial',salary:56000,minAge:20,edu:'High School',intel:45,social:10,skill:'mechanical',skillMin:50,next:'electrician'},
    electrician:{name:'Electrician',track:'Industrial',salary:65000,minAge:18,edu:'Trade School',intel:45,social:0,skill:'mechanical',skillMin:55,next:'controls'},
    controls:{name:'Controls Specialist',track:'Automation',salary:90000,minAge:21,edu:'Trade School',intel:65,social:25,skill:'mechanical',skillMin:70,next:'automation'},
    automation:{name:'Automation Engineer',track:'Automation',salary:105000,minAge:22,edu:'College',intel:72,social:25,skill:'technology',skillMin:70,next:'engineeringmanager'},
    engineeringmanager:{name:'Engineering Manager',track:'Automation',salary:135000,minAge:28,edu:'College',intel:70,social:70,skill:'communication',skillMin:65,next:null},
    it:{name:'IT Support Specialist',track:'IT',salary:56000,minAge:18,edu:'High School',intel:55,social:35,skill:'technology',skillMin:45,next:'sysadmin'},
    sysadmin:{name:'Systems Administrator',track:'IT',salary:82000,minAge:20,edu:'College',intel:65,social:30,skill:'technology',skillMin:65,next:'networkeng'},
    networkeng:{name:'Network Engineer',track:'IT',salary:98000,minAge:22,edu:'College',intel:70,social:35,skill:'technology',skillMin:75,next:'itmanager'},
    itmanager:{name:'IT Manager',track:'IT',salary:125000,minAge:26,edu:'College',intel:65,social:70,skill:'communication',skillMin:65,next:null},
    doctor:{name:'Physician',track:'Medicine',salary:215000,minAge:26,edu:'Graduate',intel:85,social:45,skill:'communication',skillMin:45,next:null}
  },
  universities: {
    'Community College': { tuition:0.65, admission:1.8, learning:0.9 },
    'State University': { tuition:1.0, admission:2.4, learning:1.0 },
    'Elite University': { tuition:1.8, admission:3.5, learning:1.25 }
  },
  education: {
    'Trade School': { cost:5000, years:2, minAge:18, requires:'High School' },
    'College': { cost:12000, years:4, minAge:18, requires:'High School' },
    'Graduate School': { cost:25000, years:4, minAge:22, requires:'College' }
  },
  housing: {
    parents:{name:'Living with Parents',price:0,annual:2500,minAge:0,owned:false},
    apartment:{name:'Apartment',price:0,annual:14000,minAge:18,owned:false},
    condo:{name:'Condo',price:120000,annual:5000,minAge:18,owned:true},
    house:{name:'House',price:280000,annual:9000,minAge:18,owned:true},
    luxury:{name:'Luxury House',price:900000,annual:26000,minAge:21,owned:true}
  },
  inventoryCatalog: {
    phone:{name:'Smartphone',price:900,type:'Tech',conditionLoss:8},
    laptop:{name:'Laptop',price:1800,type:'Tech',conditionLoss:6},
    usedcar:{name:'Used Car',price:8000,type:'Vehicle',conditionLoss:12},
    newcar:{name:'New Car',price:35000,type:'Vehicle',conditionLoss:8},
    luxurycar:{name:'Luxury Car',price:95000,type:'Vehicle',conditionLoss:7},
    watch:{name:'Luxury Watch',price:8000,type:'Collectible',conditionLoss:2}
  },
  industries: {
    'Online Services':{start:10000,baseRevenue:18000,margin:0.46},
    'Retail':{start:18000,baseRevenue:30000,margin:0.34},
    'Contracting':{start:25000,baseRevenue:45000,margin:0.42},
    'Technology':{start:35000,baseRevenue:65000,margin:0.52}
  },
  crimes: {
    shoplifting:{name:'Shoplifting',minAge:12,gain:[100,900],caught:0.26,fine:1200,jail:0,karma:-10},
    burglary:{name:'Burglary',minAge:15,gain:[1200,8000],caught:0.38,fine:5000,jail:2,karma:-18},
    fraud:{name:'Fraud',minAge:18,gain:[3000,18000],caught:0.42,fine:9000,jail:3,karma:-22},
    robbery:{name:'Robbery',minAge:16,gain:[2500,14000],caught:0.52,fine:10000,jail:5,karma:-28}
  },
  illnesses: {
    flu:{name:'Severe Flu',minAge:2,chance:0.018,cost:450,health:-7,duration:1},
    back:{name:'Back Injury',minAge:25,chance:0.012,cost:1800,health:-10,duration:2},
    hypertension:{name:'Hypertension',minAge:40,chance:0.018,cost:2200,health:-7,duration:5},
    cardiac:{name:'Heart Condition',minAge:55,chance:0.012,cost:9000,health:-18,duration:8}
  },
  achievements: [
    {id:'adult',name:'Welcome to Adulthood',description:'Reach age 18.'},
    {id:'graduate',name:'Degree Earned',description:'Earn a college or graduate degree.'},
    {id:'certified',name:'Certified',description:'Earn your first certification.'},
    {id:'sixfig',name:'Six-Figure Career',description:'Reach a salary of $100,000.'},
    {id:'millionaire',name:'Millionaire',description:'Reach $1,000,000 net worth.'},
    {id:'family',name:'Growing Family',description:'Have two children.'},
    {id:'business',name:'Entrepreneur',description:'Start a business.'},
    {id:'mogul',name:'Business Mogul',description:'Grow a business to $1M valuation.'},
    {id:'century',name:'Centenarian',description:'Reach age 100.'},
    {id:'legacy',name:'Legacy Continues',description:'Continue as the next generation.'},
    {id:'debtfree',name:'Debt Free',description:'Own a home and carry no debt.'}
  ],
  events: [
    {id:'friend',minAge:5,maxAge:17,weight:6,title:'A New Friend',text:'A classmate asks if you want to hang out after school.',choices:[
      {label:'Hang out',effect:{social:5,happiness:4},spawnFriend:true,result:'You made a new friend.'},
      {label:'Study instead',effect:{intelligence:4,stress:2},result:'You focused on school.'}
    ]},
    {id:'bully',minAge:7,maxAge:16,weight:4,title:'School Trouble',text:'Another student keeps bothering you.',choices:[
      {label:'Tell an adult',effect:{karma:3,stress:-3},result:'The situation improved.'},
      {label:'Stand up for yourself',effect:{fitness:2,stress:2},result:'You stood your ground.'},
      {label:'Ignore it',effect:{happiness:-4,stress:5},delayed:{years:2,text:'The old bullying experience still bothers you.',effect:{stress:3,happiness:-2}},result:'You tried to ignore it.'}
    ]},
    {id:'scholarship',minAge:16,maxAge:18,weight:3,condition:'goodStudent',title:'Scholarship Opportunity',text:'A local foundation offers you a scholarship interview.',choices:[
      {label:'Apply',chance:'scholarship',success:{scholarship:8000,happiness:5},failure:{stress:2},result:'You submitted the application.'},
      {label:'Skip it',effect:{stress:-1},result:'You passed on the opportunity.'}
    ]},
    {id:'jobOffer',minAge:19,maxAge:65,weight:3,condition:'employed',title:'Recruiter Call',text:'A recruiter says another employer may pay more.',choices:[
      {label:'Interview',chance:'jobOffer',success:{salaryPct:0.10,happiness:4},failure:{stress:2},result:'You tested the market.'},
      {label:'Stay loyal',effect:{performance:4},result:'You stayed where you are.'}
    ]},
    {id:'recession',minAge:18,maxAge:75,weight:2,condition:'recession',title:'Economic Slowdown',text:'The economy is weak and your employer is cutting costs.',choices:[
      {label:'Work extra hard',effect:{performance:8,stress:6},result:'You tried to make yourself indispensable.'},
      {label:'Build savings',effect:{business:2,stress:2},result:'You focused on protecting your finances.'}
    ]},
    {id:'familyAsk',minAge:20,maxAge:70,weight:3,condition:'hasFamily',title:'Family Needs Help',text:'A family member asks you for financial help.',choices:[
      {label:'Give $1,000',cost:1000,effect:{karma:7,happiness:2},familyQuality:6,result:'You helped them out.'},
      {label:'Say no',effect:{stress:-1},familyQuality:-5,result:'You declined.'}
    ]},
    {id:'healthWakeup',minAge:30,maxAge:95,weight:4,title:'Health Wake-Up Call',text:'A routine checkup suggests you should take better care of yourself.',choices:[
      {label:'Commit to healthier habits',effect:{health:6,fitness:4,stress:2},result:'You made healthier choices.'},
      {label:'Ignore it',effect:{health:-5,happiness:1},result:'You changed nothing.'}
    ]},
    {id:'wallet',minAge:8,maxAge:90,weight:2,title:'Found Wallet',text:'You find a wallet with cash inside.',choices:[
      {label:'Return it',effect:{karma:8,happiness:2,cash:40},result:'The owner rewarded your honesty.'},
      {label:'Keep it',effect:{karma:-10,cash:120,stress:2},result:'You kept the cash.'}
    ]},
    {id:'childTalent',minAge:25,maxAge:75,weight:3,condition:'hasChild',title:'A Child Shows Promise',text:'One of your children is showing a real talent.',choices:[
      {label:'Invest in lessons',cost:1500,effect:{happiness:4},childBoost:8,result:'You supported their development.'},
      {label:'Encourage them yourself',effect:{communication:3},childBoost:4,result:'You became their biggest supporter.'}
    ]},
    {id:'temptation',minAge:18,maxAge:80,weight:2,condition:'hasPartner',title:'Unexpected Attraction',text:'Someone new is showing strong interest in you even though you are in a relationship.',choices:[
      {label:'Stay loyal',effect:{karma:5,stress:1},partnerQuality:4,result:'You protected your relationship.'},
      {label:'Cheat',effect:{karma:-15,happiness:3,stress:7},partnerQuality:-22,delayed:{years:1,text:'The secret from your affair resurfaces.',effect:{stress:8,happiness:-6}},result:'You crossed a line that may come back later.'}
    ]},
    {id:'businessBreak',minAge:18,maxAge:80,weight:3,condition:'hasBusiness',title:'Business Opportunity',text:'A larger client offers your business a risky contract.',choices:[
      {label:'Take the deal',chance:'businessDeal',success:{businessCash:15000,businessRep:8},failure:{businessCash:-8000,businessRep:-6,stress:7},result:'You took the risk.'},
      {label:'Decline',effect:{stress:-2},result:'You protected the company from the risk.'}
    ]}
  ]
};
