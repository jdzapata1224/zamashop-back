const { requireString, requireObjectId,requireEnum }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId }             = require('../../../../infrastructure/utils/basic.util');
const TIPOS_OPCION = ['MENU_PRINCIPAL', 'SUBMENU', 'MENU_UNICO'];

class CrearOpcionesInDTO {
  constructor({ nombre,codigo,tipoOpcion,usuarioCreacion }) {
    requireString(nombre,                 'Nombre');
    requireString(codigo,                 'Codigo');
    requireEnum(toUpper(tipoOpcion), 'Tipo Opcion', TIPOS_OPCION);
    requireObjectId(usuarioCreacion, 'Usuario Creacion');

    this.tipoOpcion      = toUpper(tipoOpcion);
    this.nombre               = toUpper(nombre);
    this.codigo               = toUpper(codigo);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
  }
}

module.exports = CrearOpcionesInDTO;