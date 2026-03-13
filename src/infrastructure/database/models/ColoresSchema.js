const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema(
  {
    col_Nombre:           { type: String, required: true, trim: true },
    col_Hex:              { type: String, trim: true },
    col_Estado:           { type: Boolean, default: true },
    col_Fecha_Creacion:   { type: Date, default: Date.now },
    col_Usr_Creacion:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    col_Fecha_Eliminacion: { type: Date },
    col_Usr_Eliminacion:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    col_Fecha_Actualizacion: { type: Date },
    col_Usr_Actualizacion:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
  },
  { collection: 'Colores', versionKey: false }
);

module.exports = mongoose.model('Colores', ColorSchema);