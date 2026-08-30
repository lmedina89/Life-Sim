window.GAME_DATA = {
  version: '0.7.5.1',
  architecture: 'data-core-4-content-depth',
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
      finance:{debtCreditPenalty:3,savingsInterestFloor:0.01,savingsInterestMultiplier:0.45,investmentReturnAboveOne:[-0.06,0.18],investmentReturnBelowOne:[-0.14,0.12],inventoryConditionDrift:[-2,2],inventoryDepreciation:[0.04,0.16],vehicleBreakdownCondition:30,vehicleBreakdownChance:0.25,vehicleRepair:[800,2500],vehicleRepairConditionGain:20,negativeCashCreditPenalty:10,
        mortgage:{downPayment:0.10,termYears:30,rateSpread:0.012,saleCost:0.06},
        childCosts:{baby:8000,child:6500,teen:8500}},
      relationships:{partnerQualityDrift:[-4,1],breakupQualityThreshold:15,breakupChance:0.22,breakupHappiness:-12}
    },
    career: {
      apply:{id:'apply',actionKey:'jobApply',ap:1,baseChance:0.45,socialDivisor:350,intelligenceDivisor:500,jobSkillDivisor:550,certBonusEach:0.025,criminalPenalty:0.16,luckDivisor:1800,startPerformance:50,bossQuality:[45,75],
        offer:{experienceYearsForMax:15,experienceWeight:0.18,relatedExperienceMultiplier:0.6,skillWeight:0.12,educationStepWeight:0.04,certWeight:0.012,performanceWeight:0.05,reputationWeight:0.06,majorMatchWeight:0.035,preferredEducationWeight:0.04,currentSalaryLeverageWeight:0.04},
        negotiation:{baseChance:0.34,socialDivisor:300,intelligenceDivisor:700,experienceDivisor:70,reputationDivisor:1400,educationStepBonus:0.035,certBonusEach:0.012,performanceDivisor:900,raiseRange:[0.03,0.10]}}, 
      work:{id:'work',actionKey:'work',ap:2,effects:{performance:8,stress:5},scaled:['performance'],bossQuality:2,bossQualityScaled:true,narrative:'I worked harder at my job.',toast:'Work effort used 2 AP'},
      network:{id:'network',actionKey:'network',ap:1,effects:{communication:3,social:2,stress:1},scaled:['communication','social'],bossQuality:5,bossQualityScaled:true,narrative:'I networked with people at work.'},
      promotion:{id:'promotion',actionKey:'promotion',ap:1,minPerformance:65,minBossQuality:45,promotionPerformance:55,raiseBaseChance:0.12,performanceDivisor:180,socialDivisor:700,bossDivisor:900,raiseRange:[1.025,1.06],salaryCeilingMultiplier:1.03,exceptionalCeilingMultiplier:1.35,reputationThreshold:78}, retirement:{minAge:55,minYears:20,incomeRate:0.22,reputationBonus:6}
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
    communication:{id:'communication',label:'Communication',group:'skills',actionKey:'communication',ap:1,effects:{communication:5,social:1},narrative:'I practiced speaking, presenting and communicating clearly.'},
    creativity:{id:'creativity',label:'Creativity',group:'skills',actionKey:'creative',ap:1,effects:{creativity:5,happiness:2},narrative:'I practiced something creative.'}
  },
  schoolClubs: {
    tech:{id:'tech',label:'Technology Club',name:'Technology Club',actionKey:'club',ap:1,effects:{technology:5,intelligence:2},narrative:'I joined the Technology Club.'},
    sports:{id:'sports',label:'Sports',name:'Sports Team',actionKey:'club',ap:1,effects:{fitness:6,social:2},narrative:'I joined a school sports team.'},
    arts:{id:'arts',label:'Arts Club',name:'Arts Club',actionKey:'club',ap:1,effects:{creativity:6,happiness:2},narrative:'I joined the Arts Club.'}
  },
  saveKey: 'lifeSimV06',
  saveSchemaVersion: 1,
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
    'Computer Science': { skill:'technology', bonus:10, careerTags:['IT','Software','Technology'] },
    'Information Systems': { skill:'technology', bonus:9, careerTags:['IT','Business'] },
    'Business': { skill:'business', bonus:10, careerTags:['Business','Operations','Finance','Sales'] },
    'Finance': { skill:'business', bonus:9, careerTags:['Finance','Business'] },
    'Engineering': { skill:'mechanical', bonus:10, careerTags:['Engineering','Automation','Industrial'] },
    'Nursing': { skill:'communication', bonus:8, careerTags:['Healthcare'] },
    'Biology': { skill:'intelligence', bonus:8, careerTags:['Healthcare','Science'] },
    'Education': { skill:'communication', bonus:9, careerTags:['Education'] },
    'Communications': { skill:'communication', bonus:10, careerTags:['Sales','Creative','Business'] },
    'Criminal Justice': { skill:'communication', bonus:7, careerTags:['Government','Law'] },
    'Psychology': { skill:'communication', bonus:8, careerTags:['Healthcare','Education'] },
    'Fine Arts': { skill:'creativity', bonus:10, careerTags:['Creative'] }
  },
  certifications: {
    'CompTIA A+': { category:'IT', cost:260, boost:{technology:6}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'technology',value:30}] },
    'CompTIA Network+': { category:'IT', cost:380, boost:{technology:8}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'technology',value:45}] },
    'CompTIA Security+': { category:'IT', cost:420, boost:{technology:8}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'technology',value:55}] },
    'CCNA': { category:'IT', cost:460, boost:{technology:10}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'technology',value:68}] },
    'ITIL Foundation': { category:'IT', cost:500, boost:{communication:7}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'communication',value:35}] },
    'OSHA 30': { category:'Industrial', cost:190, boost:{mechanical:5}, requirements:[{type:'ageMin',value:18}] },
    'Electrical License': { category:'Trades', cost:650, boost:{mechanical:9}, requirements:[{type:'ageMin',value:20},{type:'skillMin',skill:'mechanical',value:60}] },
    'HVAC Certification': { category:'Trades', cost:550, boost:{mechanical:8}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'mechanical',value:48}] },
    'Welding Certification': { category:'Trades', cost:475, boost:{mechanical:8}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'mechanical',value:45}] },
    'Six Sigma Green Belt': { category:'Operations', cost:450, boost:{business:7}, requirements:[{type:'ageMin',value:20},{type:'skillMin',skill:'business',value:42}] },
    'PMP': { category:'Business', cost:650, boost:{business:9,communication:4}, requirements:[{type:'ageMin',value:23},{type:'skillMin',skill:'business',value:58}] },
    'CAPM': { category:'Business', cost:350, boost:{business:6}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'business',value:35}] },
    'Teaching License': { category:'Education', cost:500, boost:{communication:7}, requirements:[{type:'educationMin',value:'College'},{type:'ageMin',value:22}] },
    'EMT Certification': { category:'Healthcare', cost:700, boost:{communication:5,fitness:3}, requirements:[{type:'ageMin',value:18}] },
    'Real Estate License': { category:'Sales', cost:600, boost:{business:6,communication:5}, requirements:[{type:'ageMin',value:18},{type:'skillMin',skill:'communication',value:35}] }
  },
  jobs: {
    fastfood:{name:'Fast Food Worker',track:'Service',level:1,marketMin:20000,marketMax:32000,minAge:16,edu:'None',skill:null,skillMin:0,next:'retail',requirements:[{type:'ageMin',value:16},{type:'notJailed'}]},
    retail:{name:'Retail Associate',track:'Service',level:1,marketMin:24000,marketMax:38000,minAge:16,edu:'None',skill:'communication',skillMin:20,next:'supervisor',requirements:[{type:'ageMin',value:16},{type:'socialMin',value:35},{type:'skillMin',skill:'communication',value:20},{type:'notJailed'}]},
    supervisor:{name:'Retail Supervisor',track:'Service',level:2,marketMin:36000,marketMax:60000,minAge:19,edu:'High School',skill:'communication',skillMin:40,next:'storemanager',requirements:[{type:'ageMin',value:19},{type:'educationMin',value:'High School'},{type:'socialMin',value:50},{type:'skillMin',skill:'communication',value:40},{type:'notJailed'}]},
    storemanager:{name:'Store Manager',track:'Service',level:3,marketMin:55000,marketMax:90000,minAge:22,edu:'High School',preferredEdu:'College',skill:'business',skillMin:50,next:'regionalmanager',requirements:[{type:'ageMin',value:22},{type:'educationMin',value:'High School'},{type:'skillMin',skill:'business',value:50},{type:'socialMin',value:58},{type:'notJailed'}]},
    regionalmanager:{name:'Regional Retail Manager',track:'Service',level:4,marketMin:85000,marketMax:140000,minAge:28,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:65,next:null,requirements:[{type:'ageMin',value:28},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:65},{type:'socialMin',value:70},{type:'notJailed'}]},

    warehouse:{name:'Warehouse Technician',track:'Industrial',level:1,marketMin:34000,marketMax:55000,minAge:18,edu:'High School',skill:'mechanical',skillMin:25,next:'industrialtech',requirements:[{type:'ageMin',value:18},{type:'educationMin',value:'High School'},{type:'skillMin',skill:'mechanical',value:25},{type:'notJailed'}]},
    industrialtech:{name:'Industrial Technician',track:'Industrial',level:2,marketMin:48000,marketMax:75000,minAge:20,edu:'High School',skill:'mechanical',skillMin:50,next:'maintenancelead',requirements:[{type:'ageMin',value:20},{type:'educationMin',value:'High School'},{type:'skillMin',skill:'mechanical',value:50},{type:'notJailed'}]},
    maintenancelead:{name:'Maintenance Team Lead',track:'Industrial',level:3,marketMin:65000,marketMax:95000,minAge:23,edu:'High School',preferredEdu:'Trade School',skill:'mechanical',skillMin:62,next:'maintenancemanager',requirements:[{type:'ageMin',value:23},{type:'skillMin',skill:'mechanical',value:62},{type:'socialMin',value:45},{type:'notJailed'}]},
    maintenancemanager:{name:'Maintenance Manager',track:'Industrial',level:4,marketMin:90000,marketMax:145000,minAge:28,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:60,next:'plantmanager',requirements:[{type:'ageMin',value:28},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:60},{type:'socialMin',value:62},{type:'notJailed'}]},
    plantmanager:{name:'Plant Manager',track:'Industrial',level:5,marketMin:130000,marketMax:220000,minAge:34,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:75,next:'vpmanufacturing',requirements:[{type:'ageMin',value:34},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:75},{type:'socialMin',value:75},{type:'reputationMin',value:60},{type:'notJailed'}]},
    vpmanufacturing:{name:'VP of Manufacturing',track:'Industrial',level:6,marketMin:190000,marketMax:350000,minAge:40,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:82,next:'coo',requirements:[{type:'ageMin',value:40},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:82},{type:'socialMin',value:82},{type:'reputationMin',value:72},{type:'notJailed'}]},

    electricianapprentice:{name:'Electrician Apprentice',track:'Trades',level:1,marketMin:35000,marketMax:52000,minAge:18,edu:'High School',skill:'mechanical',skillMin:30,next:'electrician',requirements:[{type:'ageMin',value:18},{type:'educationMin',value:'High School'},{type:'skillMin',skill:'mechanical',value:30},{type:'notJailed'}]},
    electrician:{name:'Electrician',track:'Trades',level:2,marketMin:55000,marketMax:95000,minAge:20,edu:'Trade School',skill:'mechanical',skillMin:55,next:'masterelectrician',requirements:[{type:'ageMin',value:20},{type:'educationMin',value:'Trade School'},{type:'skillMin',skill:'mechanical',value:55},{type:'notJailed'}]},
    masterelectrician:{name:'Master Electrician',track:'Trades',level:3,marketMin:80000,marketMax:130000,minAge:25,edu:'Trade School',skill:'mechanical',skillMin:75,next:'electricalcontractor',requirements:[{type:'ageMin',value:25},{type:'educationMin',value:'Trade School'},{type:'certification',value:'Electrical License'},{type:'skillMin',skill:'mechanical',value:75},{type:'notJailed'}]},
    electricalcontractor:{name:'Electrical Contractor',track:'Trades',level:4,marketMin:110000,marketMax:190000,minAge:30,edu:'Trade School',skill:'business',skillMin:65,next:null,requirements:[{type:'ageMin',value:30},{type:'educationMin',value:'Trade School'},{type:'certification',value:'Electrical License'},{type:'skillMin',skill:'business',value:65},{type:'notJailed'}]},
    hvactech:{name:'HVAC Technician',track:'Trades',level:2,marketMin:50000,marketMax:85000,minAge:20,edu:'Trade School',skill:'mechanical',skillMin:50,next:null,requirements:[{type:'educationMin',value:'Trade School'},{type:'certification',value:'HVAC Certification'},{type:'skillMin',skill:'mechanical',value:50},{type:'notJailed'}]},
    welder:{name:'Certified Welder',track:'Trades',level:2,marketMin:45000,marketMax:80000,minAge:18,edu:'Trade School',skill:'mechanical',skillMin:48,next:null,requirements:[{type:'educationMin',value:'Trade School'},{type:'certification',value:'Welding Certification'},{type:'notJailed'}]},

    controls:{name:'Controls Specialist',track:'Automation',level:3,marketMin:75000,marketMax:125000,minAge:21,edu:'Trade School',preferredEdu:'College',skill:'mechanical',skillMin:70,next:'automation',requirements:[{type:'ageMin',value:21},{type:'educationMin',value:'Trade School'},{type:'skillMin',skill:'mechanical',value:70},{type:'notJailed'}]},
    automation:{name:'Automation Engineer',track:'Automation',level:4,marketMin:90000,marketMax:155000,minAge:22,edu:'College',preferredEdu:'Graduate',skill:'technology',skillMin:70,next:'engineeringmanager',requirements:[{type:'ageMin',value:22},{type:'educationMin',value:'College'},{type:'skillMin',skill:'technology',value:70},{type:'notJailed'}]},
    engineeringmanager:{name:'Engineering Manager',track:'Automation',level:5,marketMin:120000,marketMax:190000,minAge:28,edu:'College',preferredEdu:'Graduate',skill:'communication',skillMin:65,next:'engineeringdirector',requirements:[{type:'ageMin',value:28},{type:'educationMin',value:'College'},{type:'skillMin',skill:'communication',value:65},{type:'socialMin',value:65},{type:'notJailed'}]},
    engineeringdirector:{name:'Engineering Director',track:'Automation',level:6,marketMin:165000,marketMax:275000,minAge:34,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:70,next:'vpengineering',requirements:[{type:'ageMin',value:34},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:70},{type:'reputationMin',value:65},{type:'notJailed'}]},
    vpengineering:{name:'VP of Engineering',track:'Automation',level:7,marketMin:220000,marketMax:420000,minAge:40,edu:'Graduate',skill:'business',skillMin:78,next:'cto',requirements:[{type:'ageMin',value:40},{type:'educationMin',value:'Graduate'},{type:'skillMin',skill:'business',value:78},{type:'reputationMin',value:75},{type:'notJailed'}]},

    it:{name:'IT Support Specialist',track:'IT',level:1,marketMin:45000,marketMax:75000,minAge:18,edu:'High School',skill:'technology',skillMin:45,next:'sysadmin',requirements:[{type:'ageMin',value:18},{type:'educationMin',value:'High School'},{type:'skillMin',skill:'technology',value:45},{type:'notJailed'}]},
    sysadmin:{name:'Systems Administrator',track:'IT',level:2,marketMin:70000,marketMax:115000,minAge:20,edu:'High School',preferredEdu:'College',skill:'technology',skillMin:65,next:'networkeng',requirements:[{type:'ageMin',value:20},{type:'skillMin',skill:'technology',value:65},{type:'certificationAny',values:['CompTIA Network+','CCNA']},{type:'notJailed'}]},
    networkeng:{name:'Network Engineer',track:'IT',level:3,marketMin:85000,marketMax:135000,minAge:22,edu:'High School',preferredEdu:'College',skill:'technology',skillMin:75,next:'itmanager',requirements:[{type:'ageMin',value:22},{type:'skillMin',skill:'technology',value:75},{type:'certificationAny',values:['CompTIA Network+','CCNA']},{type:'notJailed'}]},
    itmanager:{name:'IT Manager',track:'IT',level:4,marketMin:105000,marketMax:175000,minAge:26,edu:'College',preferredEdu:'Graduate',skill:'communication',skillMin:65,next:'itdirector',requirements:[{type:'ageMin',value:26},{type:'educationMin',value:'College'},{type:'skillMin',skill:'communication',value:65},{type:'socialMin',value:65},{type:'notJailed'}]},
    itdirector:{name:'IT Director',track:'IT',level:5,marketMin:145000,marketMax:245000,minAge:32,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:70,next:'cio',requirements:[{type:'ageMin',value:32},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:70},{type:'reputationMin',value:62},{type:'notJailed'}]},
    cio:{name:'Chief Information Officer',track:'IT',level:6,marketMin:220000,marketMax:500000,minAge:40,edu:'Graduate',skill:'business',skillMin:82,next:null,requirements:[{type:'ageMin',value:40},{type:'educationMin',value:'Graduate'},{type:'skillMin',skill:'business',value:82},{type:'skillMin',skill:'communication',value:80},{type:'reputationMin',value:78},{type:'notJailed'}]},

    juniordev:{name:'Junior Software Developer',track:'Software',level:1,marketMin:65000,marketMax:100000,minAge:20,edu:'College',skill:'technology',skillMin:58,next:'developer',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'technology',value:58},{type:'notJailed'}]},
    developer:{name:'Software Developer',track:'Software',level:2,marketMin:85000,marketMax:140000,minAge:22,edu:'College',skill:'technology',skillMin:70,next:'seniordev',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'technology',value:70},{type:'notJailed'}]},
    seniordev:{name:'Senior Software Developer',track:'Software',level:3,marketMin:120000,marketMax:190000,minAge:26,edu:'College',skill:'technology',skillMin:82,next:'softwarelead',requirements:[{type:'skillMin',skill:'technology',value:82},{type:'reputationMin',value:55},{type:'notJailed'}]},
    softwarelead:{name:'Software Engineering Lead',track:'Software',level:4,marketMin:150000,marketMax:230000,minAge:30,edu:'College',skill:'communication',skillMin:68,next:'softwaredirector',requirements:[{type:'skillMin',skill:'technology',value:85},{type:'skillMin',skill:'communication',value:68},{type:'notJailed'}]},
    softwaredirector:{name:'Software Engineering Director',track:'Software',level:5,marketMin:190000,marketMax:320000,minAge:35,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:72,next:'cto',requirements:[{type:'skillMin',skill:'business',value:72},{type:'reputationMin',value:68},{type:'notJailed'}]},
    cto:{name:'Chief Technology Officer',track:'Technology',level:7,marketMin:250000,marketMax:600000,minAge:40,edu:'Graduate',skill:'technology',skillMin:88,next:null,requirements:[{type:'educationMin',value:'Graduate'},{type:'skillMin',skill:'technology',value:88},{type:'skillMin',skill:'communication',value:80},{type:'reputationMin',value:80},{type:'notJailed'}]},

    operationscoordinator:{name:'Operations Coordinator',track:'Operations',level:1,marketMin:42000,marketMax:65000,minAge:18,edu:'High School',skill:'business',skillMin:30,next:'manager',requirements:[{type:'educationMin',value:'High School'},{type:'skillMin',skill:'business',value:30},{type:'notJailed'}]},
    manager:{name:'Operations Manager',track:'Operations',level:3,marketMin:80000,marketMax:145000,minAge:24,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:55,next:'director',requirements:[{type:'ageMin',value:24},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:55},{type:'socialMin',value:65},{type:'notJailed'}]},
    director:{name:'Operations Director',track:'Operations',level:4,marketMin:120000,marketMax:190000,minAge:30,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:70,next:'vpoperations',requirements:[{type:'ageMin',value:30},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:70},{type:'socialMin',value:72},{type:'notJailed'}]},
    vpoperations:{name:'VP of Operations',track:'Operations',level:5,marketMin:180000,marketMax:330000,minAge:36,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:80,next:'coo',requirements:[{type:'ageMin',value:36},{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:80},{type:'reputationMin',value:70},{type:'notJailed'}]},
    coo:{name:'Chief Operating Officer',track:'Executive',level:7,marketMin:260000,marketMax:650000,minAge:42,edu:'Graduate',skill:'business',skillMin:88,next:null,requirements:[{type:'educationMin',value:'Graduate'},{type:'skillMin',skill:'business',value:88},{type:'skillMin',skill:'communication',value:82},{type:'reputationMin',value:82},{type:'notJailed'}]},

    salesrep:{name:'Sales Representative',track:'Sales',level:1,marketMin:40000,marketMax:85000,minAge:18,edu:'High School',skill:'communication',skillMin:45,next:'salesmanager',requirements:[{type:'skillMin',skill:'communication',value:45},{type:'socialMin',value:55},{type:'notJailed'}]},
    salesmanager:{name:'Sales Manager',track:'Sales',level:3,marketMin:80000,marketMax:150000,minAge:25,edu:'College',skill:'communication',skillMin:68,next:'salesdirector',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'communication',value:68},{type:'skillMin',skill:'business',value:55},{type:'notJailed'}]},
    salesdirector:{name:'Sales Director',track:'Sales',level:4,marketMin:130000,marketMax:240000,minAge:32,edu:'College',skill:'business',skillMin:72,next:'vpsales',requirements:[{type:'skillMin',skill:'business',value:72},{type:'reputationMin',value:62},{type:'notJailed'}]},
    vpsales:{name:'VP of Sales',track:'Sales',level:5,marketMin:190000,marketMax:380000,minAge:38,edu:'College',preferredEdu:'Graduate',skill:'communication',skillMin:82,next:null,requirements:[{type:'skillMin',skill:'communication',value:82},{type:'reputationMin',value:74},{type:'notJailed'}]},

    bankteller:{name:'Bank Teller',track:'Finance',level:1,marketMin:35000,marketMax:50000,minAge:18,edu:'High School',skill:'business',skillMin:30,next:'financialanalyst',requirements:[{type:'educationMin',value:'High School'},{type:'notJailed'}]},
    financialanalyst:{name:'Financial Analyst',track:'Finance',level:2,marketMin:65000,marketMax:110000,minAge:22,edu:'College',skill:'business',skillMin:60,next:'financemanager',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:60},{type:'notJailed'}]},
    financemanager:{name:'Finance Manager',track:'Finance',level:3,marketMin:95000,marketMax:155000,minAge:28,edu:'College',skill:'business',skillMin:70,next:'financedirector',requirements:[{type:'skillMin',skill:'business',value:70},{type:'socialMin',value:60},{type:'notJailed'}]},
    financedirector:{name:'Finance Director',track:'Finance',level:4,marketMin:140000,marketMax:235000,minAge:34,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:80,next:'cfo',requirements:[{type:'skillMin',skill:'business',value:80},{type:'reputationMin',value:66},{type:'notJailed'}]},
    cfo:{name:'Chief Financial Officer',track:'Finance',level:6,marketMin:240000,marketMax:600000,minAge:42,edu:'Graduate',skill:'business',skillMin:90,next:null,requirements:[{type:'educationMin',value:'Graduate'},{type:'skillMin',skill:'business',value:90},{type:'reputationMin',value:80},{type:'notJailed'}]},

    teacher:{name:'Teacher',track:'Education',level:2,marketMin:45000,marketMax:78000,minAge:22,edu:'College',skill:'communication',skillMin:55,next:'principal',requirements:[{type:'educationMin',value:'College'},{type:'certification',value:'Teaching License'},{type:'skillMin',skill:'communication',value:55},{type:'notJailed'}]},
    principal:{name:'School Principal',track:'Education',level:4,marketMin:85000,marketMax:135000,minAge:32,edu:'Graduate',skill:'communication',skillMin:72,next:'superintendent',requirements:[{type:'educationMin',value:'Graduate'},{type:'skillMin',skill:'communication',value:72},{type:'reputationMin',value:62},{type:'notJailed'}]},
    superintendent:{name:'School Superintendent',track:'Education',level:5,marketMin:130000,marketMax:230000,minAge:40,edu:'Graduate',skill:'business',skillMin:75,next:null,requirements:[{type:'skillMin',skill:'business',value:75},{type:'reputationMin',value:75},{type:'notJailed'}]},

    emt:{name:'EMT',track:'Healthcare',level:1,marketMin:35000,marketMax:55000,minAge:18,edu:'High School',skill:'communication',skillMin:40,next:'paramedic',requirements:[{type:'certification',value:'EMT Certification'},{type:'fitnessMin',value:45},{type:'notJailed'}]},
    paramedic:{name:'Paramedic',track:'Healthcare',level:2,marketMin:50000,marketMax:80000,minAge:21,edu:'Trade School',skill:'communication',skillMin:55,next:null,requirements:[{type:'certification',value:'EMT Certification'},{type:'skillMin',skill:'communication',value:55},{type:'notJailed'}]},
    nurse:{name:'Registered Nurse',track:'Healthcare',level:2,marketMin:70000,marketMax:120000,minAge:22,edu:'College',skill:'communication',skillMin:60,next:'nursemanager',requirements:[{type:'educationMin',value:'College'},{type:'majorIn',values:['Nursing']},{type:'skillMin',skill:'communication',value:60},{type:'notJailed'}]},
    nursemanager:{name:'Nurse Manager',track:'Healthcare',level:4,marketMin:100000,marketMax:155000,minAge:30,edu:'College',skill:'communication',skillMin:72,next:null,requirements:[{type:'skillMin',skill:'communication',value:72},{type:'reputationMin',value:62},{type:'notJailed'}]},
    doctor:{name:'Physician',track:'Healthcare',level:5,marketMin:180000,marketMax:320000,minAge:26,edu:'Graduate',skill:'communication',skillMin:45,next:'medicaldirector',requirements:[{type:'educationMin',value:'Graduate'},{type:'graduatePathIn',values:['MD']},{type:'intelligenceMin',value:85},{type:'notJailed'}]},
    medicaldirector:{name:'Medical Director',track:'Healthcare',level:6,marketMin:250000,marketMax:450000,minAge:35,edu:'Graduate',skill:'business',skillMin:68,next:null,requirements:[{type:'graduatePathIn',values:['MD']},{type:'reputationMin',value:72},{type:'notJailed'}]},

    labtech:{name:'Laboratory Technician',track:'Science',level:1,marketMin:42000,marketMax:70000,minAge:20,edu:'College',skill:'intelligence',skillMin:0,next:'scientist',requirements:[{type:'educationMin',value:'College'},{type:'majorIn',values:['Biology','Engineering']},{type:'intelligenceMin',value:65},{type:'notJailed'}]},
    scientist:{name:'Research Scientist',track:'Science',level:3,marketMin:80000,marketMax:145000,minAge:24,edu:'Graduate',skill:'intelligence',skillMin:0,next:'researchdirector',requirements:[{type:'educationMin',value:'Graduate'},{type:'intelligenceMin',value:78},{type:'notJailed'}]},
    researchdirector:{name:'Research Director',track:'Science',level:5,marketMin:140000,marketMax:250000,minAge:35,edu:'Graduate',skill:'business',skillMin:65,next:null,requirements:[{type:'intelligenceMin',value:85},{type:'skillMin',skill:'business',value:65},{type:'reputationMin',value:68},{type:'notJailed'}]},

    graphicdesigner:{name:'Graphic Designer',track:'Creative',level:1,marketMin:42000,marketMax:80000,minAge:20,edu:'College',skill:'creativity',skillMin:55,next:'artdirector',requirements:[{type:'skillMin',skill:'creativity',value:55},{type:'notJailed'}]},
    artdirector:{name:'Art Director',track:'Creative',level:3,marketMin:85000,marketMax:150000,minAge:28,edu:'College',skill:'creativity',skillMin:75,next:'creativedirector',requirements:[{type:'skillMin',skill:'creativity',value:75},{type:'skillMin',skill:'communication',value:60},{type:'notJailed'}]},
    creativedirector:{name:'Creative Director',track:'Creative',level:5,marketMin:130000,marketMax:230000,minAge:34,edu:'College',skill:'creativity',skillMin:85,next:null,requirements:[{type:'skillMin',skill:'creativity',value:85},{type:'reputationMin',value:65},{type:'notJailed'}]},

    policeofficer:{name:'Police Officer',track:'Government',level:2,marketMin:50000,marketMax:85000,minAge:21,edu:'High School',skill:'communication',skillMin:45,next:'detective',requirements:[{type:'ageMin',value:21},{type:'fitnessMin',value:55},{type:'criminalRecordFalse'},{type:'notJailed'}]},
    detective:{name:'Detective',track:'Government',level:3,marketMin:70000,marketMax:110000,minAge:27,edu:'College',skill:'communication',skillMin:60,next:'policecaptain',requirements:[{type:'educationMin',value:'College'},{type:'majorIn',values:['Criminal Justice','Psychology']},{type:'notJailed'}]},
    policecaptain:{name:'Police Captain',track:'Government',level:5,marketMin:100000,marketMax:160000,minAge:35,edu:'College',skill:'business',skillMin:62,next:null,requirements:[{type:'skillMin',skill:'business',value:62},{type:'reputationMin',value:68},{type:'notJailed'}]},

    paralegal:{name:'Paralegal',track:'Law',level:1,marketMin:45000,marketMax:75000,minAge:20,edu:'College',skill:'communication',skillMin:48,next:'attorney',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'communication',value:48},{type:'notJailed'}]},
    attorney:{name:'Attorney',track:'Law',level:3,marketMin:85000,marketMax:180000,minAge:25,edu:'Graduate',skill:'communication',skillMin:72,next:'seniorattorney',requirements:[{type:'graduatePathIn',values:['JD']},{type:'skillMin',skill:'communication',value:72},{type:'criminalRecordFalse'},{type:'notJailed'}]},
    seniorattorney:{name:'Senior Attorney',track:'Law',level:4,marketMin:130000,marketMax:250000,minAge:32,edu:'Graduate',skill:'communication',skillMin:82,next:'lawpartner',requirements:[{type:'graduatePathIn',values:['JD']},{type:'reputationMin',value:65},{type:'notJailed'}]},
    lawpartner:{name:'Law Firm Partner',track:'Law',level:6,marketMin:220000,marketMax:550000,minAge:40,edu:'Graduate',skill:'business',skillMin:82,next:null,requirements:[{type:'graduatePathIn',values:['JD']},{type:'skillMin',skill:'business',value:82},{type:'reputationMin',value:80},{type:'notJailed'}]},

    soldier:{name:'Enlisted Service Member',track:'Military',level:1,marketMin:30000,marketMax:52000,minAge:18,edu:'High School',skill:'fitness',skillMin:0,next:'nco',requirements:[{type:'educationMin',value:'High School'},{type:'fitnessMin',value:55},{type:'criminalRecordFalse'},{type:'notJailed'}]},
    nco:{name:'Noncommissioned Officer',track:'Military',level:3,marketMin:45000,marketMax:75000,minAge:23,edu:'High School',skill:'communication',skillMin:55,next:'seniornco',requirements:[{type:'fitnessMin',value:60},{type:'skillMin',skill:'communication',value:55},{type:'reputationMin',value:50},{type:'notJailed'}]},
    seniornco:{name:'Senior NCO',track:'Military',level:4,marketMin:65000,marketMax:100000,minAge:30,edu:'High School',preferredEdu:'College',skill:'business',skillMin:58,next:null,requirements:[{type:'fitnessMin',value:55},{type:'skillMin',skill:'business',value:58},{type:'reputationMin',value:65},{type:'notJailed'}]},
    militaryofficer:{name:'Military Officer',track:'Military',level:3,marketMin:55000,marketMax:100000,minAge:22,edu:'College',skill:'communication',skillMin:60,next:'seniorofficer',requirements:[{type:'educationMin',value:'College'},{type:'fitnessMin',value:55},{type:'criminalRecordFalse'},{type:'notJailed'}]},
    seniorofficer:{name:'Senior Military Officer',track:'Military',level:5,marketMin:90000,marketMax:155000,minAge:32,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:70,next:null,requirements:[{type:'skillMin',skill:'business',value:70},{type:'reputationMin',value:72},{type:'notJailed'}]},

    deliverydriver:{name:'Delivery Driver',track:'Transportation',level:1,marketMin:35000,marketMax:60000,minAge:18,edu:'High School',skill:'communication',skillMin:25,next:'truckdriver',requirements:[{type:'educationMin',value:'High School'},{type:'notJailed'}]},
    truckdriver:{name:'Commercial Truck Driver',track:'Transportation',level:2,marketMin:55000,marketMax:95000,minAge:21,edu:'High School',skill:'communication',skillMin:35,next:'fleetmanager',requirements:[{type:'ageMin',value:21},{type:'notJailed'}]},
    fleetmanager:{name:'Fleet Manager',track:'Transportation',level:4,marketMin:85000,marketMax:140000,minAge:28,edu:'College',skill:'business',skillMin:60,next:'transportdirector',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:60},{type:'notJailed'}]},
    transportdirector:{name:'Transportation Director',track:'Transportation',level:5,marketMin:120000,marketMax:210000,minAge:35,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:75,next:null,requirements:[{type:'skillMin',skill:'business',value:75},{type:'reputationMin',value:68},{type:'notJailed'}]},

    constructionlabor:{name:'Construction Worker',track:'Construction',level:1,marketMin:38000,marketMax:65000,minAge:18,edu:'High School',skill:'mechanical',skillMin:30,next:'constructionforeman',requirements:[{type:'skillMin',skill:'mechanical',value:30},{type:'fitnessMin',value:45},{type:'notJailed'}]},
    constructionforeman:{name:'Construction Foreman',track:'Construction',level:3,marketMin:65000,marketMax:105000,minAge:24,edu:'High School',preferredEdu:'Trade School',skill:'mechanical',skillMin:60,next:'constructionmanager',requirements:[{type:'skillMin',skill:'mechanical',value:60},{type:'skillMin',skill:'communication',value:50},{type:'notJailed'}]},
    constructionmanager:{name:'Construction Manager',track:'Construction',level:4,marketMin:90000,marketMax:155000,minAge:28,edu:'College',skill:'business',skillMin:62,next:'constructiondirector',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'business',value:62},{type:'notJailed'}]},
    constructiondirector:{name:'Construction Director',track:'Construction',level:5,marketMin:135000,marketMax:230000,minAge:35,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:78,next:null,requirements:[{type:'skillMin',skill:'business',value:78},{type:'reputationMin',value:68},{type:'notJailed'}]},

    marketingcoordinator:{name:'Marketing Coordinator',track:'Business',level:1,marketMin:45000,marketMax:75000,minAge:20,edu:'College',skill:'communication',skillMin:45,next:'marketingmanager',requirements:[{type:'educationMin',value:'College'},{type:'skillMin',skill:'communication',value:45},{type:'notJailed'}]},
    marketingmanager:{name:'Marketing Manager',track:'Business',level:3,marketMin:80000,marketMax:140000,minAge:27,edu:'College',skill:'business',skillMin:62,next:'marketingdirector',requirements:[{type:'skillMin',skill:'business',value:62},{type:'skillMin',skill:'communication',value:60},{type:'notJailed'}]},
    marketingdirector:{name:'Marketing Director',track:'Business',level:5,marketMin:130000,marketMax:230000,minAge:34,edu:'College',preferredEdu:'Graduate',skill:'business',skillMin:76,next:null,requirements:[{type:'skillMin',skill:'business',value:76},{type:'reputationMin',value:65},{type:'notJailed'}]}
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
  educationTracks: {
    'Trade School': {
      label:'Trade Program',
      options:{
        'Electrician':{skill:'mechanical',bonus:12,tags:['Trades','Automation']},
        'HVAC':{skill:'mechanical',bonus:10,tags:['Trades']},
        'Welding':{skill:'mechanical',bonus:10,tags:['Trades','Industrial']},
        'Automotive Technology':{skill:'mechanical',bonus:9,tags:['Trades']},
        'Industrial Maintenance':{skill:'mechanical',bonus:11,tags:['Industrial','Automation']}
      }
    },
    'College': { label:'Major', options:null },
    'Graduate School': {
      label:'Graduate Path',
      options:{
        'MBA':{skill:'business',bonus:12,tags:['Business','Operations','Finance','Executive']},
        'MS Computer Science':{skill:'technology',bonus:12,tags:['IT','Software','Technology']},
        'MS Engineering':{skill:'mechanical',bonus:12,tags:['Engineering','Automation']},
        'MEd':{skill:'communication',bonus:11,tags:['Education']},
        'MPA':{skill:'business',bonus:10,tags:['Government']},
        'PhD':{skill:'intelligence',bonus:10,tags:['Science','Education']},
        'MD':{skill:'intelligence',bonus:12,tags:['Healthcare']},
        'JD':{skill:'communication',bonus:10,tags:['Law','Government']}
      }
    }
  },
  hobbies: {
    drawing:{id:'drawing',label:'Drawing',ap:1,effects:{creativity:3,happiness:2},proficiency:'creativity',narrative:'I spent time drawing.'},
    gaming:{id:'gaming',label:'Gaming',ap:1,effects:{happiness:3,stress:-2},proficiency:'gaming',narrative:'I relaxed with video games.'},
    music:{id:'music',label:'Music',ap:1,effects:{creativity:3,happiness:2},proficiency:'music',narrative:'I practiced music.'},
    cooking:{id:'cooking',label:'Cooking',ap:1,effects:{health:1,happiness:2},proficiency:'cooking',narrative:'I practiced cooking.'},
    fishing:{id:'fishing',label:'Fishing',ap:1,effects:{stress:-4,happiness:2},proficiency:'fishing',narrative:'I went fishing.'},
    gardening:{id:'gardening',label:'Gardening',ap:1,effects:{stress:-3,health:1},proficiency:'gardening',narrative:'I worked in a garden.'},
    photography:{id:'photography',label:'Photography',ap:1,effects:{creativity:2,happiness:2},proficiency:'photography',narrative:'I practiced photography.'},
    writing:{id:'writing',label:'Writing',ap:1,effects:{creativity:2,communication:2},proficiency:'writing',narrative:'I spent time writing.'},
    cars:{id:'cars',label:'Cars',ap:1,effects:{mechanical:2,happiness:2},proficiency:'cars',narrative:'I worked on my automotive hobby.'},
    sports:{id:'sportsHobby',label:'Sports',ap:1,effects:{fitness:3,happiness:2},proficiency:'sports',narrative:'I played sports.'},
    volunteering:{id:'volunteering',label:'Volunteer',ap:1,effects:{karma:4,social:2,happiness:2},proficiency:'volunteering',narrative:'I volunteered in my community.'},
    meditation:{id:'meditation',label:'Meditation',ap:1,effects:{stress:-5,happiness:1},proficiency:'meditation',narrative:'I practiced meditation.'}
  },
  milestones: [
    {id:'firstJob',title:'💼 First Career',description:'Started your first paid career.',condition:'firstJob'},
    {id:'firstHome',title:'🏠 First Home',description:'Bought your first home.',condition:'firstHome'},
    {id:'married',title:'💒 Marriage',description:'Got married.',condition:'married'},
    {id:'parent',title:'👶 Became a Parent',description:'Welcomed your first child.',condition:'parent'},
    {id:'firstBusiness',title:'🚀 Entrepreneur',description:'Started your first business.',condition:'firstBusiness'},
    {id:'millionaire',title:'💰 Millionaire',description:'Reached $1,000,000 net worth.',condition:'millionaire'},
    {id:'tenMillion',title:'💎 $10 Million Net Worth',description:'Reached $10,000,000 net worth.',condition:'tenMillion'},
    {id:'retired',title:'🏖️ Retirement',description:'Retired from your career.',condition:'retired'},
    {id:'executive',title:'🏢 Executive Career',description:'Reached an executive-level role.',condition:'executive'}
  ],
  housing: {
    parents:{name:'Living with Parents',price:0,annual:0,minAge:0,owned:false,kind:'family',utilitiesAnnual:0},
    roommates:{name:'Roommates',price:0,annual:9000,minAge:18,owned:false,kind:'rent',utilitiesAnnual:1300},
    studio:{name:'Studio Apartment',price:0,annual:12000,minAge:18,owned:false,kind:'rent',utilitiesAnnual:1800},
    apartment:{name:'Apartment',price:0,annual:16000,minAge:18,owned:false,kind:'rent',utilitiesAnnual:2200},
    townhouse:{name:'Townhouse',price:190000,annual:0,minAge:18,owned:true,kind:'owned',propertyTaxRate:0.011,maintenanceRate:0.009,insuranceRate:0.004,hoaAnnual:2200,utilitiesAnnual:2600},
    condo:{name:'Condo',price:240000,annual:0,minAge:18,owned:true,kind:'owned',propertyTaxRate:0.011,maintenanceRate:0.008,insuranceRate:0.004,hoaAnnual:3600,utilitiesAnnual:2400},
    starter:{name:'Starter Home',price:280000,annual:0,minAge:18,owned:true,kind:'owned',propertyTaxRate:0.012,maintenanceRate:0.011,insuranceRate:0.0045,hoaAnnual:0,utilitiesAnnual:3000},
    house:{name:'Suburban Home',price:450000,annual:0,minAge:21,owned:true,kind:'owned',propertyTaxRate:0.012,maintenanceRate:0.012,insuranceRate:0.0045,hoaAnnual:0,utilitiesAnnual:3600},
    largehouse:{name:'Large Home',price:750000,annual:0,minAge:24,owned:true,kind:'owned',propertyTaxRate:0.013,maintenanceRate:0.014,insuranceRate:0.0048,hoaAnnual:0,utilitiesAnnual:5000},
    luxury:{name:'Luxury House',price:1500000,annual:0,minAge:25,owned:true,kind:'owned',propertyTaxRate:0.014,maintenanceRate:0.016,insuranceRate:0.005,hoaAnnual:0,utilitiesAnnual:8000},
    mansion:{name:'Mansion',price:4000000,annual:0,minAge:30,owned:true,kind:'owned',propertyTaxRate:0.015,maintenanceRate:0.02,insuranceRate:0.006,hoaAnnual:0,utilitiesAnnual:18000}
  },
  lifestyles: {
    Frugal:{personalAnnual:6000,parentFactor:0.65,happiness:-2,stress:1},
    Modest:{personalAnnual:12000,parentFactor:1.0,happiness:0,stress:0},
    Comfortable:{personalAnnual:22000,parentFactor:1.4,happiness:1,stress:-1},
    Wealthy:{personalAnnual:50000,parentFactor:2.2,happiness:2,stress:-1},
    Luxurious:{personalAnnual:120000,parentFactor:4.0,happiness:3,stress:-2}
  },
  inventoryCatalog: {
    phone:{name:'Smartphone',price:900,type:'Tech',conditionLoss:8,annualCost:0},
    laptop:{name:'Laptop',price:1800,type:'Tech',conditionLoss:6,annualCost:0},
    oldcar:{name:'Old Economy Car',price:4500,type:'Vehicle',conditionLoss:14,annualCost:2200},
    usedcar:{name:'Reliable Used Car',price:12000,type:'Vehicle',conditionLoss:11,annualCost:3000},
    newcar:{name:'New Sedan',price:35000,type:'Vehicle',conditionLoss:8,annualCost:4500},
    suv:{name:'SUV',price:52000,type:'Vehicle',conditionLoss:8,annualCost:5600},
    truck:{name:'Pickup Truck',price:62000,type:'Vehicle',conditionLoss:9,annualCost:6200},
    sportscar:{name:'Sports Car',price:90000,type:'Vehicle',conditionLoss:8,annualCost:8500},
    luxurycar:{name:'Luxury Car',price:125000,type:'Vehicle',conditionLoss:7,annualCost:10500},
    supercar:{name:'Supercar',price:350000,type:'Vehicle',conditionLoss:10,annualCost:24000},
    watch:{name:'Luxury Watch',price:8000,type:'Collectible',conditionLoss:2,annualCost:0}
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
    {id:'friend',category:'Childhood',minAge:5,maxAge:17,weight:6,title:'A New Friend',text:'A classmate asks if you want to hang out after school.',choices:[
      {label:'Hang out',effect:{social:5,happiness:4},spawnFriend:true,result:'You made a new friend.'},
      {label:'Study instead',effect:{intelligence:4,stress:2},result:'You focused on school.'}
    ]},
    {id:'bully',category:'School',minAge:7,maxAge:16,weight:4,title:'School Trouble',text:'Another student keeps bothering you.',choices:[
      {label:'Tell an adult',effect:{karma:3,stress:-3},result:'The situation improved.'},
      {label:'Stand up for yourself',effect:{fitness:2,stress:2},result:'You stood your ground.'},
      {label:'Ignore it',effect:{happiness:-4,stress:5},delayed:{years:2,text:'The old bullying experience still bothers you.',effect:{stress:3,happiness:-2}},result:'You tried to ignore it.'}
    ]},
    {id:'scholarship',category:'Education',minAge:16,maxAge:18,weight:3,requirements:[{type:'valueMin',path:'gpa',value:3.1}],title:'Scholarship Opportunity',text:'A local foundation offers you a scholarship interview.',choices:[
      {label:'Apply',chance:'scholarship',success:{scholarship:8000,happiness:5},failure:{stress:2},result:'You submitted the application.'},
      {label:'Skip it',effect:{stress:-1},result:'You passed on the opportunity.'}
    ]},
    {id:'jobOffer',category:'Career',minAge:19,maxAge:65,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Recruiter Call',text:'A recruiter says another employer may pay more.',choices:[
      {label:'Interview',chance:'jobOffer',success:{salaryPct:0.10,happiness:4},failure:{stress:2},result:'You tested the market.'},
      {label:'Stay loyal',effect:{performance:4},result:'You stayed where you are.'}
    ]},
    {id:'recession',category:'Financial',minAge:18,maxAge:75,weight:2,requirements:[{type:'truthy',path:'job'},{type:'valueEquals',path:'economy.state',value:'Recession'}],title:'Economic Slowdown',text:'The economy is weak and your employer is cutting costs.',choices:[
      {label:'Work extra hard',effect:{performance:8,stress:6},result:'You tried to make yourself indispensable.'},
      {label:'Build savings',effect:{business:2,stress:2},result:'You focused on protecting your finances.'}
    ]},
    {id:'familyAsk',category:'Family',minAge:20,maxAge:70,weight:3,requirements:[{type:'metricTruthy',metric:'familyAlive'}],title:'Family Needs Help',text:'A family member asks you for financial help.',choices:[
      {label:'Give $1,000',cost:1000,effect:{karma:7,happiness:2},familyQuality:6,result:'You helped them out.'},
      {label:'Say no',effect:{stress:-1},familyQuality:-5,result:'You declined.'}
    ]},
    {id:'healthWakeup',category:'Health',minAge:30,maxAge:95,weight:4,title:'Health Wake-Up Call',text:'A routine checkup suggests you should take better care of yourself.',choices:[
      {label:'Commit to healthier habits',effect:{health:6,fitness:4,stress:2},result:'You made healthier choices.'},
      {label:'Ignore it',effect:{health:-5,happiness:1},result:'You changed nothing.'}
    ]},
    {id:'wallet',category:'Random Life',minAge:8,maxAge:90,weight:2,title:'Found Wallet',text:'You find a wallet with cash inside.',choices:[
      {label:'Return it',effect:{karma:8,happiness:2,cash:40},result:'The owner rewarded your honesty.'},
      {label:'Keep it',effect:{karma:-10,cash:120,stress:2},result:'You kept the cash.'}
    ]},
    {id:'childTalent',category:'Family',minAge:25,maxAge:75,weight:3,requirements:[{type:'metricTruthy',metric:'hasLivingChild'}],title:'A Child Shows Promise',text:'One of your children is showing a real talent.',choices:[
      {label:'Invest in lessons',cost:1500,effect:{happiness:4},childBoost:8,result:'You supported their development.'},
      {label:'Encourage them yourself',effect:{communication:3},childBoost:4,result:'You became their biggest supporter.'}
    ]},
    {id:'temptation',category:'Relationship',minAge:18,maxAge:80,weight:2,requirements:[{type:'hasPartner'}],title:'Unexpected Attraction',text:'Someone new is showing strong interest in you even though you are in a relationship.',choices:[
      {label:'Stay loyal',effect:{karma:5,stress:1},partnerQuality:4,result:'You protected your relationship.'},
      {label:'Cheat',effect:{karma:-15,happiness:3,stress:7},partnerQuality:-22,delayed:{years:1,text:'The secret from your affair resurfaces.',effect:{stress:8,happiness:-6}},result:'You crossed a line that may come back later.'}
    ]},
    {id:'careerProject',category:'Career',minAge:18,maxAge:70,weight:5,requirements:[{type:'truthy',path:'job'}],title:'High-Visibility Project',text:'Your manager gives you responsibility for a project that could affect your reputation.',choices:[
      {label:'Take ownership',effect:{performance:6,careerReputation:4,stress:5},result:'You stepped up and led the work.'},
      {label:'Play it safe',effect:{performance:2,stress:1},result:'You delivered cautiously.'}
    ]},
    {id:'careerConflict',category:'Career',minAge:20,maxAge:70,weight:4,requirements:[{type:'truthy',path:'job'}],title:'Manager Conflict',text:'You strongly disagree with a decision from your manager.',choices:[
      {label:'Discuss it professionally',effect:{communication:3,careerReputation:2,bossQuality:3},result:'You handled the disagreement professionally.'},
      {label:'Challenge them publicly',effect:{careerReputation:-3,bossQuality:-8,stress:5},result:'The disagreement became public.'}
    ]},
    {id:'performanceAward',category:'Career',minAge:21,maxAge:70,weight:3,requirements:[{type:'valueMin',path:'performance',value:82}],title:'Performance Recognition',text:'Leadership recognizes your recent performance.',choices:[
      {label:'Accept the recognition',effect:{careerReputation:5,happiness:4,cash:2500},result:'You received recognition and a bonus.'}
    ]},
    {id:'homeRepair',category:'Housing',minAge:21,maxAge:90,weight:3,requirements:[{type:'metricTruthy',metric:'homeOwned'}],title:'Unexpected Home Repair',text:'Your home needs an unexpected repair.',choices:[
      {label:'Fix it properly',cost:2800,effect:{stress:-1},result:'You paid for a proper repair.'},
      {label:'Patch it cheaply',cost:700,effect:{stress:3},delayed:{years:2,text:'The old home repair problem returned.',effect:{cash:-1800,stress:3}},result:'You used a temporary fix.'}
    ]},
    {id:'carRepair',category:'Financial',minAge:18,maxAge:90,weight:3,requirements:[{type:'metricTruthy',metric:'hasVehicle'}],title:'Vehicle Repair',text:'One of your vehicles needs maintenance sooner than expected.',choices:[
      {label:'Repair it',cost:1200,effect:{stress:-1},result:'You handled the repair.'},
      {label:'Put it off',effect:{stress:2},result:'You postponed the repair.'}
    ]},
    {id:'friendLoan',category:'Social',minAge:20,maxAge:80,weight:3,requirements:[{type:'metricTruthy',metric:'hasFriend'}],title:'A Friend Needs Help',text:'A close friend asks to borrow money.',choices:[
      {label:'Lend $2,000',cost:2000,effect:{karma:4,happiness:1},result:'You helped your friend.'},
      {label:'Decline',effect:{stress:-1},result:'You decided not to mix friendship and money.'}
    ]},
    {id:'collegeInternship',category:'Education',minAge:18,maxAge:30,weight:4,requirements:[{type:'valueEquals',path:'program',value:'College'}],title:'Internship Opportunity',text:'A professor recommends you for a competitive internship.',choices:[
      {label:'Apply',effect:{careerReputation:4,technology:2,business:2,stress:3},result:'You completed an internship that strengthened your résumé.'},
      {label:'Focus on classes',effect:{intelligence:3,stress:-1},result:'You stayed focused on school.'}
    ]},
    {id:'childSchool',category:'Family',minAge:25,maxAge:70,weight:4,requirements:[{type:'metricTruthy',metric:'hasMinorChild'}],title:'School Meeting',text:'One of your children is struggling at school and needs support.',choices:[
      {label:'Get involved',effect:{happiness:2,stress:3},childBoost:6,result:'You became more involved in their education.'},
      {label:'Give them space',effect:{stress:-1},childBoost:1,result:'You encouraged them to handle it independently.'}
    ]},
    {id:'hobbyOpportunity',category:'Hobby',minAge:16,maxAge:90,weight:2,requirements:[{type:'metricTruthy',metric:'skilledHobby'}],title:'Hobby Opportunity',text:'Your hobby skills attract attention from other people.',choices:[
      {label:'Share your work',effect:{communication:2,happiness:3,cash:500},result:'Your hobby earned a little money and recognition.'},
      {label:'Keep it personal',effect:{stress:-2,happiness:2},result:'You kept the hobby for yourself.'}
    ]},
    {id:'laterLifeMentor',category:'Career',minAge:50,maxAge:75,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Mentorship Opportunity',text:'A younger coworker asks you to mentor them.',choices:[
      {label:'Mentor them',effect:{communication:3,careerReputation:4,happiness:3},result:'You became a mentor.'},
      {label:'Decline',effect:{stress:-2},result:'You protected your time.'}
    ]},
    {id:'schoolTeam',category:'School',minAge:8,maxAge:17,weight:3,title:'School Activity',text:'You have a chance to join an after-school activity with classmates.',choices:[
      {label:'Join in',effect:{social:3,happiness:2,stress:1},result:'You became more involved at school.'},
      {label:'Go home',effect:{stress:-2},result:'You chose a quiet afternoon.'}
    ]},
    {id:'examPressure',category:'School',minAge:14,maxAge:18,weight:3,title:'Big Exam',text:'An important exam is approaching and the pressure is building.',choices:[
      {label:'Study hard',effect:{intelligence:3,stress:4},result:'You prepared seriously for the exam.'},
      {label:'Take it easy',effect:{stress:-2,happiness:1},result:'You avoided burning yourself out.'}
    ]},
    {id:'collegeFriend',category:'Education',minAge:18,maxAge:30,weight:3,requirements:[{type:'truthy',path:'program'}],title:'New Classmate',text:'You connect with someone in one of your classes.',choices:[
      {label:'Become friends',effect:{social:3,happiness:2},spawnFriend:true,result:'You made a new friend through school.'},
      {label:'Keep it academic',effect:{intelligence:2},result:'You kept your focus on class.'}
    ]},
    {id:'careerRecruiter',category:'Career',minAge:24,maxAge:65,weight:3,requirements:[{type:'truthy',path:'job'},{type:'reputationMin',value:55}],title:'Recruiter Call',text:'A recruiter reaches out after hearing about your professional work.',choices:[
      {label:'Hear them out',effect:{careerReputation:2,communication:2},result:'You expanded your professional network.'},
      {label:'Stay focused',effect:{performance:2},result:'You stayed focused on your current role.'}
    ]},
    {id:'careerDeadline',category:'Career',minAge:20,maxAge:70,weight:4,requirements:[{type:'truthy',path:'job'}],title:'Impossible Deadline',text:'Leadership asks your team to deliver something on a very aggressive schedule.',choices:[
      {label:'Push through',effect:{performance:5,stress:7,careerReputation:2},result:'You pushed the project across the finish line.'},
      {label:'Push back',effect:{communication:3,bossQuality:-2,stress:-1},result:'You argued for a more realistic schedule.'}
    ]},
    {id:'bonusChoice',category:'Financial',minAge:21,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Unexpected Bonus',text:'Your employer gives you a surprise performance bonus.',choices:[
      {label:'Take the cash',effect:{cash:3500,happiness:2},result:'You pocketed the bonus.'}
    ]},
    {id:'rentIncrease',category:'Housing',minAge:18,maxAge:80,weight:3,requirements:[{type:'valueEquals',path:'housing',value:'apartment'}],title:'Rent Increase',text:'Your landlord announces a rent increase next year.',choices:[
      {label:'Accept it',effect:{stress:2},result:'You decided to stay for now.'},
      {label:'Plan to move',effect:{stress:-1},result:'You started thinking about a move.'}
    ]},
    {id:'neighborIssue',category:'Housing',minAge:18,maxAge:85,weight:2,requirements:[{type:'metricTruthy',metric:'homeOwned'}],title:'Neighbor Dispute',text:'A disagreement with a neighbor starts becoming stressful.',choices:[
      {label:'Talk it out',effect:{communication:3,stress:-2},result:'A calm conversation helped.'},
      {label:'Ignore it',effect:{stress:2},result:'The tension lingered.'}
    ]},
    {id:'fitnessWarning',category:'Health',minAge:35,maxAge:85,weight:3,requirements:[{type:'valueMax',path:'fitness',value:45}],title:'Health Check',text:'A routine checkup suggests you should become more active.',choices:[
      {label:'Take it seriously',effect:{fitness:4,health:2,stress:1},result:'You committed to being more active.'},
      {label:'Brush it off',effect:{stress:-1},result:'You ignored the advice for now.'}
    ]},
    {id:'familyVisit',category:'Family',minAge:18,maxAge:90,weight:3,requirements:[{type:'metricTruthy',metric:'familyAlive'}],title:'Family Gathering',text:'Your family plans a get-together.',choices:[
      {label:'Go',familyQuality:5,effect:{happiness:3,stress:-1},result:'You spent meaningful time together.'},
      {label:'Skip it',effect:{stress:-2},result:'You stayed home instead.'}
    ]},
    {id:'relationshipTrip',category:'Relationship',minAge:20,maxAge:75,weight:3,requirements:[{type:'hasPartner'}],title:'Weekend Away',text:'Your partner suggests a short trip together.',choices:[
      {label:'Go together',cost:1800,partnerQuality:7,effect:{happiness:4,stress:-3},result:'The trip brought you closer.'},
      {label:'Save the money',partnerQuality:-2,effect:{stress:-1},result:'You decided to stay home.'}
    ]},
    {id:'friendCelebration',category:'Social',minAge:18,maxAge:85,weight:2,requirements:[{type:'metricTruthy',metric:'hasFriend'}],title:'Friend Celebration',text:'A friend invites you to celebrate an important moment in their life.',choices:[
      {label:'Attend',cost:250,effect:{social:3,happiness:3},result:'You showed up for your friend.'},
      {label:'Pass',effect:{stress:-1},result:'You declined the invitation.'}
    ]},
    {id:'crimeTemptation',category:'Crime',minAge:16,maxAge:55,weight:1,title:'Bad Opportunity',text:'Someone you barely know offers you easy money for something clearly questionable.',choices:[
      {label:'Walk away',effect:{karma:3,stress:-1},result:'You stayed out of trouble.'},
      {label:'Hear them out',effect:{karma:-4,stress:2},result:'You entertained a bad idea but did not act on it.'}
    ]},
    {id:'randomWindfall',category:'Random Life',minAge:18,maxAge:90,weight:2,title:'Small Windfall',text:'An unexpected refund puts some money back in your pocket.',choices:[
      {label:'Nice',effect:{cash:1200,happiness:2},result:'You enjoyed the unexpected money.'}
    ]},
    {id:'retirementCommunity',category:'Later Life',minAge:60,maxAge:95,weight:3,requirements:[{type:'truthy',path:'retired'}],title:'A New Routine',text:'Retirement gives you time to build a new weekly routine.',choices:[
      {label:'Stay active',effect:{fitness:3,happiness:3,stress:-2},result:'You built a more active retirement routine.'},
      {label:'Slow down',effect:{stress:-4,happiness:1},result:'You enjoyed a quieter pace.'}
    ]},
    {id:'techOutage',category:'Career',careerTracks:['IT','Software','Technology','Automation'],minAge:20,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Critical System Outage',text:'A major technical system fails during an important part of the day.',choices:[
      {label:'Lead the troubleshooting',effect:{technology:3,performance:5,careerReputation:3,stress:5},result:'You helped restore the system under pressure.'},
      {label:'Escalate quickly',effect:{communication:2,performance:2,stress:2},result:'You coordinated the right people and kept everyone informed.'}
    ]},
    {id:'industrialBreakdown',category:'Career',careerTracks:['Industrial','Trades','Construction'],minAge:20,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Equipment Breakdown',text:'A critical piece of equipment goes down unexpectedly.',choices:[
      {label:'Diagnose it',effect:{mechanical:3,performance:5,careerReputation:2,stress:4},result:'You helped get the equipment back online.'},
      {label:'Coordinate repairs',effect:{communication:3,performance:3},result:'You organized a safe repair response.'}
    ]},
    {id:'healthcareEmergency',category:'Career',careerTracks:['Healthcare'],minAge:20,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Difficult Shift',text:'Your team faces an unusually demanding situation with multiple patients needing attention.',choices:[
      {label:'Stay focused',effect:{communication:3,performance:5,careerReputation:3,stress:6},result:'You stayed composed during a difficult shift.'},
      {label:'Ask for support',effect:{communication:2,stress:2,performance:2},result:'You worked with the team to manage the workload.'}
    ]},
    {id:'legalCase',category:'Career',careerTracks:['Law','Government'],minAge:22,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'High-Stakes Case',text:'A difficult case puts your judgment and communication under scrutiny.',choices:[
      {label:'Prepare thoroughly',effect:{communication:3,intelligence:2,performance:5,careerReputation:3,stress:5},result:'Your preparation paid off.'},
      {label:'Take the safe route',effect:{performance:2,stress:1},result:'You handled the case conservatively.'}
    ]},
    {id:'salesPitch',category:'Career',careerTracks:['Sales','Business','Finance'],minAge:20,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Important Client Meeting',text:'You get a chance to influence an important client or stakeholder.',choices:[
      {label:'Lead the pitch',effect:{communication:3,business:2,performance:5,careerReputation:3,stress:3},result:'You made a strong impression.'},
      {label:'Support the team',effect:{communication:2,performance:2},result:'You helped the team deliver a solid presentation.'}
    ]},
    {id:'creativeDeadline',category:'Career',careerTracks:['Creative'],minAge:20,maxAge:70,weight:3,requirements:[{type:'truthy',path:'job'}],title:'Creative Review',text:'A major piece of creative work is being reviewed by leadership.',choices:[
      {label:'Defend the idea',effect:{creativity:3,communication:3,careerReputation:3,stress:4},result:'You confidently defended your creative direction.'},
      {label:'Revise it',effect:{creativity:2,performance:3,stress:2},result:'You incorporated the feedback and improved the work.'}
    ]},
    {id:'businessBreak',category:'Business',minAge:18,maxAge:80,weight:3,requirements:[{type:'truthy',path:'business'}],title:'Business Opportunity',text:'A larger client offers your business a risky contract.',choices:[
      {label:'Take the deal',chance:'businessDeal',success:{businessCash:15000,businessRep:8},failure:{businessCash:-8000,businessRep:-6,stress:7},result:'You took the risk.'},
      {label:'Decline',effect:{stress:-2},result:'You protected the company from the risk.'}
    ]}
  ]
};
