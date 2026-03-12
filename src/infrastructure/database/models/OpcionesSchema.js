const mongoose = require('mongoose');

const OpcionesSchema = new mongoose.Schema(
  {
    opc_Codigo: { type: String,required: true, trim: true,},
    opc_Nombre: {type: String,trim: true,},
    opc_Estado: {type: Boolean,default: true,},
    opc_TipoOpcion: { type: String, enum: ['MENU_PRINCIPAL', 'SUBMENU', 'MENU_UNICO'], required: true },
    opc_Padre_Id: {type: mongoose.Schema.Types.ObjectId,ref: 'Opciones'},
    opc_Fecha_Creacion: {type: Date,default: Date.now},
    opc_Usr_Creacion: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuarios'},
    opc_Fecha_Eliminacion: {type: Date},
    opc_Usr_Eliminacion: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuarios'},
    opc_Fecha_Actualizacion: {type: Date},
    opc_Usr_Actualizacion: {type: mongoose.Schema.Types.ObjectId,ref: 'Usuarios'},
  },
  {
    collection: 'Opciones', 
    versionKey: false,
  }
  
);
module.exports = mongoose.model('Opciones', OpcionesSchema);
