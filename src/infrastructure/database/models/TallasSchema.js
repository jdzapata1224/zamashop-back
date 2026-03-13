const mongoose = require('mongoose');

const TallaSchema = new mongoose.Schema(
  {
    tal_Nombre:           { type: String, required: true, trim: true }, // ej: S, M, L, XL, 38, 40
    tal_Orden:            { type: Number, default: 0 },                 // para ordenar S < M < L
    tal_Estado:           { type: Boolean, default: true },
    tal_Fecha_Creacion:   { type: Date, default: Date.now },
    tal_Usr_Creacion:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    tal_Fecha_Eliminacion: { type: Date },
    tal_Usr_Eliminacion:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
  },
  { collection: 'Tallas', versionKey: false }
);

module.exports = mongoose.model('Tallas', TallaSchema);