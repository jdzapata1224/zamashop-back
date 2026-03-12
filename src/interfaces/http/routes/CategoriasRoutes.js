const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../../../infrastructure/middlewares/authMiddleware');

const CategoriasSchemaRepository   = require('../../../infrastructure/database/repositories/CategoriasSchemaRepository');

const ConsultarCategoriasIdUseCase = require('../../../application/use-cases/Categorias/ConsultarCategoriasId');
const ConsultarCategoriasIdController        = require('../controllers/Categorias/ConsultarCategoriasIdController');

const ConsultarCategoriasUseCase = require('../../../application/use-cases/Categorias/ConsultarCategorias');
const ConsultarCategoriasController        = require('../controllers/Categorias/ConsultarCategoriasController');

const CrearCategoriaUseCase = require('../../../application/use-cases/Categorias/CrearCategorias');
const CrearCategoriasController        = require('../controllers/Categorias/CrearCategoriasController');

const EliminarCategoriaUseCase         = require('../../../application/use-cases/Categorias/EliminarCategorias');
const EliminarCategoriasController      = require('../controllers/Categorias/EliminarCategoriasController');

const CambiarEstadoCategoriaUseCase         = require('../../../application/use-cases/Categorias/CambiarEstadoCategorias');
const CambiarEstadoCategoriasController      = require('../controllers/Categorias/CambiarEstadoCategoriasController');

const ActualizarCategoriaUseCase    = require('../../../application/use-cases/Categorias/ActualizarCategorias');
const ActualizarCategoriasController = require('../controllers/Categorias/ActualizarCategoriasController');

const categoriasRepository  = new CategoriasSchemaRepository();

const consultarCategoriasIdUseCase      = new ConsultarCategoriasIdUseCase(categoriasRepository);
const consultarCategoriasIdController      = new ConsultarCategoriasIdController(consultarCategoriasIdUseCase);

const consultarCategoriasUseCase      = new ConsultarCategoriasUseCase(categoriasRepository);
const consultarCategoriasController      = new ConsultarCategoriasController(consultarCategoriasUseCase);

const crearCategoriaUseCase      = new CrearCategoriaUseCase(categoriasRepository);
const crearCategoriasController      = new CrearCategoriasController(crearCategoriaUseCase);

const eliminarCategoriaUseCase      = new EliminarCategoriaUseCase(categoriasRepository);
const eliminarCategoriasController     = new EliminarCategoriasController(eliminarCategoriaUseCase);

const cambiarEstadoCategoriaUseCase      = new CambiarEstadoCategoriaUseCase(categoriasRepository);
const cambiarEstadoCategoriasController     = new CambiarEstadoCategoriasController(cambiarEstadoCategoriaUseCase);

const actualizarCategoriaUseCase      = new ActualizarCategoriaUseCase(categoriasRepository);
const actualizarCategoriasController      = new ActualizarCategoriasController(actualizarCategoriaUseCase);


router.use(authMiddleware);
router.get('/ConsultarCategoriasId/:id',(req, res) => consultarCategoriasIdController.consultarCategoriasId(req, res));
router.get('/ConsultarCategorias',(req, res) => consultarCategoriasController.consultarCategorias(req, res));
router.post('/CrearCategoria',(req, res) => crearCategoriasController.crearCategoria(req, res));
router.post('/ActualizarCategoria/:id',(req, res) => actualizarCategoriasController.actualizarCategoria(req, res));
router.patch('/EliminarCategoria/:id',(req, res) => eliminarCategoriasController.eliminarCategoria(req, res));
router.patch('/CambiarEstadoCategoria/:id',(req, res) => cambiarEstadoCategoriasController.cambiarEstadoCategoria(req, res));


module.exports = router;
