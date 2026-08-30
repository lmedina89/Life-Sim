window.GAME_DATA = {
  version: '0.7.4.4',
  architecture: 'data-core-3-polish',
  rules: {
    actionPointsPerYear: 10,
    historyLimit: 900,
    historyYearsVisible: 35,
    adultAge: 18,
    livingWithParentsBase: 1000,
    datingAge: 14,
    diminishingReturns: [1,0.6,0.3,0.1]
  },
  requirementLabels: {
    ageMin:'Age', educationMin:'Education', intelligenceMin:'Intelligence', socialMin:'Social',
    skillMin:'Skill', cashMin:'Cash', creditMin:'Credit', partnerQualityMin:'Relationship quality',
    notJailed:'Not while jailed', hasPartner:'Relationship required', noPartner:'Must be single',
    relationshipIs:'Relationship status', partnerAgeMin:'Partner age', programNone:'Finish current program first'
  },
  balance: {
    yearly: {
      school:{gpaDrift:[-0.12,0.08],intelligenceWeight:700,stressWeight:900,educationStress:4,educationIntelligence:3},
      economy:{recessionChance:0.08,boomThreshold:0.91,inflation:{Boom:[0.025,0.055],Recession:[0.005,0.025],Normal:[0.015,0.04]},market:{Boom:[1.06,1.17],Recession:[0.82,0.98],Normal:[0.96,1.10]},housing:{Boom:[1.03,1.10],Recession:[0.94,1.02],Normal:[0.99,1.06]},interest:{Boom:[0.045,0.07],Recession:[0.025,0.05],Normal:[0.035,0.06]}},
      career:{performanceDecay:2,stressGain:3,bossDrift:[-4,3],layoffChance:{Recession:0.10,Normal:0.035,Boom:0.035},layoffPerformanceThreshold:75,firePerformanceThreshold:20,fireChance:0.22,unemployedHappiness:-3,unemployedStress:4,jailHappiness:-8,jailStress:8},
      finance:{debtCreditPenalty:3,savingsInterestFloor:0.01,savingsInterestMultiplier:0.45,investmentReturnAboveOne:[-0.06,0.18],investmentReturnBelowOne:[-0.14,0.12],inventoryConditionDrift:[-2,2],inventoryDepreciation:[0.04,0.16],vehicleBreakdownCondition:30,vehicleBreakdownChance:0.25,vehicleRepair:[800,2500],vehicleRepairConditionGain:20,negativeCashCreditPenalty:10},
      relationships:{partnerQualityDrift:[-4,1],breakupQualityThreshold:15,breakupChance:0.22,breakupHappiness:-12}
    },
    career: {
      apply:{id:'apply',actionKey:'jobApply',ap:1,baseChance:0.45,socialDivisor:350,intelligenceDivisor:500,jobSkillDivisor:550,certBonusEach:0.025,criminalPenalty:0.16,luckDivisor:1800,startPerformance:50,bossQuality:[45,75],
        offer:{experienceYearsForMax:15,experienceWeight:0.18,skillWeight:0.12,educationStepWeight:0.04,certWeight:0.012,performanceWeight:0.05,majorMatchWeight:0.035,preferredEducationWeight:0.04,currentSalaryLeverageWeight:0.04},
        negotiation:{baseChance:0.34,socialDivisor:300,intelligenceDivisor:700,experienceDivisor:70,educationStepBonus:0.035,certBonusEach:0.012,performanceDivisor:900,raiseRange:[0.03,0.10]}}, 
      work:{id:'work',actionKey:'work',ap:2,effects:{performance:8,stress:5},scaled:['performance'],bossQuality:2,bossQualityScaled:true,narrative:'I worked harder at my job.',toast:'Work effort used 2 AP'},
      network:{id:'network',actionKey:'network',ap:1,effects:{communication:3,social:2,stress:1},scaled:['communication','social'],bossQuality:5,bossQualityScaled:true,narrative:'I networked with people at work.'},
      promotion:{id:'promotion',actionKey:'promotion',ap:1,minPerformance:65,minBossQuality:45,promotionPerformance:55,raiseBaseChance:0.12,performanceDivisor:180,socialDivisor:700,bossDivisor:900,raiseRange:[1.025,1.06],salaryCeilingMultiplier:1.03}
    },
    finance: {
      transferOptions:[{id:'1k',label:'$1,000',amount:1000},{id:'10k',label:'$10,000',amount:10000},{id:'100k',label:'$100,000',amount:100000},{id:'25pct',label:'25%',percent:0.25},{id:'all',label:'All',all:true},{id:'custom',label:'Custom',custom:true}], save:{amount:500,requirements:[]}, withdraw:{amount:500}, loan:{amount:5000,creditMin:560,creditPenalty:12,requirements:[{type:'ageMin',value:18},{type:'creditMin',value:560},{type:'notJailed'}]},
      debtPayment:{amount:1000,creditGain:8,options:[1000,10000],percentOption:0.25}, invest:{amount:1000,requirements:[]}, bankruptcy:{credit:300,happiness:-12,stress:12}
    },
    relationships: {
      date:{ap:1,minAge:14,startQuality:60,happiness:8,requirements:[{type:'ageMin',value:14},{type:'noPartner'}]},
      partnerTime:{ap:1,quality:8,happiness:4,stress:-2},
      gift:{ap:1,cost:250,quality:6},
      argue:{ap:1,baseSuccess:0.42,qualitySuccess:7,qualityFail:-9,stressSuccess:-3,stressFail:5},
      propose:{minAge:18,qualityMin:68,baseSuccess:0.55,declineQuality:-8,requirements:[{type:'hasPartner'},{type:'ageMin',value:18},{type:'partnerAgeMin',value:18},{type:'relationshipIs',value:'Dating'},{type:'partnerQualityMin',value:68}]},
      marry:{qualityMin:75,happiness:10,requirements:[{type:'hasPartner'},{type:'relationshipIs',value:'Engaged'},{type:'partnerQualityMin',value:75}]}, breakup:{happiness:-10},
      child:{ap:2,minAge:18,baseChance:0.32,birthCost:2500,happiness:10,stress:7,requirements:[{type:'hasPartner'},{type:'ageMin',value:18}]},
      familyTime:{ap:1,quality:5,happiness:4,stress:-2},
      childSupport:{ap:1,cost:500,quality:5,skill:3}, makeFriend:{ap:1}
    }
  },
  educationRanks: {'None':0,'High School':1,'Trade School':2,'College':3,'Graduate':4},
  lifeStages: [
    {maxAge:1,label:'Baby'},{maxAge:4,label:'Toddler'},{maxAge:12,label:'Child'},
    {maxAge:17,label:'Teen'},{maxAge:64,label:'Adult'},{maxAge:999,label:'Senior'}
  ],
  legalDefense: {
    public:{name:'Public Defender',cost:0,defense:0,jailReduction:0},
    standard:{name:'Standard Lawyer',cost:2500,defense:0.08,jailReduction:1},
    elite:{name:'Elite Lawyer',cost:7500,defense:0.16,jailReduction:2}
  },
  activities: {
    study:{id:'study',label:'Read / Learn',group:'mindBody',actionKey:'study',ap:1,effects:{intelligence:4,stress:3},narrative:'I spent time reading and learning.'},
    exercise:{id:'exercise',label:'Exercise',group:'mindBody',actionKey:'exercise',ap:1,effects:{fitness:4,health:2},narrative:'I exercised.'},
    socialize:{id:'socialize',label:'Socialize',group:'mindBody',actionKey:'socialize',ap:1,effects:{social:4,happiness:3},narrative:'I went out and socialized.'},
    relax:{id:'relax',label:'Relax',group:'mindBody',actionKey:'relax',ap:1,effects:{stress:-7,happiness:3},narrative:'I took time to relax.'},
    technology:{id:'technology',label:'Technology',group:'skills',actionKey:'technology',ap:1,effects:{technology:5,intelligence:1},narrative:'I practiced my technology skills.'},
    mechanical:{id:'mechanical',label:'Mechanical',group:'skills',actionKey:'mechanical',ap:1,effects:{mechanical:5,fitness:1},narrative:'I practiced mechanical skills.'},
    business:{id:'business',label:'Business',group:'skills',actionKey:'business',ap:1,effects:{business:5,intelligence:1},narrative:'I studied business.'},
    creativity:{id:'creativity',label:'Creativity',group:'skills',actionKey:'creative',ap:1,effects:{creativity:5,happiness:2},narrative:'I practiced something creative.'}
  },
  schoolClubs: {
    tech:{id:'tech',label:'Technology Club',name:'Technology Club',actionKey:'club',ap:1,effects:{technology:5,intelligence:2},narrative:'I joined the Technology Club.'},
    sports:{id:'sports',label:'Sports',name:'Sports Team',actionKey:'club',ap:1,effects:{fitness:6,social:2},narrative:'I joined a school sports team.'},
    arts:{id:'arts',label:'Arts Club',name:'Arts Club',actionKey:'club',ap:1,effects:{creativity:6,happiness:2},narrative:'I joined the Arts Club.'}
  },
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
    male:['Liam','Noah','Ethan','Lucas','Mason','Leo','Elijah','Mateo','Logan','Cameron','Jordan','Alex'],
    female:['Mia','Emma','Ava','Sofia','Zoe','Maya','Isla','Nora','Avery','Riley','Taylor','Morgan'],
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
    'CompTIA Network+': { cost:380, boost:{technology:8}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'technology',value:45}] },
    'CompTIA Security+': { cost:420, boost:{technology:8}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'technology',value:55}] },
    'ITIL Foundation': { cost:500, boost:{communication:7}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'communication',value:35}] },
    'Electrical License': { cost:650, boost:{mechanical:9}, requirements:[{type:'ageMin',value:20},{type:'skillMin',skill:'mechanical',value:60}] },
    'Project Management': { cost:650, boost:{business:8}, requirements:[{type:'ageMin',value:21},{type:'skillMin',skill:'business',value:55}] }
  },
  jobs: {
    fastfood:{name:'Fast Food Worker',track:'Service',salary:22000,marketMin:20000,marketMax:32000,minAge:16,edu:'None',intel:0,social:0,skill:null,skillMin:0,next:'retail',requirements:[{type:'ageMin',value:16},{type:'notJailed'}]},
    retail:{name:'Retail Associate',track:'Service',salary:28000,marketMin:24000,marketMax:38000,minAge:16,edu:'None',intel:0,social:35,skill:'communication',skillMin:20,next:'supervisor',requirements:[{type:'ageMin',value:16},{type:'socialMin',value:35},{type:'skillMin',skill:'communication',value:20},{type:'notJailed'}]},
    supervisor:{name:'Retail Supervisor',track:'Service',salary:42000,marketMin:36000,marketMax:60000,minAge:19,edu:'High School',intel:35,social:50,skill:'communication',skillMin:40,next:'manager',requirements:[{type:'ageMin',value:19},{type:'educationMin',value:'High School'},{type:'intelligenceMin',value:35},{type:'socialMin',value:50},{type:'skillMin',skill:'communication',value:40},{type:'notJailed'}]},
    manager:{name:'Operations Manager',track:'Operations',salary:105000,marketMin:80000,marketMax:145000,preferredEdu:'Graduate',minAge:24,edu:'College',intel:60,social:70,skill:'business',skillMin:55,next:'director',requirements:[{type:'ageMin',value:24},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:60},{type:'socialMin',value:70},{type:'skillMin',skill:'business',value:55},{type:'notJailed'}]},
    director:{name:'Operations Director',track:'Operations',salary:145000,marketMin:120000,marketMax:190000,preferredEdu:'Graduate',minAge:30,edu:'College',intel:68,social:75,skill:'business',skillMin:70,next:null,requirements:[{type:'ageMin',value:30},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:68},{type:'socialMin',value:75},{type:'skillMin',skill:'business',value:70},{type:'notJailed'}]},
    warehouse:{name:'Warehouse Technician',track:'Industrial',salary:39000,marketMin:34000,marketMax:55000,minAge:18,edu:'High School',intel:35,social:0,skill:'mechanical',skillMin:25,next:'industrialtech',requirements:[{type:'ageMin',value:18},{type:'educationMin',value:'High School'},{type:'intelligenceMin',value:35},{type:'skillMin',skill:'mechanical',value:25},{type:'notJailed'}]},
    industrialtech:{name:'Industrial Technician',track:'Industrial',salary:56000,marketMin:48000,marketMax:75000,minAge:20,edu:'High School',intel:45,social:10,skill:'mechanical',skillMin:50,next:'electrician',requirements:[{type:'ageMin',value:20},{type:'educationMin',value:'High School'},{type:'intelligenceMin',value:45},{type:'socialMin',value:10},{type:'skillMin',skill:'mechanical',value:50},{type:'notJailed'}]},
    electrician:{name:'Electrician',track:'Industrial',salary:65000,marketMin:55000,marketMax:95000,minAge:18,edu:'Trade School',intel:45,social:0,skill:'mechanical',skillMin:55,next:'controls',requirements:[{type:'ageMin',value:18},{type:'educationMin',value:'Trade School'},{type:'intelligenceMin',value:45},{type:'skillMin',skill:'mechanical',value:55},{type:'notJailed'}]},
    controls:{name:'Controls Specialist',track:'Automation',salary:90000,marketMin:75000,marketMax:125000,preferredEdu:'College',minAge:21,edu:'Trade School',intel:65,social:25,skill:'mechanical',skillMin:70,next:'automation',requirements:[{type:'ageMin',value:21},{type:'educationMin',value:'Trade School'},{type:'intelligenceMin',value:65},{type:'socialMin',value:25},{type:'skillMin',skill:'mechanical',value:70},{type:'notJailed'}]},
    automation:{name:'Automation Engineer',track:'Automation',salary:105000,marketMin:90000,marketMax:155000,preferredEdu:'Graduate',minAge:22,edu:'College',intel:72,social:25,skill:'technology',skillMin:70,next:'engineeringmanager',requirements:[{type:'ageMin',value:22},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:72},{type:'socialMin',value:25},{type:'skillMin',skill:'technology',value:70},{type:'notJailed'}]},
    engineeringmanager:{name:'Engineering Manager',track:'Automation',salary:135000,marketMin:120000,marketMax:190000,preferredEdu:'Graduate',minAge:28,edu:'College',intel:70,social:70,skill:'communication',skillMin:65,next:null,requirements:[{type:'ageMin',value:28},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:70},{type:'socialMin',value:70},{type:'skillMin',skill:'communication',value:65},{type:'notJailed'}]},
    it:{name:'IT Support Specialist',track:'IT',salary:56000,marketMin:45000,marketMax:75000,minAge:18,edu:'High School',intel:55,social:35,skill:'technology',skillMin:45,next:'sysadmin',requirements:[{type:'ageMin',value:18},{type:'educationMin',value:'High School'},{type:'intelligenceMin',value:55},{type:'socialMin',value:35},{type:'skillMin',skill:'technology',value:45},{type:'notJailed'}]},
    sysadmin:{name:'Systems Administrator',track:'IT',salary:82000,marketMin:70000,marketMax:115000,minAge:20,edu:'College',intel:65,social:30,skill:'technology',skillMin:65,next:'networkeng',requirements:[{type:'ageMin',value:20},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:65},{type:'socialMin',value:30},{type:'skillMin',skill:'technology',value:65},{type:'notJailed'}]},
    networkeng:{name:'Network Engineer',track:'IT',salary:98000,marketMin:85000,marketMax:135000,minAge:22,edu:'College',intel:70,social:35,skill:'technology',skillMin:75,next:'itmanager',requirements:[{type:'ageMin',value:22},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:70},{type:'socialMin',value:35},{type:'skillMin',skill:'technology',value:75},{type:'notJailed'}]},
    itmanager:{name:'IT Manager',track:'IT',salary:125000,marketMin:105000,marketMax:175000,preferredEdu:'Graduate',minAge:26,edu:'College',intel:65,social:70,skill:'communication',skillMin:65,next:null,requirements:[{type:'ageMin',value:26},{type:'educationMin',value:'College'},{type:'intelligenceMin',value:65},{type:'socialMin',value:70},{type:'skillMin',skill:'communication',value:65},{type:'notJailed'}]},
    doctor:{name:'Physician',track:'Medicine',salary:215000,marketMin:180000,marketMax:320000,minAge:26,edu:'Graduate',intel:85,social:45,skill:'communication',skillMin:45,next:null,requirements:[{type:'ageMin',value:26},{type:'educationMin',value:'Graduate'},{type:'intelligenceMin',value:85},{type:'socialMin',value:45},{type:'skillMin',skill:'communication',value:45},{type:'notJailed'}]}
  },
  universities: {
    'Community College': { tuition:0.65, admission:1.8, learning:0.9 },
    'State University': { tuition:1.0, admission:2.4, learning:1.0 },
    'Elite University': { tuition:1.8, admission:3.5, learning:1.25 }
  },
  education: {
    'Trade School': { cost:5000, years:2, requirements:[{type:'programNone'},{type:'ageMin',value:18},{type:'educationMin',value:'High School'}] },
    'College': { cost:12000, years:4, usesUniversity:true, requirements:[{type:'programNone'},{type:'ageMin',value:18},{type:'educationMin',value:'High School'}] },
    'Graduate School': { cost:25000, years:4, usesUniversity:true, requirements:[{type:'programNone'},{type:'ageMin',value:22},{type:'educationMin',value:'College'}] }
  },
  housing: {
    parents:{name:'Living with Parents',price:0,annual:0,minAge:0,owned:false},
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
    {id:'adult',name:'Welcome to Adulthood',description:'Reach age 18.',requirements:[{type:'ageMin',value:18}]},
    {id:'graduate',name:'Degree Earned',description:'Earn a college or graduate degree.',requirements:[{type:'educationMin',value:'College'}]},
    {id:'certified',name:'Certified',description:'Earn your first certification.',requirements:[{type:'arrayLengthMin',path:'certifications',value:1,label:'1 certification'}]},
    {id:'sixfig',name:'Six-Figure Career',description:'Reach a salary of $100,000.',requirements:[{type:'valueMin',path:'salary',value:100000,label:'Salary $100,000+'}]},
    {id:'millionaire',name:'Millionaire',description:'Reach $1,000,000 net worth.',requirements:[{type:'metricMin',metric:'netWorth',value:1000000,label:'Net worth $1,000,000+'}]},
    {id:'family',name:'Growing Family',description:'Have two children.',requirements:[{type:'arrayLengthMin',path:'family.children',value:2,label:'2 children'}]},
    {id:'business',name:'Entrepreneur',description:'Start a business.',requirements:[{type:'truthy',path:'business',label:'Own a business'}]},
    {id:'mogul',name:'Business Mogul',description:'Grow a business to $1M valuation.',requirements:[{type:'metricMin',metric:'businessValue',value:1000000,label:'Business value $1,000,000+'}]},
    {id:'century',name:'Centenarian',description:'Reach age 100.',requirements:[{type:'ageMin',value:100}]},
    {id:'legacy',name:'Legacy Continues',description:'Continue as the next generation.',requirements:[{type:'valueMin',path:'generation',value:2,label:'Generation 2+'}]},
    {id:'debtfree',name:'Debt Free',description:'Own a home and carry no debt.',requirements:[{type:'metricTruthy',metric:'homeOwned',label:'Own a home'},{type:'valueMax',path:'debt',value:0,label:'No debt'}]}
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
    {id:'scholarship',minAge:16,maxAge:18,weight:3,requirements:[{type:'valueMin',path:'gpa',value:3.1}],title:'Scholarship Opportunity',text:'A local foundation offers you a scholarship interview.',choices:[
      {label:'Apply',chance:'scholarship',success:{scholarship:8000,happiness:5},failure:{stress:2},result:'You submitted the application.'},
      {label:'Skip it',effect:{stress:-1},result:'You passed on the opportunity.'}
    ]},
    {id:'jobOffer',minAge:19,maxAge:65,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Recruiter Call',text:'A recruiter says another employer may pay more.',choices:[
      {label:'Interview',chance:'jobOffer',success:{salaryPct:0.10,happiness:4},failure:{stress:2},result:'You tested the market.'},
      {label:'Stay loyal',effect:{performance:4},result:'You stayed where you are.'}
    ]},
    {id:'recession',minAge:18,maxAge:75,weight:2,requirements:[{type:'truthy',path:'job'},{type:'valueEquals',path:'economy.state',value:'Recession'}],title:'Economic Slowdown',text:'The economy is weak and your employer is cutting costs.',choices:[
      {label:'Work extra hard',effect:{performance:8,stress:6},result:'You tried to make yourself indispensable.'},
      {label:'Build savings',effect:{business:2,stress:2},result:'You focused on protecting your finances.'}
    ]},
    {id:'familyAsk',minAge:20,maxAge:70,weight:3,requirements:[{type:'metricTruthy',metric:'familyAlive'}],title:'Family Needs Help',text:'A family member asks you for financial help.',choices:[
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
    {id:'childTalent',minAge:25,maxAge:75,weight:3,requirements:[{type:'metricTruthy',metric:'hasLivingChild'}],title:'A Child Shows Promise',text:'One of your children is showing a real talent.',choices:[
      {label:'Invest in lessons',cost:1500,effect:{happiness:4},childBoost:8,result:'You supported their development.'},
      {label:'Encourage them yourself',effect:{communication:3},childBoost:4,result:'You became their biggest supporter.'}
    ]},
    {id:'temptation',minAge:18,maxAge:80,weight:2,requirements:[{type:'hasPartner'}],title:'Unexpected Attraction',text:'Someone new is showing strong interest in you even though you are in a relationship.',choices:[
      {label:'Stay loyal',effect:{karma:5,stress:1},partnerQuality:4,result:'You protected your relationship.'},
      {label:'Cheat',effect:{karma:-15,happiness:3,stress:7},partnerQuality:-22,delayed:{years:1,text:'The secret from your affair resurfaces.',effect:{stress:8,happiness:-6}},result:'You crossed a line that may come back later.'}
    ]},
    {id:'businessBreak',minAge:18,maxAge:80,weight:3,requirements:[{type:'truthy',path:'business'}],title:'Business Opportunity',text:'A larger client offers your business a risky contract.',choices:[
      {label:'Take the deal',chance:'businessDeal',success:{businessCash:15000,businessRep:8},failure:{businessCash:-8000,businessRep:-6,stress:7},result:'You took the risk.'},
      {label:'Decline',effect:{stress:-2},result:'You protected the company from the risk.'}
    ]}
  ]
};
