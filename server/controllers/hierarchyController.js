var restful = require('node-restful');

module.exports = function (app, route) 
{
    var rest = restful.model('hierarchical1', app.models.hierarchy).methods(['get', 'put', 'post', 'delete']);
    rest.register(app, route);
    return function (req, res, next) {
        next();
    };
};


