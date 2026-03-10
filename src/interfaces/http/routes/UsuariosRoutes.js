const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');

const UsuariosSchemaRepository   = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');

const ConsultarUsuariosIdUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuariosId');
const ConsultarUsuariosIdController        = require('../controllers/Usuarios/ConsultarUsuariosIdController');

const ConsultarUsuariosUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuarios');
const ConsultarUsuariosController        = require('../controllers/Usuarios/ConsultarUsuariosController');


const CrearUsuarioUseCase = require('../../../application/use-cases/Usuarios/CrearUsuario');
const CrearUsuarioController        = require('../controllers/Usuarios/CrearUsuarioController');

const EliminarUsuarioUseCase         = require('../../../application/use-cases/Usuarios/EliminarUsuario');
const EliminarUsuarioController      = require('../controllers/Usuarios/EliminarUsuarioController');

const CambiarEstadoUsuarioUseCase         = require('../../../application/use-cases/Usuarios/CambiarEstadoUsuario');
const CambiarEstadoUsuarioController      = require('../controllers/Usuarios/CambiarEstadoUsuarioController');

const ActualizarUsuarioUseCase    = require('../../../application/use-cases/Usuarios/ActualizarUsuario');
const ActualizarUsuarioController = require('../controllers/Usuarios/ActualizarUsuarioController');

const OpcionesPerfilesSchemaRepository  = require('../../../infrastructure/database/repositories/OpcionesPerfilesSchemaRepository');
const OpcionesUsuariosSchemaRepository  = require('../../../infrastructure/database/repositories/OpcionesUsuariosSchemaRepository');


const userRepository  = new UsuariosSchemaRepository();
const opcionesPerfilesRepository = new OpcionesPerfilesSchemaRepository();
const opcionesUsuariosRepository = new OpcionesUsuariosSchemaRepository();

const consultarUsuariosIdUseCase      = new ConsultarUsuariosIdUseCase(userRepository);
const consultarUsuariosIdController      = new ConsultarUsuariosIdController(consultarUsuariosIdUseCase);

const consultarUsuariosUseCase      = new ConsultarUsuariosUseCase(userRepository);
const consultarUsuariosController      = new ConsultarUsuariosController(consultarUsuariosUseCase);

const crearUsuarioUseCase      = new CrearUsuarioUseCase(userRepository, opcionesPerfilesRepository, opcionesUsuariosRepository);
const crearUsuarioController      = new CrearUsuarioController(crearUsuarioUseCase);

const eliminarUsuarioUseCase      = new EliminarUsuarioUseCase(userRepository);
const eliminarUsuarioController     = new EliminarUsuarioController(eliminarUsuarioUseCase);

const cambiarEstadoUsuarioUseCase      = new CambiarEstadoUsuarioUseCase(userRepository);
const cambiarEstadoUsuarioController     = new CambiarEstadoUsuarioController(cambiarEstadoUsuarioUseCase);

const actualizarUsuarioUseCase      = new ActualizarUsuarioUseCase(userRepository);
const actualizarUsuarioController      = new ActualizarUsuarioController(actualizarUsuarioUseCase);

router.use(authMiddleware);

router.get('/ConsultarUsuariosId/:id',(req, res) => consultarUsuariosIdController.consultarUsuariosId(req, res));
router.get('/ConsultarUsuarios',(req, res) => consultarUsuariosController.consultarUsuarios(req, res));
router.post('/CrearUsuario',(req, res) => crearUsuarioController.crearUsuario(req, res));
router.post('/ActualizarUsuario/:id',(req, res) => actualizarUsuarioController.actualizarUsuario(req, res));
router.patch('/EliminarUsuario/:id',(req, res) => eliminarUsuarioController.eliminarUsuario(req, res));
router.patch('/CambiarEstadoUsuario/:id',(req, res) => cambiarEstadoUsuarioController.cambiarEstadoUsuario(req, res));


module.exports = router;
