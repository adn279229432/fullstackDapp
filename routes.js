const routes = require('next-routes')();

routes
.add('/compains/new','/compains/new')
.add('/compains/:address','/compains/show')
.add('/compains/:address/requests','/compains/requests/index')
.add('/compains/:address/requests/new','/compains/requests/new');


module.exports = routes;
