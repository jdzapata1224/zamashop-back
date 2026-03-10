const mongoose = require('mongoose');

const TokensSchema = new mongoose.Schema(
  {
    tkn_Usr_Id:    { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    tkn_Jti:       { type: String, required: true, unique: true },
    tkn_Action:    { type: String, enum: ['LOGIN', 'CAMBIO_CLAVE'], required: true },
    tkn_Ip:        { type: String, default: null },
    tkn_UserAgent: { type: String, default: null },
    tkn_IssuedAt:  { type: Date, required: true },
    tkn_ExpiredAt: { type: Date, required: true },
    tkn_Success:   { type: Boolean, default: true },
    tkn_TipoToken: { type: String, enum: ['JWT'], default: 'JWT' },
  },
  {
    collection: 'Tokens',
    versionKey: false,
  }
);

module.exports = mongoose.model('Tokens', TokensSchema);
