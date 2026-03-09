const mongoose = require('mongoose');

const OpcionesSchema = new mongoose.Schema(
  {
    opc_Codigo: {
      type: String,
      required: true,
      trim: true,
    },
    opc_Nombre: {
      type: String,
      trim: true,
    },
    opc_Estado: {
      type: Boolean,
      default: true,
    },
    opc_Top_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TipoOpcion',        // self-reference: who created this user
    },
    opc_Padre_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opciones',        // self-reference: who created this user
    },
    opc_Fecha_Creacion: {
      type: Date,
      default: Date.now,
    },
    opc_Usr_Creacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    opc_Fecha_Eliminacion: {
      type: Date
    },
    opc_Usr_Eliminacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    opc_Fecha_Actualizacion: {
      type: Date
    },
    opc_Usr_Actualizacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
  },
  {
    collection: 'Opciones',  // explicit collection name
    versionKey: false,    // removes __v field
  }
  
);
module.exports = mongoose.model('Opciones', OpcionesSchema);
