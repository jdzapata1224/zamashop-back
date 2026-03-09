const mongoose = require('mongoose');

const OpcionesPerfilesSchema = new mongoose.Schema(
  {
    opr_Prf_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Perfiles',        // self-reference: who created this user
    },
    opr_Opc_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opciones',        // self-reference: who created this user
    },
    opr_Fecha_Creacion: {
      type: Date,
      default: Date.now,
    },
    opr_Usr_Creacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    opr_Fecha_Eliminacion: {
      type: Date
    },
    opr_Usr_Eliminacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    _Fecha_Actualizacion: {
      type: Date
    },
    opr_Usr_Actualizacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
  },
  {
    collection: 'OpcionesPerfiles',  // explicit collection name
    versionKey: false,    // removes __v field
  }
  
);
module.exports = mongoose.model('OpcionesPerfiles', OpcionesPerfilesSchema);
