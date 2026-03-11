const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    prd_Nombre:           { type: String, required: true, trim: true },
    prd_Descripcion:      { type: String, trim: true },
    prd_Precio_Base:      { type: Number, required: true },
    prd_Imagenes:         [{ type: String }],                          // array de URLs
    prd_Cat_Id:           { type: mongoose.Schema.Types.ObjectId, ref: 'Categorias', required: true },
    prd_Tiene_Color:      { type: Boolean, default: false },
    prd_Tiene_Talla:      { type: Boolean, default: false },
    prd_Estado:           { type: Boolean, default: true },
    prd_Fecha_Creacion:   { type: Date, default: Date.now },
    prd_Usr_Creacion:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    prd_Fecha_Eliminacion: { type: Date },
    prd_Usr_Eliminacion:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    prd_Fecha_Actualizacion: { type: Date },
    prd_Usr_Actualizacion:{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
  },
  { collection: 'Productos', versionKey: false }
);

module.exports = mongoose.model('Productos', ProductoSchema);