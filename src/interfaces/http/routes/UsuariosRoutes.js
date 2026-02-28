const express               = require('express');
const router                = express.Router();

const UsuariosSchemaRepository   = require('../../../infrastructure/database/repositories/UsuariosSchemaRepository');
const ConsultarUsuariosIdUseCase = require('../../../application/use-cases/Usuarios/ConsultarUsuariosId');
const ConsultarUsuariosController        = require('../controllers/ConsultarUsuariosIdController');

const userRepository  = new UsuariosSchemaRepository();
const consultarUsuariosIdUseCase      = new ConsultarUsuariosIdUseCase(userRepository);
const consultarUsuariosController      = new ConsultarUsuariosController(consultarUsuariosIdUseCase);
router.get('/ConsultarUsuariosId/:id',(req, res) => consultarUsuariosController.consultarUsuarios(req, res));


module.exports = router;
