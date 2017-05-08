
var restful = require('node-restful');

module.exports = function (app, route) 
{
    var rest = restful.model('myAngular1', app.models.myAngular1).methods(['get', 'put', 'post', 'delete']);
    rest.register(app, route);
    return function (req, res, next) {
        next();
    };
};
