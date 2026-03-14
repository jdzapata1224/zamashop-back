const express  = require('express');
const router   = express.Router();
const authMiddleware = require('../../../infrastructure/middlewares/authMiddleware');

const TokensSchemaRepository = require('../../../infrastructure/database/repositories/TokensSchemaRepository');
const UsuariosSchemaRepository = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');

const LoginUseCase             = require('../../../application/use-cases/Auth/Login');
const LoginController          = require('../controllers/Auth/LoginController');

const LogoutUseCase             = require('../../../application/use-cases/Auth/Logout');
const LogoutController          = require('../controllers/Auth/LogoutController');

const ValidarTokenUseCase             = require('../../../application/use-cases/Auth/ValidarToken');
const ValidarTokenController          = require('../controllers/Auth/ValidarTokenController');



const userRepository   = new UsuariosSchemaRepository();
const tokensRepository = new TokensSchemaRepository();

const loginUseCase    = new LoginUseCase(userRepository, tokensRepository);
const loginController = new LoginController(loginUseCase);


const logoutUseCase    = new LogoutUseCase(tokensRepository);
const logoutController = new LogoutController(logoutUseCase);

const validarTokenUseCase    = new ValidarTokenUseCase(userRepository);
const validarTokenController = new ValidarTokenController(validarTokenUseCase);

const auth = authMiddleware(tokensRepository); // ← se crea una vez por archivo de rutas

router.post('/Login', (req, res) => loginController.login(req, res));
router.post('/ValidarToken', (req, res) => validarTokenController.validarToken(req, res));
router.post('/Logout',   auth, (req, res) => logoutController.logout(req, res));

module.exports = router;
