const UsuariosRepository  = require('../../../domain/repositories/IUsuariosRepository');
const UsuariosSchema  = require('../models/UsuariosSchema');
const Usuarios            = require('../../../domain/entities/Usuarios');
const { Types } = require('mongoose');

class UsuariosSchemaRepository extends UsuariosRepository {

  // Mongoose doc → Domain Entity
  _toEntity(doc) {
    return new Usuarios({
      id:             doc._id.toString(),
      nombres:        doc.usr_Nombres,
      apellidos:      doc.usr_Apellidos,
      usuario:        doc.usr_Usuario,
      password:       doc.usr_Password,
      identificacion: doc.usr_Identificacion,
      correo:         doc.usr_Correo,
      telefono:       doc.usr_Telefono,
      estado:         doc.usr_Estado,
      fechaCreacion:  doc.usr_Fecha_Creacion,
      usuarioCreacion:       doc.usr_Creacion?.toString(),
      fechaActualizacion:  doc.usr_Fecha_Actualizacion ?? null,
      usuarioActualizacion:       doc.usr_Actualizacion?.toString() ?? null, 
      fechaEliminacion:  doc.usr_Fecha_Eliminacion ?? null,
      usuarioEliminacion:       doc.usr_Eliminacion?.toString() ?? null,
    });
  }


  async findById(id) {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const doc = await UsuariosSchema.findById(new Types.ObjectId(id));
    return doc ? this._toEntity(doc) : null;
  }

  async find() {
    const doc = await UsuariosSchema.find({"usr_Fecha_Eliminacion": null});
     return docs.map(doc => this._toEntity(doc));
  }


}

module.exports = UsuariosSchemaRepository;