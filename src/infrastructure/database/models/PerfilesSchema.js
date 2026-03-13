const mongoose = require('mongoose');

const PerfilesSchema = new mongoose.Schema(
  {
    prf_Codigo: {type: String,required: true,trim: true},
    prf_Nombre: {type: String,trim: true},
    prf_Estado: {type: Boolean,default: true},
    prf_Fecha_Creacion: {type: Date,default: Date.now},
    prf_Usr_Creacion: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuarios'},
    prf_Fecha_Eliminacion: {type: Date},
    prf_Usr_Eliminacion: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuarios'},
    prf_Fecha_Actualizacion: {type: Date},
    prf_Usr_Actualizacion: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuarios'},
  },
  {
    collection: 'Perfiles',  // explicit collection name
    versionKey: false,    // removes __v field
  }

);
module.exports = mongoose.model('Perfiles', PerfilesSchema);
