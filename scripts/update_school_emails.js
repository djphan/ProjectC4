// NOTE: This file is meant to be run by update_university_emails.sh

var now = ISODate();

// For each school we have
print("Finding current schools...");
db.schools.find().forEach(
  function(school) {
    temp_school = db.temp_schools.findOne({"name": school.name});
    if(temp_school) {
      // Found, update information
      db.schools.update(
        {"_id": school._id},
        {
          $set: {
            "web_page": temp_school.web_page,
            "country": temp_school.country,
            "domain": temp_school.domain,
            "updated": ISODate()
          }
        } 
      );
      print("Updated information for '" + school.name + "'!");
    } else {
      // Didn't find, print something
      print("*** Could not find updated information for '" + school.name + "'.");
    }
  }
); 

// Drop collection
print("Dropping temp_schools collection...");
db.temp_schools.drop();
