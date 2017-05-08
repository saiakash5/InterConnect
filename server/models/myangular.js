var mongoose = require('mongoose');
var myAngular1 =  new mongoose.Schema({data:JSON},{
    collection :'mycollection'
});
module.exports = myAngular1;
