const http =  require('http');
const port = 3000;
const app = require('./app');
app.set('port', process.env.PORT || port)
const server = http.createServer(app);
server.listen(process.env.PORT || port);
