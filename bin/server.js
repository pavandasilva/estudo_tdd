const app = require('../src/app');
const http = require('http');
const port = 3000;

app.set('port', port);

const server = http.createServer(app);

// const mysql_connection = require('../config/mysql_connection');


server.listen(port, function () {
    console.log('Rodando na porta ' + port);
});

