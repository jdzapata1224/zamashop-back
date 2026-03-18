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

const LoginGoogleUseCase        = require('../../../application/use-cases/Auth/LoginGoogle');
const GoogleRedirectController  = require('../controllers/Auth/GoogleRedirectController');
const GoogleCallbackController  = require('../controllers/Auth/GoogleCallbackController');

const LoginOutlookUseCase       = require('../../../application/use-cases/Auth/LoginOutlook');
const OutlookRedirectController      = require('../controllers/Auth/OutlookRedirectController');
const OutlookCallbackController = require('../controllers/Auth/OutlookCallbackController');

const userRepository   = new UsuariosSchemaRepository();
const tokensRepository = new TokensSchemaRepository();

const loginUseCase    = new LoginUseCase(userRepository, tokensRepository);
const loginController = new LoginController(loginUseCase);


const logoutUseCase    = new LogoutUseCase(tokensRepository);
const logoutController = new LogoutController(logoutUseCase);

const validarTokenUseCase    = new ValidarTokenUseCase(userRepository);
const validarTokenController = new ValidarTokenController(validarTokenUseCase);

const loginGoogleUseCase       = new LoginGoogleUseCase(userRepository, tokensRepository);
const googleRedirectController = new GoogleRedirectController();
const googleCallbackController = new GoogleCallbackController(loginGoogleUseCase);

const loginOutlookUseCase       = new LoginOutlookUseCase(userRepository, tokensRepository);
const outlookRedirectController      = new OutlookRedirectController();
const outlookCallbackController = new OutlookCallbackController(loginOutlookUseCase);

const auth = authMiddleware(tokensRepository); // ← se crea una vez por archivo de rutas

router.post('/Login', (req, res) => loginController.login(req, res));
router.post('/ValidarToken', (req, res) => validarTokenController.validarToken(req, res));
router.post('/Logout',   auth, (req, res) => logoutController.logout(req, res));
router.get('/Google',          (req, res) => googleRedirectController.getUrl(req, res));
router.get('/Google/Callback', (req, res) => googleCallbackController.callback(req, res));
router.get('/Outlook/url',       (req, res) => outlookRedirectController.getUrl(req, res));
router.post('/Outlook/Callback', (req, res) => outlookCallbackController.callback(req, res));
module.exports = router;
