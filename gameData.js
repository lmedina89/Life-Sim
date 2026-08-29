window.GAME_DATA = {
  jobs: {
    fastfood:{name:'Fast Food Worker',salary:22000,minAge:16,edu:'None',intel:0,social:0},
    retail:{name:'Retail Associate',salary:28000,minAge:16,edu:'None',intel:0,social:35},
    warehouse:{name:'Warehouse Technician',salary:39000,minAge:18,edu:'High School',intel:35,social:0},
    electrician:{name:'Electrician',salary:65000,minAge:18,edu:'Trade School',intel:45,social:0},
    it:{name:'IT Support Specialist',salary:56000,minAge:18,edu:'High School',intel:55,social:35},
    sysadmin:{name:'Systems Administrator',salary:82000,minAge:20,edu:'College',intel:65,social:30},
    engineer:{name:'Automation Engineer',salary:96000,minAge:21,edu:'College',intel:72,social:25},
    manager:{name:'Operations Manager',salary:105000,minAge:24,edu:'College',intel:60,social:70},
    doctor:{name:'Physician',salary:215000,minAge:26,edu:'Graduate',intel:85,social:45}
  },
  eduRank: {'None':0,'High School':1,'Trade School':2,'College':3,'Graduate':4},
  assets: {
    usedcar:{name:'Used Car',price:8000,value:6000,type:'cash',minAge:16,annual:1200},
    newcar:{name:'New Car',price:35000,value:28000,type:'finance',minAge:18,annual:2800},
    condo:{name:'Condo',price:120000,value:120000,type:'mortgage',minAge:18,annual:5000},
    house:{name:'House',price:280000,value:280000,type:'mortgage',minAge:18,annual:9000}
  },
  names: {
    adults:['Alex','Jordan','Taylor','Morgan','Casey','Riley','Cameron','Avery','Parker','Drew'],
    children:['Noah','Liam','Mia','Emma','Lucas','Ava','Ethan','Sofia','Mason','Zoe']
  },
  events: [
    {id:'school_friend',minAge:5,maxAge:12,weight:5,title:'A New Friend',text:'A classmate asks if you want to hang out after school.',choices:[
      {label:'Go hang out',effect:{social:5,happiness:4,stress:-2},result:'You had a great time and became closer friends.'},
      {label:'Stay home and study',effect:{intelligence:4,social:-2,stress:2},result:'You skipped the hangout and focused on school.'}
    ]},
    {id:'bully',minAge:7,maxAge:16,weight:3,title:'School Trouble',text:'Another student keeps bothering you at school.',choices:[
      {label:'Tell an adult',effect:{karma:3,stress:-3,social:1},result:'An adult stepped in and the situation improved.'},
      {label:'Stand up for yourself',effect:{fitness:2,stress:2,karma:-1},result:'You confronted the student. It was stressful, but they backed off.'},
      {label:'Ignore it',effect:{happiness:-4,stress:5},result:'You tried to ignore it, but it still bothered you.'}
    ]},
    {id:'found_money',minAge:8,maxAge:90,weight:2,title:'Found Money',text:'You find a wallet with $100 inside.',choices:[
      {label:'Return it',effect:{karma:8,happiness:3,cash:20},result:'The owner thanked you and gave you a $20 reward.'},
      {label:'Keep the cash',effect:{karma:-10,cash:100,stress:2},result:'You kept the money and hoped nobody noticed.'}
    ]},
    {id:'school_club',minAge:10,maxAge:17,weight:4,title:'Join a Club?',text:'Your school is recruiting for after-school clubs.',choices:[
      {label:'Technology club',effect:{intelligence:5,social:2,stress:2},result:'You joined the technology club.'},
      {label:'Sports team',effect:{fitness:5,health:2,social:2},result:'You joined a sports team.'},
      {label:'Skip it',effect:{happiness:1},result:'You kept your afternoons free.'}
    ]},
    {id:'teen_party',minAge:14,maxAge:20,weight:3,title:'Party Invitation',text:'You get invited to a big party.',choices:[
      {label:'Go',effect:{social:5,happiness:4,stress:-2},result:'You went out and had fun.'},
      {label:'Study instead',effect:{intelligence:4,stress:2,happiness:-1},result:'You stayed home and studied.'}
    ]},
    {id:'adult_bonus',minAge:18,maxAge:65,requiresJob:true,weight:2,title:'Recognition at Work',text:'Your supervisor praises your recent work.',choices:[
      {label:'Ask for more responsibility',effect:{performance:6,stress:4,happiness:2},result:'You took on more responsibility.'},
      {label:'Enjoy the compliment',effect:{happiness:4,stress:-2},result:'You enjoyed the recognition without adding more work.'}
    ]},
    {id:'family_argument',minAge:6,maxAge:80,requiresFamily:true,weight:3,title:'Family Argument',text:'Tension flares during a family disagreement.',choices:[
      {label:'Try to calm everyone down',effect:{social:3,karma:2,stress:2,familyQuality:4},result:'You helped cool things down.'},
      {label:'Stay out of it',effect:{stress:-1,familyQuality:-2},result:'You avoided getting involved.'},
      {label:'Take a side',effect:{happiness:-2,stress:4,familyQuality:-5},result:'The argument got more personal.'}
    ]},
    {id:'health_choice',minAge:30,maxAge:90,weight:2,title:'Health Warning',text:'A routine checkup suggests you should take better care of yourself.',choices:[
      {label:'Make healthier choices',effect:{health:6,fitness:4,stress:2},result:'You made health a priority.'},
      {label:'Ignore it',effect:{health:-5,happiness:1},result:'You decided not to change anything.'}
    ]}
  ]
};
