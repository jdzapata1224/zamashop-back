const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');
const TokensSchemaRepository = require('../../../infrastructure/database/repositories/TokensSchemaRepository');

const ColoresSchemaRepository   = require('../../../infrastructure/database/repositories/ColoresSchemaRepository');

const ConsultarColoresIdUseCase = require('../../../application/use-cases/Colores/ConsultarColoresId');
const ConsultarColoresIdController        = require('../controllers/Colores/ConsultarColoresIdController');

const ConsultarColoresUseCase = require('../../../application/use-cases/Colores/ConsultarColores');
const ConsultarColoresController        = require('../controllers/Colores/ConsultarColoresController');

const CrearColoresUseCase = require('../../../application/use-cases/Colores/CrearColores');
const CrearColoresController        = require('../controllers/Colores/CrearColoresController');

const EliminarColoresUseCase         = require('../../../application/use-cases/Colores/EliminarColores');
const EliminarColoresController      = require('../controllers/Colores/EliminarColoresController');

const CambiarEstadoColoresUseCase         = require('../../../application/use-cases/Colores/CambiarEstadoColores');
const CambiarEstadoColoresController      = require('../controllers/Colores/CambiarEstadoColoresController');

const ActualizarColoresUseCase    = require('../../../application/use-cases/Colores/ActualizarColores');
const ActualizarColoresController = require('../controllers/Colores/ActualizarColoresController');

const coloresRepository  = new ColoresSchemaRepository();

const consultarColoresIdUseCase      = new ConsultarColoresIdUseCase(coloresRepository);
const consultarColoresIdController      = new ConsultarColoresIdController(consultarColoresIdUseCase);

const consultarColoresUseCase      = new ConsultarColoresUseCase(coloresRepository);
const consultarColoresController      = new ConsultarColoresController(consultarColoresUseCase);

const crearColoresUseCase      = new CrearColoresUseCase(coloresRepository);
const crearColoresController      = new CrearColoresController(crearColoresUseCase);

const eliminarColoresUseCase      = new EliminarColoresUseCase(coloresRepository);
const eliminarColoresController     = new EliminarColoresController(eliminarColoresUseCase);

const cambiarEstadoColoresUseCase      = new CambiarEstadoColoresUseCase(coloresRepository);
const cambiarEstadoColoresController     = new CambiarEstadoColoresController(cambiarEstadoColoresUseCase);

const actualizarColoresUseCase      = new ActualizarColoresUseCase(coloresRepository);
const actualizarColoresController      = new ActualizarColoresController(actualizarColoresUseCase);
const tokensRepository = new TokensSchemaRepository();
const auth = authMiddleware(tokensRepository); // ← se crea una vez por archivo de rutas


router.use(auth);
router.get('/ConsultarColoresId/:id',(req, res) => consultarColoresIdController.consultarColoresId(req, res));
router.get('/ConsultarColores',(req, res) => consultarColoresController.consultarColores(req, res));
router.post('/CrearColores',(req, res) => crearColoresController.crearColores(req, res));
router.post('/ActualizarColores/:id',(req, res) => actualizarColoresController.actualizarColores(req, res));
router.patch('/EliminarColores/:id',(req, res) => eliminarColoresController.eliminarColores(req, res));
router.patch('/CambiarEstadoColores/:id',(req, res) => cambiarEstadoColoresController.cambiarEstadoColores(req, res));


module.exports = router;
