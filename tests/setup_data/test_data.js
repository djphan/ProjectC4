//////////          Information         ////////////////////////////////////////
//  How to run this script:
//    mongo test_data.js

//////////           Variables          ////////////////////////////////////////
var now = new Date();
var yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

//////////            Schools           ////////////////////////////////////////
db.schools.drop();

//  Data
db.schools.insert({
  name: "University of Alberta",
  created: now
});

//////////             Users            ////////////////////////////////////////
db.users.drop();

// Data
db.users.insert({
  username: "earthiverse",
  name: "Kent Rasmussen",
  admin: 1,
  password: "cornb4potatoes",
  school: db.schools.findOne({"name": "University of Alberta"})._id,
  created: now,
  accounts: {league: {id: 49241367, name: "earthiverse", level: 5}}
});
db.users.insert({
  username: "gnarlywhale",
  name: "Riley Dawson",
  admin: 1,
  password: "cornb4potatoes",
  school: db.schools.findOne({"name": "University of Alberta"})._id,
  created: now,
  accounts: {league: {id: 59798605, name: "GnarlyWhale", level: 5}}
});
db.users.insert({
  username: "dtmaster",
  name: "Daniel Phan",
  admin: 1,
  password: "cornb4potatoes",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {league: {id: 36343182, name: "lolkats91", level: 11}}
});
db.users.insert({
  username: "tianzwang",
  name: "Tian Wang",
  admin: 1,
  password: "cornb4potatoes",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {league: {id: 25716348, name: "Purpleful", level: 30}}
});
db.users.insert({
  username: "supersheep",
  name: "Aeden Burnett",
  admin: 1,
  password: "cornb4potatoes",
  school: db.schools.findOne({"name":"University of Alberta"})._id,
  created: now,
  accounts: {league: {id: 69260305, name: "teemo420yoloswag", level: 2}}
});

//////////             Teams            ////////////////////////////////////////
db.teams.drop();

// Data
db.teams.insert({
  school: db.schools.findOne({name:"University of Alberta"})._id,
  managers: [
    db.users.findOne({username: "earthiverse"})._id
  ],
  members: [
    db.users.findOne({username: "earthiverse"})._id,
    db.users.findOne({username: "gnarlywhale"})._id,
    db.users.findOne({username: "dtmaster"})._id
  ],
  name: "Bears",
  game: "league",
  league: 1,
  created: now
});
db.teams.insert({
  school: db.schools.findOne({name:"University of Alberta"})._id,
  members: [
  ],
  name: "Cubs",
  game: "league",
  league: 2,
  created: now
});

// Enforce uniqueness on {school, team name}
// TODO: Move this to a separate test, or something for setup.
db.teams.createIndex({school: 1, name: 1}, {unique: true});

//////////         League Games         ////////////////////////////////////////
db.games.drop();

// Data
db.games.insert({
  game: "league",
  players: [{
    team: db.teams.findOne({"name": "Bears", "school": db.schools.findOne({name:"University of Alberta"})._id})._id,
    players: [
      db.users.findOne({username: "earthiverse"})._id,
      db.users.findOne({username: "gnarlywhale"})._id,
      db.users.findOne({username: "dtmaster"})._id,
      db.users.findOne({username: "tianzwang"})._id,
      db.users.findOne({username: "supersheep"})._id
    ]
  }],
  fetched: now
});
