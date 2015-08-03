var fs = require('fs');

// Add all the routes from all of the seperate files
module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app);
  })
}
