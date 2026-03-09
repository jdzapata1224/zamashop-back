const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');

const OpcionesSchemaRepository   = require('../../../infrastructure/database/repositories/OpcionesSchemaRepository');

const ConsultarOpcionesIdUseCase = require('../../../application/use-cases/Opciones/ConsultarOpcionesId');
const ConsultarOpcionesIdController        = require('../controllers/ConsultarOpcionesIdController');

const ConsultarOpcionesUseCase = require('../../../application/use-cases/Opciones/ConsultarOpciones');
const ConsultarOpcionesController        = require('../controllers/ConsultarOpcionesController');


const CrearOpcionesUseCase = require('../../../application/use-cases/Opciones/CrearOpciones');
const CrearOpcionesController        = require('../controllers/CrearOpcionesController');

const EliminarOpcionesUseCase         = require('../../../application/use-cases/Opciones/EliminarOpciones');
const EliminarOpcionesController      = require('../controllers/EliminarOpcionesController');

const CambiarEstadoOpcionesUseCase         = require('../../../application/use-cases/Opciones/CambiarEstadoOpciones');
const CambiarEstadoOpcionesController      = require('../controllers/CambiarEstadoOpcionesController');


const opcionesRepository  = new OpcionesSchemaRepository();

const consultarOpcionesIdUseCase      = new ConsultarOpcionesIdUseCase(opcionesRepository);
const consultarOpcionesIdController      = new ConsultarOpcionesIdController(consultarOpcionesIdUseCase);

const consultarOpcionesUseCase      = new ConsultarOpcionesUseCase(OpcionesopcionesRepository);
const consultarOpcionesController      = new ConsultarOpcionesController(consultarOpcionesUseCase);

const crearOpcionesUseCase      = new CrearOpcionesUseCase(OpcionesopcionesRepository);
const crearOpcionesController      = new CrearOpcionesController(crearOpcionesUseCase);

const eliminarOpcionesUseCase      = new EliminarOpcionesUseCase(OpcionesopcionesRepository);
const eliminarOpcionesController     = new EliminarOpcionesController(eliminarOpcionesUseCase);

const cambiarEstadoOpcionesUseCase      = new CambiarEstadoOpcionesUseCase(OpcionesopcionesRepository);
const cambiarEstadoOpcionesController     = new CambiarEstadoOpcionesController(cambiarEstadoOpcionesUseCase);

const actualizarOpcionesUseCase      = new ActualizarOpcionesUseCase(OpcionesopcionesRepository);
const actualizarOpcionesController      = new ActualizarOpcionesController(actualizarOpcionesUseCase);

router.use(authMiddleware);

router.get('/ConsultarOpcionesId/:id',(req, res) => consultarOpcionesIdController.consultarOpcionesId(req, res));
router.get('/ConsultarOpciones',(req, res) => consultarOpcionesController.consultarOpciones(req, res));
router.post('/CrearOpciones',(req, res) => crearOpcionesController.crearOpciones(req, res));
router.patch('/EliminarOpciones/:id',(req, res) => eliminarOpcionesController.eliminarOpciones(req, res));
router.patch('/CambiarEstadoOpciones/:id',(req, res) => cambiarEstadoOpcionesController.cambiarEstadoOpciones(req, res));


module.exports = router;
