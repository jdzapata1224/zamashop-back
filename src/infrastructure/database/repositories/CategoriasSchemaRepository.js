const CategoriasRepository  = require('../../../domain/repositories/ICategoriasRepository');
const CategoriasSchema  = require('../models/CategoriasSchema');
const Categorias            = require('../../../domain/entities/Categorias');
const { Types } = require('mongoose');

class CategoriasSchemaRepository extends CategoriasRepository {

  _toEntity(doc) {
    return new Categorias({
      id:             doc._id.toString(),
      nombre:  doc.cat_Nombre,
      descripcion:  doc.cat_Descripcion,
      estado:         doc.cat_Estado,
      fechaCreacion:  doc.cat_Fecha_Creacion,
      usuarioCreacion:       doc.cat_Usr_Creacion ? doc.cat_Usr_Creacion.toString() : null,
      fechaActualizacion:  doc.cat_Fecha_Actualizacion ?? null,
      usuarioActualizacion:       doc.cat_Usr_Actualizacion ? doc.cat_Usr_Actualizacion.toString() : null, 
      fechaEliminacion:  doc.cat_Fecha_Eliminacion ?? null,
      usuarioEliminacion:       doc.cat_Usr_Eliminacion ? doc.cat_Usr_Eliminacion.toString() : null,
    });
  }


  async findById(id) {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
     const docs = await UsuariosSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          $or: [
            { usr_Fecha_Eliminacion: null },
            { usr_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      {
        $lookup: {
          from:         'Perfiles',
          localField:   'usr_Prf_Id',
          foreignField: '_id',
          as:           'perfil',
        },
      },
      {
        $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true },
      },
      {
        $set: {
          perfilId:     '$perfil._id',
          perfilNombre: '$perfil.prf_Nombre',
        },
      },
    ]);

    
   
    return docs.length ? this._toEntity(docs[0]) : null;
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

   async changeStatus(data) {
    if (!Types.ObjectId.isValid(data.id)) return null;
    
    const payload = {
      usr_Fecha_Actualizacion: new Date(),
      usr_Estado: data.estado,
    };

    // usr_Eliminacion solo se guarda si es un ObjectId válido
    if (data.usuarioActualizacion && Types.ObjectId.isValid(data.usuarioActualizacion)) {
      payload.usr_Actualizacion = new Types.ObjectId(data.usuarioActualizacion);
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
    const docs = await UsuariosSchema.aggregate([
      {
        $match: {
          $or: [
            { usr_Fecha_Eliminacion: null },
            { usr_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      {
        $lookup: {
          from:         'Perfiles',
          localField:   'usr_Prf_Id',
          foreignField: '_id',
          as:           'perfil',
        },
      },
      {
        $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true },
      },
      {
        $set: {
          perfilId:     '$perfil._id',
          perfilNombre: '$perfil.prf_Nombre',
        },
      },
    ]);
    return docs.map(doc => this._toEntity(doc));
  }

  async create(data) {

    if (!Types.ObjectId.isValid(data.perfil)) return null;
   const payload={
      usr_Primer_Nombre:        data.primer_nombre,
      usr_Primer_Apellido:      data.primer_apellido,
      usr_Usuario:        data.usuario,
      usr_Password:       await hashPassword(data.identificacion),
      usr_Identificacion: data.identificacion,
      usr_Correo:         data.correo,
      usr_Telefono:       data.telefono,
      usr_Estado:         true,
      usr_Prf_Id:       new Types.ObjectId(data.perfil),
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

 async update(data) {
    // usuario y password NO se actualizan
    if (!Types.ObjectId.isValid(data.perfil)) return null;

    const payload = {
      usr_Primer_Nombre:       data.primer_nombre,
      usr_Primer_Apellido:     data.primer_apellido,
      usr_Identificacion:      data.identificacion,
      usr_Correo:              data.correo,
      usr_Telefono:            data.telefono,
      usr_Fecha_Actualizacion: new Date(),
      usr_Prf_Id:       new Types.ObjectId(data.perfil),

    };

    if (data.segundo_nombre)   payload.usr_Segundo_Nombre   = data.segundo_nombre;
    if (data.segundo_apellido) payload.usr_Segundo_Apellido = data.segundo_apellido;
    if (data.usuarioActualizacion && Types.ObjectId.isValid(data.usuarioActualizacion)) {
      payload.usr_Actualizacion = new Types.ObjectId(data.usuarioActualizacion);
    }

    const doc = await UsuariosSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
    return this._toEntity(doc);
  }

}

module.exports = UsuariosSchemaRepository;