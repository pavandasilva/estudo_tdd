const mysql_connection = require('../../config/mysql_connection');
const bcrypt = require('bcrypt');
const saltRounds = 8;

exports.get = ((req, res) => {
  const sql =
    'SELECT ' +
    'usuario_id, ' +
    'email, ' +
    'nome, ' +
    'dt_cadastro ' +
    'FROM usuarios';

  mysql_connection.query(sql, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(error.code).json({ "error_message": error.message });
    }

    res.status(200).json(rows);
  });

});

exports.post = (req, res) => {
  if (!req.body.email || !req.body.nome || !req.body.senha) {
    console.log("Campos obrigatórios não informados");
    res.status(400).json({ "error": "Campos obrigatórios não informados" });
    return;
  }

  mysql_connection.query(
    'SELECT COUNT(*) as qtde FROM usuarios WHERE email = ?',
    [req.body.email],
    (error, rows) => {
      if (rows[0].qtde > 0) {
        console.log("Email já cadastrado)");
        res.status(400).json({ "error": "Email já cadastrado" });
        return;
      }
      bcrypt.hash(req.body.senha, saltRounds, (err, hash) => {
        mysql_connection.query(
          'INSERT INTO usuarios(email, senha, nome) VALUES(?, ?, ?)',
          [req.body.email, hash, req.body.nome],
          (error, result) => {
            if (error) {
              console.log("Erro interno 500)");
              res.status(500).json({ "error": error.message });
              return;
            }

            let insertId = result.insertId;

            mysql_connection.query(
              'SELECT usuario_id, email, nome, dt_cadastro FROM usuarios WHERE usuario_id = ?',
              [insertId],
              (error, rows) => {
                res.status(201).json(rows[0]);
              });
          });
      });
    });
};



