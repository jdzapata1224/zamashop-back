const { requireString, requireObjectId,optionalString }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString,toLower }             = require('../../../../infrastructure/utils/basic.util');

class ActualizarUsuarioInDTO {
  constructor({ id,primer_nombre,segundo_nombre, primer_apellido,segundo_apellido, identificacion, correo, telefono,perfil, usuarioActualizacion }) {
    requireObjectId(id,                   'id');
    requireString(primer_nombre,          'Primer nombre');
    requireString(primer_apellido,        'Primer apellido');
    requireString(identificacion,         'Identificacion');
    requireString(correo,                 'Correo');
    requireString(telefono,               'Telefono');
    requireObjectId(perfil,              'perfil');
    requireObjectId(usuarioActualizacion, 'usuarioActualizacion');
    optionalString(segundo_nombre,        'Segundo nombre');
    optionalString(segundo_apellido,      'Segundo apellido');

    this.id                   = toObjectId(id);
    this.perfil               = toObjectId(perfil);
    this.primer_nombre        = toUpper(primer_nombre);
    this.segundo_nombre       = segundo_nombre   ? toUpper(segundo_nombre)   : null;
    this.primer_apellido      = toUpper(primer_apellido);
    this.segundo_apellido     = segundo_apellido ? toUpper(segundo_apellido) : null;
    this.identificacion       = trimmedString(identificacion);
    this.correo               = toLower(correo);
    this.telefono             = trimmedString(telefono);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);
  }
}

module.exports = ActualizarUsuarioInDTO;