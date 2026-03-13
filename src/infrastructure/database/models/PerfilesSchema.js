const mongoose = require('mongoose');

const PerfilesSchema = new mongoose.Schema(
  {
    prf_Codigo: {Perfilestype: String,Perfilesrequired: true,Perfilestrim: true},
    prf_Nombre: {Perfilestype: String,Perfilestrim: true},
    prf_Estado: {Perfilestype: Boolean,Perfilesdefault: true},
    prf_Fecha_Creacion: {Perfilestype: Date,Perfilesdefault: Date.now},
    prf_Usr_Creacion: {Perfilestype: mongoose.Schema.Types.ObjectId,Perfilesref: 'Usuarios'},
    prf_Fecha_Eliminacion: {Perfilestype: Date},
    prf_Usr_Eliminacion: {Perfilestype: mongoose.Schema.Types.ObjectId,Perfilesref: 'Usuarios'},
    prf_Fecha_Actualizacion: {Perfilestype: Date},
    prf_Usr_Actualizacion: {Perfilestype: mongoose.Schema.Types.ObjectId,Perfilesref: 'Usuarios'},
  },
  {
    collection: 'Perfiles',  // explicit collection name
    versionKey: false,    // removes __v field
  }

);
module.exports = mongoose.model('Perfiles', PerfilesSchema);
