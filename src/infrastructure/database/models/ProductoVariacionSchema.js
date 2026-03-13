const mongoose = require('mongoose');

const ProductoVariacionSchema = new mongoose.Schema(
  {
    prv_Codigo:           { type: String, required: true, trim: true },
    prv_Prd_Id:           { type: mongoose.Schema.Types.ObjectId, ref: 'Productos', required: true },
    prv_Col_Id:           { type: mongoose.Schema.Types.ObjectId, ref: 'Colores', default: null },   // null si no aplica
    prv_Tal_Id:           { type: mongoose.Schema.Types.ObjectId, ref: 'Tallas',  default: null },   // null si no aplica
    prv_Precio:           { type: Number, required: true },
    prv_Stock:            { type: Number, required: true, default: 0 },
    prv_Estado:           { type: Boolean, default: true },
    prv_Fecha_Creacion:   { type: Date, default: Date.now },
    prv_Usr_Creacion:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    prv_Fecha_Eliminacion: { type: Date },
    prv_Usr_Eliminacion:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    prv_Fecha_Actualizacion: { type: Date },
    prv_Usr_Actualizacion:{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
  },
  { collection: 'ProductoVariaciones', versionKey: false }
);

// Índice único: un producto no puede tener dos variaciones con la misma combinación color+talla
ProductoVariacionSchema.index(
  { prv_Prd_Id: 1, prv_Col_Id: 1, prv_Tal_Id: 1 },
  { unique: true }
);

module.exports = mongoose.model('ProductoVariaciones', ProductoVariacionSchema);