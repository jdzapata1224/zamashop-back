const mongoose = require('mongoose');

const OpcionesUsuariosSchema = new mongoose.Schema(
  {
    ous_Usr_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    ous_Opc_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opciones',        // self-reference: who created this user
    },
    ous_Fecha_Creacion: {
      type: Date,
      default: Date.now,
    },
    ous_Usr_Creacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    ous_Fecha_Eliminacion: {
      type: Date
    },
    ous_Usr_Eliminacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    ous_Fecha_Actualizacion: {
      type: Date
    },
    ous_Usr_Actualizacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
  },
  {
    collection: 'OpcionesUsuarios',  // explicit collection name
    versionKey: false,    // removes __v field
  }
  
);
module.exports = mongoose.model('OpcionesUsuarios', OpcionesUsuariosSchema);
