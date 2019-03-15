const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios');
/* const authMiddleware = require('../middlewares/autenticacao'); */

router.get('/', controller.get);
router.post('/', controller.post);

/* router.use(authMiddleware); */

module.exports = router;