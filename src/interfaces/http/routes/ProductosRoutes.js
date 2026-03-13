const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');

const ProductosSchemaRepository   = require('../../../infrastructure/database/repositories/ProductosSchemaRepository');

const ConsultarProductosIdUseCase = require('../../../application/use-cases/Productos/ConsultarProductosId');
const ConsultarProductosIdController        = require('../controllers/Productos/ConsultarProductosIdController');

const ConsultarProductosUseCase = require('../../../application/use-cases/Productos/ConsultarProductos');
const ConsultarProductosController        = require('../controllers/Productos/ConsultarProductosController');

const CrearProductosUseCase = require('../../../application/use-cases/Productos/CrearProductos');
const CrearProductosController        = require('../controllers/Productos/CrearProductosController');

const EliminarProductosUseCase         = require('../../../application/use-cases/Productos/EliminarProductos');
const EliminarProductosController      = require('../controllers/Productos/EliminarProductosController');

const CambiarEstadoProductosUseCase         = require('../../../application/use-cases/Productos/CambiarEstadoProductos');
const CambiarEstadoProductosController      = require('../controllers/Productos/CambiarEstadoProductosController');

const ActualizarProductosUseCase    = require('../../../application/use-cases/Productos/ActualizarProductos');
const ActualizarProductosController = require('../controllers/Productos/ActualizarProductosController');

const productosRepository  = new ProductosSchemaRepository();

const consultarProductosIdUseCase      = new ConsultarProductosIdUseCase(productosRepository);
const consultarProductosIdController      = new ConsultarProductosIdController(consultarProductosIdUseCase);

const consultarProductosUseCase      = new ConsultarProductosUseCase(productosRepository);
const consultarProductosController      = new ConsultarProductosController(consultarProductosUseCase);

const crearProductosUseCase      = new CrearProductosUseCase(productosRepository);
const crearProductosController      = new CrearProductosController(crearProductosUseCase);

const eliminarProductosUseCase      = new EliminarProductosUseCase(productosRepository);
const eliminarProductosController     = new EliminarProductosController(eliminarProductosUseCase);

const cambiarEstadoProductosUseCase      = new CambiarEstadoProductosUseCase(productosRepository);
const cambiarEstadoProductosController     = new CambiarEstadoProductosController(cambiarEstadoProductosUseCase);

const actualizarProductosUseCase      = new ActualizarProductosUseCase(productosRepository);
const actualizarProductosController      = new ActualizarProductosController(actualizarProductosUseCase);


router.use(authMiddleware);
router.get('/ConsultarProductosId/:id',(req, res) => consultarProductosIdController.consultarProductosId(req, res));
router.get('/ConsultarProductos',(req, res) => consultarProductosController.consultarProductos(req, res));
router.post('/CrearProductos',(req, res) => crearProductosController.crearProductos(req, res));
router.post('/ActualizarProductos/:id',(req, res) => actualizarProductosController.actualizarProductos(req, res));
router.patch('/EliminarProductos/:id',(req, res) => eliminarProductosController.eliminarProductos(req, res));
router.patch('/CambiarEstadoProductos/:id',(req, res) => cambiarEstadoProductosController.cambiarEstadoProductos(req, res));


module.exports = router;
