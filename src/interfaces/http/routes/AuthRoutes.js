const express  = require('express');
const router   = express.Router();

const UsuariosSchemaRepository = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');
const LoginUseCase             = require('../../../application/use-cases/Auth/Login');
const LoginController          = require('../controllers/Auth/LoginController');
const ValidarTokenUseCase             = require('../../../application/use-cases/Auth/ValidarToken');
const ValidarTokenController          = require('../controllers/Auth/ValidarTokenController');


const userRepository  = new UsuariosSchemaRepository();
const loginUseCase    = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);

const validarTokenUseCase    = new ValidarTokenUseCase(userRepository);
const validarTokenController = new ValidarTokenController(validarTokenUseCase);

router.post('/Login', (req, res) => loginController.login(req, res));
router.post('/ValidarToken', (req, res) => validarTokenController.validarToken(req, res));

module.exports = router;
