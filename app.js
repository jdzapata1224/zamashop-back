require("dotenv").config();
const express = require("express");

const connectDB = require("./src/infrastructure/database/conex");

const app = express();
app.use(express.json());

connectDB();

module.exports = app;