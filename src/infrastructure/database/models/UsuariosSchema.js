const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuariosSchema = new mongoose.Schema(
  {
    usr_Primer_Nombre: {
      type: String,
      required: true,
      trim: true,
    },
    usr_Segundo_Nombre: {
      type: String,
      trim: true,
    },
    usr_Primer_Apellido: {
      type: String,
      required: true,
      trim: true,
    },
    usr_Segundo_Apellido: {
      type: String,
      trim: true,
    },
    usr_Usuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    usr_Password: {
      type: String,
      required: true,
    },
    usr_Identificacion: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    usr_Correo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    usr_Telefono: {
      type: String,
      required: true,
      trim: true,
    },
    usr_Estado: {
      type: Boolean,
      default: true,
    },
    usr_Fecha_Creacion: {
      type: Date,
      default: Date.now,
    },
    usr_Creacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    usr_Prf_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Perfiles',        // self-reference: who created this user
    },
    usr_Fecha_Eliminacion: {
      type: Date
    },
    usr_Eliminacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
    usr_Fecha_Actualizacion: {
      type: Date
    },
    usr_Actualizacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',        // self-reference: who created this user
    },
  },
  {
    collection: 'Usuarios',  // explicit collection name
    versionKey: false,    // removes __v field
  }
  
);
module.exports = mongoose.model('Usuarios', UsuariosSchema);
