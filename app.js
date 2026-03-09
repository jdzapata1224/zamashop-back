if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const connectDB = require("./src/infrastructure/config/database");
const usuarioRoutes = require('./src/interfaces/http/routes/UsuariosRoutes');
const authRoutes = require('./src/interfaces/http/routes/AuthRoutes');

const app = express();
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/Usuarios', usuarioRoutes);
apiRouter.use('/Auth', authRoutes);

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