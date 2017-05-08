var mongoose = require('mongoose');
var myAngular =  new mongoose.Schema({data:JSON},{
collection :'testrest'
});
module.exports = myAngular;