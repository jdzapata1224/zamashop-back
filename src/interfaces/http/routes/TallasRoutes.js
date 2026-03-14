const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');
const TokensSchemaRepository = require('../../../infrastructure/database/repositories/TokensSchemaRepository');

const TallasSchemaRepository   = require('../../../infrastructure/database/repositories/TallasSchemaRepository');

const ConsultarTallasIdUseCase = require('../../../application/use-cases/Tallas/ConsultarTallasId');
const ConsultarTallasIdController        = require('../controllers/Tallas/ConsultarTallasIdController');

const ConsultarTallasUseCase = require('../../../application/use-cases/Tallas/ConsultarTallas');
const ConsultarTallasController        = require('../controllers/Tallas/ConsultarTallasController');

const CrearTallasUseCase = require('../../../application/use-cases/Tallas/CrearTallas');
const CrearTallasController        = require('../controllers/Tallas/CrearTallasController');

const EliminarTallasUseCase         = require('../../../application/use-cases/Tallas/EliminarTallas');
const EliminarTallasController      = require('../controllers/Tallas/EliminarTallasController');

const CambiarEstadoTallasUseCase         = require('../../../application/use-cases/Tallas/CambiarEstadoTallas');
const CambiarEstadoTallasController      = require('../controllers/Tallas/CambiarEstadoTallasController');

const ActualizarTallasUseCase    = require('../../../application/use-cases/Tallas/ActualizarTallas');
const ActualizarTallasController = require('../controllers/Tallas/ActualizarTallasController');

const tallasRepository  = new TallasSchemaRepository();

const consultarTallasIdUseCase      = new ConsultarTallasIdUseCase(tallasRepository);
const consultarTallasIdController      = new ConsultarTallasIdController(consultarTallasIdUseCase);

const consultarTallasUseCase      = new ConsultarTallasUseCase(tallasRepository);
const consultarTallasController      = new ConsultarTallasController(consultarTallasUseCase);

const crearTallasUseCase      = new CrearTallasUseCase(tallasRepository);
const crearTallasController      = new CrearTallasController(crearTallasUseCase);

const eliminarTallasUseCase      = new EliminarTallasUseCase(tallasRepository);
const eliminarTallasController     = new EliminarTallasController(eliminarTallasUseCase);

const cambiarEstadoTallasUseCase      = new CambiarEstadoTallasUseCase(tallasRepository);
const cambiarEstadoTallasController     = new CambiarEstadoTallasController(cambiarEstadoTallasUseCase);

const actualizarTallasUseCase      = new ActualizarTallasUseCase(tallasRepository);
const actualizarTallasController      = new ActualizarTallasController(actualizarTallasUseCase);


const tokensRepository = new TokensSchemaRepository();
const auth = authMiddleware(tokensRepository); 
router.use(auth);
router.get('/ConsultarTallasId/:id',(req, res) => consultarTallasIdController.consultarTallasId(req, res));
router.get('/ConsultarTallas',(req, res) => consultarTallasController.consultarTallas(req, res));
router.post('/CrearTallas',(req, res) => crearTallasController.crearTallas(req, res));
router.post('/ActualizarTallas/:id',(req, res) => actualizarTallasController.actualizarTallas(req, res));
router.patch('/EliminarTallas/:id',(req, res) => eliminarTallasController.eliminarTallas(req, res));
router.patch('/CambiarEstadoTallas/:id',(req, res) => cambiarEstadoTallasController.cambiarEstadoTallas(req, res));


module.exports = router;
