const jwt = require('jsonwebtoken');
const autenticacao = require('../../config/autenticacao');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ error: 'Token não informado' });

    jwt.verify(authHeader, autenticacao.secret, (error, decoded) => {
        if (error) return res.status(401).send({error: 'Token inválido'})

        req.pessoa_id = decoded.pessoa_id;
        req.body = req.body;
        return next();
    })
};