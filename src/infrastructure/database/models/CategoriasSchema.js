const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema(
  {
    cat_Nombre:           { type: String, required: true, trim: true },
    cat_Descripcion:      { type: String, trim: true },
    cat_Estado:           { type: Boolean, default: true },
    cat_Fecha_Creacion:   { type: Date, default: Date.now },
    cat_Usr_Creacion:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    cat_Fecha_Eliminacion: { type: Date },
    cat_Usr_Eliminacion:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
    cat_Fecha_Actualizacion: { type: Date },
    cat_Usr_Actualizacion:{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios' },
  },
  { collection: 'Categorias', versionKey: false }
);

module.exports = mongoose.model('Categorias', CategoriaSchema);