// How to run this script:
// mongo localhost:27017/test user_mongoldb.js

var now = new Date();
var yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

collection = db.User;

// Clean Collection
collection.drop();

// Add Data to Collection
collection.insert({
	"username" : "admin",
	"password" : "cornb4roastbeef"
});
