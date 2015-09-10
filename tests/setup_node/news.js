// How to run this script:
// mongo localhost:27017/test news.js

var now = new Date();
var yesterday = new Date();
yesterday.setDate(now.getDate() - 1);

collection = db.news;

// Clean Collection
collection.drop();

// Add Data to Collection
collection.insert({
	"author" : "earthiverse",
	"title" : "This is a title",
	"lastUpdate" : now,
	"created" : now,
	"icon" : "images/icons/c4.png",
	"content" : "This is some fake content for a news article. I would put gibberish, but I'd rather type gibberish instead.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah.\nblah."
});
collection.insert({
	"author" :	"gnarlywhale",
	"title" : "I'm a butt",
	"lastUpdate" : yesterday,
	"created" : yesterday,
	"icon" : "images/icons/c4.png",
	"content" : "It's true guys. I don't know if you've heard the news, butt if you haven't, I'm outing myself as a butt. I've always loved buttish things, butt this is a new dawn, butts are all butt here to stay."
});
collection.insert({
	"author" :	"tainzhi",
	"title" : "I'm a super hip guy",
	"lastUpdate" : now,
	"created" : now,
	"icon" : "images/icons/c4.png",
	"content" : "Look at me with my fancy Kalvin Klein (R) backpack and Macbook (R) Air (TM). I'm a super hip goy."
});
