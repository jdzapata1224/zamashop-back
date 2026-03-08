const UsuariosRepository  = require('../../../domain/repositories/IUsuariosRepository');
const UsuariosSchema  = require('../models/UsuariosSchema');
const Usuarios            = require('../../../domain/entities/Usuarios');
const { Types } = require('mongoose');
const bcrypt             = require('bcrypt');

class UsuariosSchemaRepository extends UsuariosRepository {

  // Mongoose doc → Domain Entity
  _toEntity(doc) {
    return new Usuarios({
      id:             doc._id.toString(),
      primer_nombre:  doc.usr_Primer_Nombre,
      segundo_nombre:       doc.usr_Segundo_Nombre,
      primer_apellido:      doc.usr_Primer_Apellido,
      segundo_apellido:     doc.usr_Segundo_Apellido,
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
    const doc = await UsuariosSchema.findOne({
      _id: new Types.ObjectId(id),
      usr_Fecha_Eliminacion: { $in: [null, undefined] },
    });
    return doc ? this._toEntity(doc) : null;
  }

  async delete(data) {
    if (!Types.ObjectId.isValid(data.id)) return null;
    
    const payload = {
      usr_Fecha_Eliminacion: new Date(),
    };

    // usr_Eliminacion solo se guarda si es un ObjectId válido
    if (data.usuarioEliminacion && Types.ObjectId.isValid(data.usuarioEliminacion)) {
      payload.usr_Eliminacion = new Types.ObjectId(data.usuarioEliminacion);
    }

    const doc = await UsuariosSchema.findByIdAndUpdate(
      new Types.ObjectId(data.id),  // ← corregido: era `id` sin definir
      { $set: payload },
      { new: true }                 // ← sin upsert: si no existe, no crea
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
    return this._toEntity(doc);

   
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

   const payload={
      usr_Primer_Nombre:        data.primer_nombre,
      usr_Primer_Apellido:      data.primer_apellido,
      usr_Usuario:        data.usuario,
      usr_Password:       passwordHash,
      usr_Identificacion: data.identificacion,
      usr_Correo:         data.correo,
      usr_Telefono:       data.telefono,
      usr_Estado:         true,
      usr_Fecha_Creacion: new Date(),
    };

    if (data.segundo_nombre)   payload.usr_Segundo_Nombre   = data.segundo_nombre;
    if (data.segundo_apellido) payload.usr_Segundo_Apellido = data.segundo_apellido;
    if (data.usuarioCreacion && Types.ObjectId.isValid(data.usuarioCreacion)) {
      payload.usr_Creacion = new Types.ObjectId(data.usuarioCreacion);
    }

    const doc = await UsuariosSchema.create(payload);


    if (!doc || !doc._id) throw new Error('No se pudo crear el usuario');

    return this._toEntity(doc);
  }


}

module.exports = UsuariosSchemaRepository;