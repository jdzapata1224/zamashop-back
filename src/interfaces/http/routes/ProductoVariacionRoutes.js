const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');

const ProductoVariacionSchemaRepository   = require('../../../infrastructure/database/repositories/ProductoVariacionSchemaRepository');

const ConsultarProductoVariacionIdUseCase = require('../../../application/use-cases/ProductoVariacion/ConsultarProductoVariacionId');
const ConsultarProductoVariacionIdController        = require('../controllers/ProductoVariacion/ConsultarProductoVariacionIdController');

const ConsultarProductoVariacionUseCase = require('../../../application/use-cases/ProductoVariacion/ConsultarProductoVariacion');
const ConsultarProductoVariacionController        = require('../controllers/ProductoVariacion/ConsultarProductoVariacionController');

const CrearProductoVariacionUseCase = require('../../../application/use-cases/ProductoVariacion/CrearProductoVariacion');
const CrearProductoVariacionController        = require('../controllers/ProductoVariacion/CrearProductoVariacionController');

const EliminarProductoVariacionUseCase         = require('../../../application/use-cases/ProductoVariacion/EliminarProductoVariacion');
const EliminarProductoVariacionController      = require('../controllers/ProductoVariacion/EliminarProductoVariacionController');

const CambiarEstadoProductoVariacionUseCase         = require('../../../application/use-cases/ProductoVariacion/CambiarEstadoProductoVariacion');
const CambiarEstadoProductoVariacionController      = require('../controllers/ProductoVariacion/CambiarEstadoProductoVariacionController');

const ActualizarProductoVariacionUseCase    = require('../../../application/use-cases/ProductoVariacion/ActualizarProductoVariacion');
const ActualizarProductoVariacionController = require('../controllers/ProductoVariacion/ActualizarProductoVariacionController');

const productoVariacionRepository  = new ProductoVariacionSchemaRepository();

const consultarProductoVariacionIdUseCase      = new ConsultarProductoVariacionIdUseCase(productoVariacionRepository);
const consultarProductoVariacionIdController      = new ConsultarProductoVariacionIdController(consultarProductoVariacionIdUseCase);

const consultarProductoVariacionUseCase      = new ConsultarProductoVariacionUseCase(productoVariacionRepository);
const consultarProductoVariacionController      = new ConsultarProductoVariacionController(consultarProductoVariacionUseCase);

const crearProductoVariacionUseCase      = new CrearProductoVariacionUseCase(productoVariacionRepository);
const crearProductoVariacionController      = new CrearProductoVariacionController(crearProductoVariacionUseCase);

const eliminarProductoVariacionUseCase      = new EliminarProductoVariacionUseCase(productoVariacionRepository);
const eliminarProductoVariacionController     = new EliminarProductoVariacionController(eliminarProductoVariacionUseCase);

const cambiarEstadoProductoVariacionUseCase      = new CambiarEstadoProductoVariacionUseCase(productoVariacionRepository);
const cambiarEstadoProductoVariacionController     = new CambiarEstadoProductoVariacionController(cambiarEstadoProductoVariacionUseCase);

const actualizarProductoVariacionUseCase      = new ActualizarProductoVariacionUseCase(productoVariacionRepository);
const actualizarProductoVariacionController      = new ActualizarProductoVariacionController(actualizarProductoVariacionUseCase);


router.use(authMiddleware);
router.get('/ConsultarProductoVariacionId/:id',(req, res) => consultarProductoVariacionIdController.consultarProductoVariacionId(req, res));
router.get('/ConsultarProductoVariacion',(req, res) => consultarProductoVariacionController.consultarProductoVariacion(req, res));
router.post('/CrearProductoVariacion',(req, res) => crearProductoVariacionController.crearProductoVariacion(req, res));
router.post('/ActualizarProductoVariacion/:id',(req, res) => actualizarProductoVariacionController.actualizarProductoVariacion(req, res));
router.patch('/EliminarProductoVariacion/:id',(req, res) => eliminarProductoVariacionController.eliminarProductoVariacion(req, res));
router.patch('/CambiarEstadoProductoVariacion/:id',(req, res) => cambiarEstadoProductoVariacionController.cambiarEstadoProductoVariacion(req, res));


module.exports = router;
