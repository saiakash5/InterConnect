var mongoose = require('mongoose')
var userModel = new mongoose.Schema({data:JSON},{
    collection :'mycollection'
});
module.exports = userModel;