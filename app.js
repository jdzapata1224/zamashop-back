if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const connectDB = require("./src/infrastructure/config/database");
const usuarioRoutes = require('./src/interfaces/http/routes/UsuariosRoutes');
const authRoutes = require('./src/interfaces/http/routes/AuthRoutes');
const opcionesRoutes = require('./src/interfaces/http/routes/OpcionesRoutes');
const categoriasRoutes = require('./src/interfaces/http/routes/CategoriasRoutes');
const productosRoutes = require('./src/interfaces/http/routes/ProductosRoutes');
const coloresRoutes = require('./src/interfaces/http/routes/ColoresRoutes');
const tallasRoutes = require('./src/interfaces/http/routes/TallasRoutes');
const productoVariacionRoutes = require('./src/interfaces/http/routes/ProductoVariacionRoutes');
const perfilesRoutes = require('./src/interfaces/http/routes/PerfilesRoutes');
const app = express();
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/Usuarios', usuarioRoutes);
apiRouter.use('/Opciones', opcionesRoutes);
apiRouter.use('/Productos', productosRoutes);
apiRouter.use('/Colores', coloresRoutes);
apiRouter.use('/Tallas', tallasRoutes);
apiRouter.use('/ProductoVariacion', productoVariacionRoutes);
apiRouter.use('/Perfiles', perfilesRoutes);
apiRouter.use('/Auth', authRoutes);
apiRouter.use('/Categorias', categoriasRoutes);

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({
    codigo:404,
    mensaje: "Ruta no encontrada",
    ruta: req.originalUrl,
    metodo: req.method,
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB();

module.exports = app;