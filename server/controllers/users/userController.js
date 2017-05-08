
var restful = require('node-restful');

module.exports = function (app, route) 
{
    var rest = restful.model('users', app.models.usersmodel).methods(['get', 'put', 'post', 'delete']);
    rest.register(app, route);
	console.log("interconnect");
    return function (req, res, next) 
    {
        next();
    };
};
