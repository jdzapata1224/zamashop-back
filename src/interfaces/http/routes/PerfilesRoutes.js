const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');
const TokensSchemaRepository = require('../../../infrastructure/database/repositories/TokensSchemaRepository');

const PerfilesSchemaRepository   = require('../../../infrastructure/database/repositories/PerfilesSchemaRepository');

const ConsultarPerfilesIdUseCase = require('../../../application/use-cases/Perfiles/ConsultarPerfilesId');
const ConsultarPerfilesIdController        = require('../controllers/Perfiles/ConsultarPerfilesIdController');

const ConsultarPerfilesUseCase = require('../../../application/use-cases/Perfiles/ConsultarPerfiles');
const ConsultarPerfilesController        = require('../controllers/Perfiles/ConsultarPerfilesController');

const CrearPerfilesUseCase = require('../../../application/use-cases/Perfiles/CrearPerfiles');
const CrearPerfilesController        = require('../controllers/Perfiles/CrearPerfilesController');

const EliminarPerfilesUseCase         = require('../../../application/use-cases/Perfiles/EliminarPerfiles');
const EliminarPerfilesController      = require('../controllers/Perfiles/EliminarPerfilesController');

const CambiarEstadoPerfilesUseCase         = require('../../../application/use-cases/Perfiles/CambiarEstadoPerfiles');
const CambiarEstadoPerfilesController      = require('../controllers/Perfiles/CambiarEstadoPerfilesController');

const ActualizarPerfilesUseCase    = require('../../../application/use-cases/Perfiles/ActualizarPerfiles');
const ActualizarPerfilesController = require('../controllers/Perfiles/ActualizarPerfilesController');

const tokensRepository = new TokensSchemaRepository();
const auth = authMiddleware(tokensRepository); 

const perfilesRepository  = new PerfilesSchemaRepository();

const consultarPerfilesIdUseCase      = new ConsultarPerfilesIdUseCase(perfilesRepository);
const consultarPerfilesIdController      = new ConsultarPerfilesIdController(consultarPerfilesIdUseCase);

const consultarPerfilesUseCase      = new ConsultarPerfilesUseCase(perfilesRepository);
const consultarPerfilesController      = new ConsultarPerfilesController(consultarPerfilesUseCase);

const crearPerfilesUseCase      = new CrearPerfilesUseCase(perfilesRepository);
const crearPerfilesController      = new CrearPerfilesController(crearPerfilesUseCase);

const eliminarPerfilesUseCase      = new EliminarPerfilesUseCase(perfilesRepository);
const eliminarPerfilesController     = new EliminarPerfilesController(eliminarPerfilesUseCase);

const cambiarEstadoPerfilesUseCase      = new CambiarEstadoPerfilesUseCase(perfilesRepository);
const cambiarEstadoPerfilesController     = new CambiarEstadoPerfilesController(cambiarEstadoPerfilesUseCase);

const actualizarPerfilesUseCase      = new ActualizarPerfilesUseCase(perfilesRepository);
const actualizarPerfilesController      = new ActualizarPerfilesController(actualizarPerfilesUseCase);


router.use(auth);
router.get('/ConsultarPerfilesId/:id',(req, res) => consultarPerfilesIdController.consultarPerfilesId(req, res));
router.get('/ConsultarPerfiles',(req, res) => consultarPerfilesController.consultarPerfiles(req, res));
router.post('/CrearPerfiles',(req, res) => crearPerfilesController.crearPerfiles(req, res));
router.post('/ActualizarPerfiles/:id',(req, res) => actualizarPerfilesController.actualizarPerfiles(req, res));
router.patch('/EliminarPerfiles/:id',(req, res) => eliminarPerfilesController.eliminarPerfiles(req, res));
router.patch('/CambiarEstadoPerfiles/:id',(req, res) => cambiarEstadoPerfilesController.cambiarEstadoPerfiles(req, res));


module.exports = router;
