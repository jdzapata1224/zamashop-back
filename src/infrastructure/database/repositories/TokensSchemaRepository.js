const TokensSchema = require('../models/TokensSchema');
const { Types }    = require('mongoose');

class TokensSchemaRepository {

  async contarActivasPorUsuario(usuarioId) {
    return TokensSchema.countDocuments({
      tkn_Usr_Id:    new Types.ObjectId(usuarioId),
      tkn_Action:    'LOGIN',
      tkn_Success:   true,
      tkn_ExpiredAt: { $gt: new Date() },
    });
  }

  async findMasAntiguaByUsuario(usuarioId) {
    return TokensSchema.findOne({
      tkn_Usr_Id:    new Types.ObjectId(usuarioId),
      tkn_Action:    'LOGIN',
      tkn_Success:   true,
      tkn_ExpiredAt: { $gt: new Date() },
    }).sort({ tkn_IssuedAt: 1 }); // la más antigua primero
  }

  async create({ usuarioId, jti, action, ip, userAgent, issuedAt, expiredAt, success, tipoToken }) {
    await TokensSchema.create({
      tkn_Usr_Id:    new Types.ObjectId(usuarioId),
      tkn_Jti:       jti,
      tkn_Action:    action,
      tkn_Ip:        ip        || null,
      tkn_UserAgent: userAgent || null,
      tkn_IssuedAt:  new Date(issuedAt),
      tkn_ExpiredAt: new Date(expiredAt),
      tkn_Success:   success   ?? true,
      tkn_TipoToken: tipoToken || 'JWT',
    });
  }

  async findActivoByUsuarioYAction(usuarioId, action) {
  return TokensSchema.findOne({
    tkn_Usr_Id: new Types.ObjectId(usuarioId),
    tkn_Action: action,
    tkn_Success: true,
    tkn_ExpiredAt: { $gt: new Date() }, // que no haya expirado aún
  });
}

  async findByJtiYAction(jti, action) {
    return TokensSchema.findOne({ tkn_Jti: jti, tkn_Action: action, tkn_Success: true });
  }

  async invalidateByJti(jti) {
    await TokensSchema.updateOne(
      { tkn_Jti: jti },
      { $set: { tkn_Success: false } }
    );
  }

  async invalidateByUsuarioYAction(usuarioId, action) {
    await TokensSchema.updateMany(
      { tkn_Usr_Id: new Types.ObjectId(usuarioId), tkn_Action: action, tkn_Success: true },
      { $set: { tkn_Success: false } }
    );
  }
}

module.exports = TokensSchemaRepository;
