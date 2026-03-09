const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');

const OpcionesSchemaRepository   = require('../../../infrastructure/database/repositories/OpcionesSchemaRepository');

const ConsultarOpcionesIdUseCase = require('../../../application/use-cases/Opciones/ConsultarOpcionesId');
const ConsultarOpcionesIdController        = require('../controllers/Opciones/ConsultarOpcionesIdController');

const ConsultarOpcionesUseCase = require('../../../application/use-cases/Opciones/ConsultarOpciones');
const ConsultarOpcionesController        = require('../controllers/Opciones/ConsultarOpcionesController');

const ConsultarOpcionesUsuarioUseCase = require('../../../application/use-cases/Opciones/ConsultarOpcionesUsuario');
const ConsultarOpcionesUsuarioController        = require('../controllers/Opciones/ConsultarOpcionesUsuarioController');

const ConsultarOpcionesPerfilUseCase = require('../../../application/use-cases/Opciones/ConsultarOpcionesPerfil');
const ConsultarOpcionesPerfilController        = require('../controllers/Opciones/ConsultarOpcionesPerfilController');


const CrearOpcionesUseCase = require('../../../application/use-cases/Opciones/CrearOpciones');
const CrearOpcionesController        = require('../controllers/Opciones/CrearOpcionesController');

const EliminarOpcionesUseCase         = require('../../../application/use-cases/Opciones/EliminarOpciones');
const EliminarOpcionesController      = require('../controllers/Opciones/EliminarOpcionesController');

const CambiarEstadoOpcionesUseCase         = require('../../../application/use-cases/Opciones/CambiarEstadoOpciones');
const CambiarEstadoOpcionesController      = require('../controllers/Opciones/CambiarEstadoOpcionesController');


const opcionesRepository  = new OpcionesSchemaRepository();

const consultarOpcionesIdUseCase      = new ConsultarOpcionesIdUseCase(opcionesRepository);
const consultarOpcionesIdController      = new ConsultarOpcionesIdController(consultarOpcionesIdUseCase);

const consultarOpcionesUseCase      = new ConsultarOpcionesUseCase(opcionesRepository);
const consultarOpcionesController      = new ConsultarOpcionesController(consultarOpcionesUseCase);

const crearOpcionesUseCase      = new CrearOpcionesUseCase(opcionesRepository);
const crearOpcionesController      = new CrearOpcionesController(crearOpcionesUseCase);

const eliminarOpcionesUseCase      = new EliminarOpcionesUseCase(opcionesRepository);
const eliminarOpcionesController     = new EliminarOpcionesController(eliminarOpcionesUseCase);

const cambiarEstadoOpcionesUseCase      = new CambiarEstadoOpcionesUseCase(opcionesRepository);
const cambiarEstadoOpcionesController     = new CambiarEstadoOpcionesController(cambiarEstadoOpcionesUseCase);

const consultarOpcionesUsuarioUseCase      = new ConsultarOpcionesUsuarioUseCase(opcionesRepository);
const consultarOpcionesUsuarioController      = new ConsultarOpcionesUsuarioController(consultarOpcionesUsuarioUseCase);

const consultarOpcionesPerfilUseCase      = new ConsultarOpcionesPerfilUseCase(opcionesRepository);
const consultarOpcionesPerfilController      = new ConsultarOpcionesPerfilController(consultarOpcionesPerfilUseCase);

router.use(authMiddleware);

router.get('/ConsultarOpcionesId/:id',(req, res) => consultarOpcionesIdController.consultarOpcionesId(req, res));
router.get('/ConsultarOpciones',(req, res) => consultarOpcionesController.consultarOpciones(req, res));
router.post('/CrearOpciones',(req, res) => crearOpcionesController.crearOpciones(req, res));
router.patch('/EliminarOpciones/:id',(req, res) => eliminarOpcionesController.eliminarOpciones(req, res));
router.patch('/CambiarEstadoOpciones/:id',(req, res) => cambiarEstadoOpcionesController.cambiarEstadoOpciones(req, res));
router.patch('/ConsultarOpcionesUsuario/:id',(req, res) => consultarOpcionesUsuarioController.consultarOpcionesUsuario(req, res));
router.patch('/ConsultarOpcionesPerfil/:id',(req, res) => consultarOpcionesPerfilController.consultarOpcionesPerfil(req, res));


module.exports = router;
