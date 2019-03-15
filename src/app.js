const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

/* rotas */
const usuarios = require('./routes/usuarios');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use(express.static('./assets'));
app.use('/usuarios', usuarios);

/* app.use('/palavras', palavras)
app.use('/audios', audios);
app.use('/oracoes', oracoes);
app.use('/eventos', eventos);
app.use('/chats', chats); */

module.exports = app;