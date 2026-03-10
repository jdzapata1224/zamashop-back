const express  = require('express');
const router   = express.Router();
const authMiddleware = require('../../../infrastructure/middlewares/authMiddleware');

const UsuariosSchemaRepository = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');
const TokensSchemaRepository         = require('../../../infrastructure/database/repositories/TokensSchemaRepository');

const LoginUseCase             = require('../../../application/use-cases/Auth/Login');
const LoginController          = require('../controllers/Auth/LoginController');

const ValidarTokenUseCase             = require('../../../application/use-cases/Auth/ValidarToken');
const ValidarTokenController          = require('../controllers/Auth/ValidarTokenController');

const GenerarTokenCambioClaveUseCase  = require('../../../application/use-cases/Auth/GenerarTokenCambioClave');
const GenerarTokenCambioClaveController = require('../controllers/Auth/GenerarTokenCambioClaveController');

const CambiarClaveUseCase             = require('../../../application/use-cases/Auth/CambiarClave');
const CambiarClaveController            = require('../controllers/Auth/CambiarClaveController');

const userRepository   = new UsuariosSchemaRepository();
const tokensRepository = new TokensSchemaRepository();

const loginUseCase    = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);


const logoutUseCase    = new LogoutUseCase(tokensRepository);
const logoutController = new LogoutController(logoutUseCase);

const validarTokenUseCase    = new ValidarTokenUseCase(userRepository);
const validarTokenController = new ValidarTokenController(validarTokenUseCase);

const generarTokenCambioClaveUseCase    = new GenerarTokenCambioClaveUseCase(userRepository, tokensRepository);
const generarTokenCambioClaveController = new GenerarTokenCambioClaveController(generarTokenCambioClaveUseCase);

const cambiarClaveUseCase               = new CambiarClaveUseCase(userRepository, tokensRepository);
const cambiarClaveController            = new CambiarClaveController(cambiarClaveUseCase);


router.post('/Login', (req, res) => loginController.login(req, res));
router.post('/ValidarToken', (req, res) => validarTokenController.validarToken(req, res));
router.post('/Logout',   authMiddleware, (req, res) => logoutController.logout(req, res));
router.post('/GenerarTokenCambioClave', authMiddleware, (req, res) => generarTokenCambioClaveController.generarToken(req, res));
router.post('/CambiarClave', (req, res) => cambiarClaveController.cambiarClave(req, res));

module.exports = router;
