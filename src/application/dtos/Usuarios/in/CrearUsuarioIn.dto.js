const { requireString, requireObjectId, optionalString } = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toLower, toObjectId,trimmedString }                   = require('../../../../infrastructure/utils/basic.util');

class CrearUsuarioInDTO {
  constructor({ perfil, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
    identificacion, correo, telefono, usuarioCreacion }) {

    requireString(primer_nombre,          'Primer nombre');
    requireString(primer_apellido,        'Primer apellido');
    requireString(identificacion,         'Identificacion');
    requireString(correo,                 'Correo');
    requireString(telefono,               'Telefono');
    requireObjectId(perfil,              'perfil');
    requireObjectId(usuarioCreacion,     'usuarioCreacion');
    optionalString(segundo_nombre,        'Segundo nombre');
    optionalString(segundo_apellido,      'Segundo apellido');

    this.perfil           = toObjectId(perfil);
    this.primer_nombre    = toUpper(primer_nombre);
    this.segundo_nombre   = segundo_nombre   ? toUpper(segundo_nombre)   : null;
    this.primer_apellido  = toUpper(primer_apellido);
    this.segundo_apellido = segundo_apellido ? toUpper(segundo_apellido) : null;
    this.identificacion   = trimmedString(identificacion);
    this.correo           = toLower(correo);
    this.telefono         = trimmedString(telefono);
    this.usuarioCreacion  = toObjectId(usuarioCreacion);
    
  }
}

module.exports = CrearUsuarioInDTO;
