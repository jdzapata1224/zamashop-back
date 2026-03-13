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

const app = express();
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/Usuarios', usuarioRoutes);
apiRouter.use('/Opciones', opcionesRoutes);
apiRouter.use('/Productos', productosRoutes);
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