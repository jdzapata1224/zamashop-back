const express               = require('express');
const router                = express.Router();

const UsuariosSchemaRepository   = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');

const ConsultarUsuariosIdUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuariosId');
const ConsultarUsuariosIdController        = require('../controllers/ConsultarUsuariosIdController');

const ConsultarUsuariosUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuarios');
const ConsultarUsuariosController        = require('../controllers/ConsultarUsuariosController');


const CrearUsuarioUseCase = require('../../../application/use-cases/Usuarios/CrearUsuario');
const CrearUsuarioController        = require('../controllers/CrearUsuarioController');

const EliminarUsuarioUseCase         = require('../../../application/use-cases/Usuarios/EliminarUsuario');
const EliminarUsuarioController      = require('../controllers/EliminarUsuarioController');

const userRepository  = new UsuariosSchemaRepository();

const consultarUsuariosIdUseCase      = new ConsultarUsuariosIdUseCase(userRepository);
const consultarUsuariosIdController      = new ConsultarUsuariosIdController(consultarUsuariosIdUseCase);

const consultarUsuariosUseCase      = new ConsultarUsuariosUseCase(userRepository);
const consultarUsuariosController      = new ConsultarUsuariosController(consultarUsuariosUseCase);

const crearUsuarioUseCase      = new CrearUsuarioUseCase(userRepository);
const crearUsuarioController      = new CrearUsuarioController(crearUsuarioUseCase);

const eliminarUsuarioUseCase      = new EliminarUsuarioUseCase(userRepository);
const eliminarUsuarioController     = new EliminarUsuarioController(eliminarUsuarioUseCase);


router.get('/ConsultarUsuariosId/:id',(req, res) => consultarUsuariosIdController.consultarUsuariosId(req, res));
router.get('/ConsultarUsuarios',(req, res) => consultarUsuariosController.consultarUsuarios(req, res));
router.post('/CrearUsuario',(req, res) => crearUsuarioController.crearUsuario(req, res));
router.patch('/EliminarUsuario/:id',(req, res) => eliminarUsuarioController.eliminarUsuario(req, res));


module.exports = router;
