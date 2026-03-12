const TokensSchema = require('../models/TokensSchema');
const { Types }    = require('mongoose');

class TokensSchemaRepository {

  async contarActivasPorUsuario(usuarioId) {
    return TokensSchema.countDocuments({
      tkn_Usr_Id:    new Types.ObjectId(usuarioId),
      tkn_Accion:    'LOGIN',
      tkn_Estado:   true,
      tkn_Fecha_Expiracion: { $gt: new Date() },
    });
  }

  async findMasAntiguaByUsuario(usuarioId) {
    return TokensSchema.findOne({
      tkn_Usr_Id:    new Types.ObjectId(usuarioId),
      tkn_Accion:    'LOGIN',
      tkn_Estado:   true,
      tkn_Fecha_Expiracion: { $gt: new Date() },
    }).sort({ tkn_Fecha_Creacion: 1 }); // la más antigua primero
  }

  async create(data) {
    await TokensSchema.create({
      tkn_Usr_Id:    data.usuarioId,
      tkn_Jti:       data.jti,
      tkn_Accion:    data.accion,
      tkn_Ip:        data.ip,
      tkn_Agente_Cliente: data.agenteCliente,
      tkn_Fecha_Expiracion: data.fechaExpiracion,
      tkn_Fecha_Emision: data.fechaEmision,
      tkn_TipoToken: data.tipoToken,
      tkn_Fecha_Creacion:  new Date(),
      tkn_Usr_Creacion: data.usuarioCreacion
    });
  }

  async findActivoByUsuarioYAction(usuarioId, accion) {
  return TokensSchema.findOne({
    tkn_Usr_Id: new Types.ObjectId(usuarioId),
    tkn_Accion: accion,
    tkn_Estado: true,
    tkn_Fecha_Expiracion: { $gt: new Date() }, // que no haya expirado aún
  });
}

  async findByJtiYAction(jti, accion) {
    return TokensSchema.findOne({ tkn_Jti: jti, tkn_Accion: accion, tkn_Estado: true });
  }

  async invalidateByJti(jti) {
    await TokensSchema.updateOne(
      { tkn_Jti: jti },
      { $set: { tkn_Estado: false } }
    );
  }

  async invalidateByUsuarioYAction(usuarioId, accion) {
    await TokensSchema.updateMany(
      { tkn_Usr_Id: new Types.ObjectId(usuarioId), tkn_Accion: accion, tkn_Estado: true },
      { $set: { tkn_Estado: false } }
    );
  }
}

module.exports = TokensSchemaRepository;
