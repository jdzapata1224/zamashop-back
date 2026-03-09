const mongoose = require('mongoose');

const TipoOpcionSchema = new mongoose.Schema(
  {
    top_Nombre: {
      type: String,
      required: true,
      trim: true,
    },
    top_Fecha_Creacion: {
      type: Date,
      default: Date.now,
    },
    top_Usr_Creacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    top_Fecha_Eliminacion: {
      type: Date
    },
    top_Usr_Eliminacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    top_Fecha_Actualizacion: {
      type: Date
    },
    top_Usr_Actualizacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
  },
  {
    collection: 'TipoOpcion',  // explicit collection name
    versionKey: false,    // removes __v field
  }
  
);
module.exports = mongoose.model('TipoOpcion', TipoOpcionSchema);
