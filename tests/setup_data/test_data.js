//////////          Information         ////////////////////////////////////////
//  How to run this script:
//    mongo test_data.js

//////////           Variables          ////////////////////////////////////////
var now = new Date();
var yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

//////////            Games             ////////////////////////////////////////
db.games.drop();

//////////             News             ////////////////////////////////////////
db.news.drop();

// Data
db.news.insert({
  "author" : "earthiverse",
  "title" : "Sample News Article #1",
  "icon" : "images/icons/c4.png",
  "updated" : now,
  "created" : now,
  "content" : "This is a sample news article. If you can see this, congratulations!"
});

//////////            Schools           ////////////////////////////////////////
db.schools.drop();

//  Data
db.schools.insert({
  "name": "University of Alberta",
  "created": now,
  "updated": now
});

//////////             Users            ////////////////////////////////////////
db.users.drop();

// Data
db.users.insert({
  username: "fjackson",
  university_email: "fjackson@ualberta.ca",
  display_name: "Frances Jackson",
  admin: true,
  password: "$2a$04$pk.qlDLEErjCgSZSbXY0jekaMXgubSDj1HdaGVOkOE8aR68zUlHSa",
  school: db.schools.findOne({"name": "University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 49241367, name: "earthiverse", level: 5}}
});
db.users.insert({
  username: "dstewart",
  university_email: "dstewart@ualberta.ca",
  display_name: "Daniel Stewart",
  admin: true,
  password: "$2a$04$yB2k1y0j1fCUqVblLSeJ/uMaoVkRfVV8KFmd9xTiBI/RZwc9fC6L2",
  school: db.schools.findOne({"name": "University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 59798605, name: "GnarlyWhale", level: 5}}
});
db.users.insert({
  username: "jwatson",
  university_email: "jwatson@ualberta.ca",
  display_name: "Justin Watson",
  password: "$2a$04$UkWQ8GOov8.xvsrKhURaau3SL/JyKrcjVf.IZYEbIlhM9NCshoj8q",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 36343182, name: "lolkats91", level: 11}}
});
db.users.insert({
  username: "twilliams",
  university_email: "twilliams@ualberta.ca",
  display_name: "Tammy Williams",
  password: "$2a$04$O/nTZaBcT.HBisrZADtoFuTk7SwcB5n8kcuJfLzQ.xR7TENs86rIW",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 25716348, name: "Purpleful", level: 30}}
});
db.users.insert({
  username: "asanchez",
  university_email: "asanchez@ualberta.ca",
  display_name: "Anna Sanchez",
  password: "$2a$04$8M7cg18qs0kv.ywKyCr7NeaipCxljb4wXyQcUCSPm/EA3AKcabBpq",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 69260305, name: "teemo420yoloswag", level: 2}}
});
db.users.insert({
  username: "ewhite",
  university_email: "ewhite@ualberta.ca",
  display_name: "Eric White",
  password: "$2a$04$IxigMIyx0vrc5gFBAZtkxuE1Dv6AiAfgkbobsXFdH8xG.sJaEvnW2",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 39077042, name: "Victim Of Talent", level: 30}}
});
db.users.insert({
  username: "cross",
  university_email: "cross@ualberta.ca",
  display_name: "Craig Ross",
  password: "$2a$04$ajl1rNMQ3U91ViZGLDrHIemhNxYF31f0NitgZ3Vvcvwf4ubekEt4K",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 19229802, name: "Volgra24", level: 30}}
});
db.users.insert({
  username: "sparker",
  name: "Sharon Parker",
  password: "$2a$04$QofpG6qPowv3TBva1CEau.MdsYGejh65xfqD4b/k3KScRutMvO0T.",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {"lol": {id: 34801024, name: "Kader9977", level: 30}}
});

//////////             Teams            ////////////////////////////////////////
db.teams.drop();

// Data
db.teams.insert({
  school: db.schools.findOne({name:"University of Alberta"})._id,
  managers: [
    db.users.findOne({username: "fjackson"})._id
  ],
  members: [
    db.users.findOne({username: "fjackson"})._id,
    db.users.findOne({username: "dstewart"})._id,
    db.users.findOne({username: "jwatson"})._id,
    db.users.findOne({username: "twilliams"})._id,
    db.users.findOne({username: "asanchez"})._id
  ],
  applicants: [
    db.users.findOne({username: "ewhite"})._id
  ],
  name: "Bears",
  game: "lol",
  division: 1,
  created: now
});
db.teams.insert({
  school: db.schools.findOne({name:"University of Alberta"})._id,
  managers: [

  ],
  members: [
    
  ],
  name: "Cubs",
  game: "lol",
  division: 2,
  created: now
});

// Enforce uniqueness on {school, team name}
// TODO: Move this to a separate test, or something for setup.
db.teams.createIndex({school: 1, name: 1}, {unique: true});

//////////           Matches            ////////////////////////////////////////
db.matches.drop();

// Data
db.matches.insert({
  game: "lol",
  players: [{
    team: db.teams.findOne({"name": "Bears", "school": db.schools.findOne({name:"University of Alberta"})._id})._id,
    players: [
      db.users.findOne({username: "fjackson"})._id,
      db.users.findOne({username: "dstewart"})._id,
      db.users.findOne({username: "jwatson"})._id,
      db.users.findOne({username: "twilliams"})._id,
      db.users.findOne({username: "asanchez"})._id
    ]
  }],
  fetched: now
});
