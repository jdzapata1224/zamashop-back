const mongoose = require('mongoose');

const TokensSchema = new mongoose.Schema(
  {
    tkn_Usr_Id:    { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    tkn_Jti:       { type: String, required: true, unique: true },
    tkn_Accion:    { type: String, enum: ['LOGIN', 'CAMBIO_CLAVE'], required: true },
    tkn_Ip:        { type: String, default: null },
    tkn_Agente_Cliente: { type: String, default: null },
    tkn_Fecha_Expiracion: { type: Date, required: true },
    tkn_Fecha_Emision: { type: Date, required: true },
    tkn_Estado:   { type: Boolean, default: true },
    tkn_TipoToken: { type: String, enum: ['JWT'], default: 'JWT' },
    tkn_Fecha_Creacion:  { type: Date, required: true },
    tkn_Usr_Creacion:    { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'},
    tkn_Fecha_Actualizacion:  { type: Date},
    tkn_Usr_Actualizacion:    { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'},
  },
  {
    collection: 'Tokens',
    versionKey: false,
  }
);

module.exports = mongoose.model('Tokens', TokensSchema);
