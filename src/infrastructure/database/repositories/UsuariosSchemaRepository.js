const UsuariosRepository  = require('../../../domain/repositories/IUsuariosRepository');
const UsuariosSchema  = require('../models/UsuariosSchema');
const Usuarios            = require('../../../domain/entities/Usuarios');
const { hashPassword } = require('../../utils/hash.util');
const { Types } = require('mongoose');

class UsuariosSchemaRepository extends UsuariosRepository {

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
      intentosFallidos:    doc.usr_Intentos_Fallidos    ?? 0,
      requiereCambioClave: doc.usr_Requiere_Cambio_Clave ?? false,
      perfilId:       doc.perfilId     ?? null,
      perfilNombre:         doc.perfilNombre ?? null,
      fechaCreacion:  doc.usr_Fecha_Creacion,
      usuarioCreacion:       doc.usr_Creacion ? doc.usr_Creacion.toString() : null,
      fechaActualizacion:  doc.usr_Fecha_Actualizacion ?? null,
      usuarioActualizacion:       doc.usr_Actualizacion ? doc.usr_Actualizacion.toString() : null, 
      fechaEliminacion:  doc.usr_Fecha_Eliminacion ?? null,
      usuarioEliminacion:       doc.usr_Eliminacion ? doc.usr_Eliminacion.toString() : null,
    });
  }

    async incrementarIntentosFallidos(id) {
      if (!Types.ObjectId.isValid(id)) return;
      await UsuariosSchema.findByIdAndUpdate(id, { $inc: { usr_Intentos_Fallidos: 1 } });
    }
  
    async resetearIntentosFallidos(id) {
      if (!Types.ObjectId.isValid(id)) return;
      await UsuariosSchema.findByIdAndUpdate(id, {
        $set: { usr_Intentos_Fallidos: 0, usr_Requiere_Cambio_Clave: false },
      });
    }
  
    async marcarRequiereCambioClave(id) {
      if (!Types.ObjectId.isValid(id)) return;
      await UsuariosSchema.findByIdAndUpdate(id, {
        $set: { usr_Requiere_Cambio_Clave: true, usr_Intentos_Fallidos: 0 },
      });
    }
  
    async cambiarClave(id, nuevaClave) {
      if (!Types.ObjectId.isValid(id)) return;
      const hash = await hashPassword(nuevaClave);
      await UsuariosSchema.findByIdAndUpdate(id, {
        $set: {
          usr_Password:              hash,
          usr_Requiere_Cambio_Clave: false,
          usr_Intentos_Fallidos:     0,
        },
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

  async findByUsuario(usuario) {
    const docs = await UsuariosSchema.aggregate([
      {
         $match: {
          usr_Usuario: usuario,
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
  
  async findByIdentificacion(identificacion) {
    const docs = await UsuariosSchema.aggregate([
      {
        $match: {
          usr_Identificacion: identificacion,
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

  async findByUsuarioOrIdentificacion(usuario, identificacion) {
     const docs = await UsuariosSchema.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { usr_Usuario:        usuario        },
                { usr_Identificacion: identificacion },
              ],
            },
            {
              $or: [
                { usr_Fecha_Eliminacion: null },
                { usr_Fecha_Eliminacion: { $exists: false } },
              ],
            },
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