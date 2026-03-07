const express               = require('express');
const router                = express.Router();

const UsuariosSchemaRepository   = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');
const ConsultarUsuariosIdUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuariosId');
const ConsultarUsuariosIdController        = require('../controllers/ConsultarUsuariosIdController');

const ConsultarUsuariosUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuarios');
const ConsultarUsuariosController        = require('../controllers/ConsultarUsuariosController');

const userRepository  = new UsuariosSchemaRepository();
const consultarUsuariosIdUseCase      = new ConsultarUsuariosIdUseCase(userRepository);
const consultarUsuariosIdController      = new ConsultarUsuariosIdController(consultarUsuariosIdUseCase);
const consultarUsuariosUseCase      = new ConsultarUsuariosUseCase(userRepository);
const consultarUsuariosController      = new ConsultarUsuariosController(consultarUsuariosUseCase);
router.get('/ConsultarUsuariosId/:id',(req, res) => consultarUsuariosIdController.consultarUsuariosId(req, res));
router.get('/ConsultarUsuarios',(req, res) => consultarUsuariosController.consultarUsuarios(req, res));


module.exports = router;
