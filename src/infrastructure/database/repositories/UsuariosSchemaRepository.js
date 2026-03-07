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
      usuarioCreacion:       doc.usr_Creacion ? doc.usr_Creacion.toString() : null,
      fechaActualizacion:  doc.usr_Fecha_Actualizacion ?? null,
      usuarioActualizacion:       doc.usr_Actualizacion ? doc.usr_Actualizacion.toString() : null, 
      fechaEliminacion:  doc.usr_Fecha_Eliminacion ?? null,
      usuarioEliminacion:       doc.usr_Eliminacion ? doc.usr_Eliminacion.toString() : null,
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
    const docs = await UsuariosSchema.find({
      $or: [
        { usr_Fecha_Eliminacion: null },
        { usr_Fecha_Eliminacion: { $exists: false } }
      ]
    });
     return docs.map(doc => this._toEntity(doc));
  }

  async findByUsuarioOrIdentificacion(usuario, identificacion) {
    const doc = await UsuariosSchema.findOne({
      $or: [
        { usr_Usuario:        usuario        },
        { usr_Identificacion: identificacion },
      ],
    });
    return doc ? this._toEntity(doc) : null;
  }

  async create(data) {
    const saltRounds   = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);

    const doc = await UsuariosSchema.create({
      usr_Nombres:        data.nombres,
      usr_Apellidos:      data.apellidos,
      usr_Usuario:        data.usuario,
      usr_Password:       passwordHash,
      usr_Identificacion: data.identificacion,
      usr_Correo:         data.correo,
      usr_Telefono:       data.telefono,
      usr_Estado:         true,
      usr_Fecha_Creacion: new Date(),
      usr_Creacion:       data.usuarioCreacion
                            ? new Types.ObjectId(data.usuarioCreacion)
                            : undefined,
    });

    return this._toEntity(doc);
  }


}

module.exports = UsuariosSchemaRepository;