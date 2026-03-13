const { requireString, requireObjectId,requireBoolean }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,toBoolean,trimmedString }             = require('../../../../infrastructure/utils/basic.util');

class ActualizarProductosInDTO {
  constructor({ id,nombre,descripcion,codigo,tieneTalla,tieneColor,categoriaId,usuarioActualizacion }) {
    requireObjectId(id,                   'id');
    requireString(nombre,                 'Nombre');
    requireString(codigo,                 'Codigo');
    requireString(descripcion,            'Descripcion');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');
    requireObjectId(categoriaId,                   'Categoria');
    requireBoolean(tieneTalla,                   'Tiene Talla');
    requireBoolean(tieneColor,                   'Tiene coLOR');
    this.id                   = toObjectId(id);
    this.categoriaId          = toObjectId(categoriaId);
    this.codigo               = toUpper(codigo);
    this.tieneTalla               = toBoolean(tieneTalla);
    this.tieneColor               = toBoolean(tieneColor);
    this.nombre               = toUpper(nombre);
    this.descripcion          = trimmedString(descripcion);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);

  }
}

module.exports = ActualizarProductosInDTO;