if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const connectDB = require("./src/infrastructure/config/database");
const usuarioRoutes = require('./src/interfaces/http/routes/UsuariosRoutes');

const app = express();
app.use(express.json());
app.use('/api/Usuarios', usuarioRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB();

module.exports = app;