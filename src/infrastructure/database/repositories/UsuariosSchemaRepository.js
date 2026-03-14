const UsuariosRepository = require('../../../domain/repositories/IUsuariosRepository');
const UsuariosSchema = require('../models/UsuariosSchema');
const Usuarios = require('../../../domain/entities/Usuarios');
const { hashPassword } = require('../../utils/hash.util');
const { Types } = require('mongoose');

class UsuariosSchemaRepository extends UsuariosRepository {

  _toEntity(doc) {
    return new Usuarios({
      id: doc._id.toString(),
      primer_nombre: doc.usr_Primer_Nombre,
      segundo_nombre: doc.usr_Segundo_Nombre,
      primer_apellido: doc.usr_Primer_Apellido,
      segundo_apellido: doc.usr_Segundo_Apellido,
      usuario: doc.usr_Usuario,
      password: doc.usr_Password,
      identificacion: doc.usr_Identificacion,
      correo: doc.usr_Correo,
      telefono: doc.usr_Telefono,
      estado: doc.usr_Estado,
      intentosFallidos: doc.usr_Intentos_Fallidos ?? 0,
      requiereCambioClave: doc.usr_Requiere_Cambio_Clave ?? false,
      perfilId: doc.usr_Perfil_Id ?? null,
      perfilNombre: doc.usr_Perfil_Nombre ?? null,
      fechaCreacion: doc.usr_Fecha_Creacion,
      usuarioCreacionId: doc.usr_Creacion_Id,
      usuarioCreacionNombre: doc.usr_Creacion_Nombre ? doc.usr_Creacion_Nombre.toString() : null,
      fechaActualizacion: doc.usr_Fecha_Actualizacion ?? null,
      usuarioActualizacionId: doc.usr_Actualizacion_Id ?? null,
      usuarioActualizacionNombre: doc.usr_Actualizacion_Nombre ? doc.usr_Actualizacion_Nombre.toString() : null,
      fechaEliminacion: doc.usr_Fecha_Eliminacion ?? null,
      usuarioEliminacionId: doc.usr_Eliminacion_Id ?? null,
      usuarioEliminacionNombre: doc.usr_Eliminacion_Nombre ? doc.usr_Eliminacion_Nombre.toString() : null
    });
  }

  async incrementarIntentosFallidos(id) {
    await UsuariosSchema.findByIdAndUpdate(id, { $inc: { usr_Intentos_Fallidos: 1 } });
  }

  async resetearIntentosFallidos(id) {
    await UsuariosSchema.findByIdAndUpdate(id, {
      $set: { usr_Intentos_Fallidos: 0, usr_Requiere_Cambio_Clave: false },
    });
  }

  async marcarRequiereCambioClave(id) {
    await UsuariosSchema.findByIdAndUpdate(id, {
      $set: { usr_Requiere_Cambio_Clave: true },
    });
  }

  async cambiarClave(id, nuevaClave) {
    const hash = await hashPassword(nuevaClave);
    await UsuariosSchema.findByIdAndUpdate(Types.ObjectId(id), {
      $set: {
        usr_Password: hash,
        usr_Requiere_Cambio_Clave: false,
        usr_Intentos_Fallidos: 0,
      },
    });
  }


  async findById(id) {
    const docs = await UsuariosSchema.aggregate([
      {
        $match: {
          _id: Types.ObjectId(id),
          $or: [
            { usr_Fecha_Eliminacion: null },
            { usr_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      // Perfil
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'usr_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      { $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true } },

      // Usuario creación (siempre presente)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'usr_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'usr_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      // Usuario eliminación (opcional)
      {
        $set: {
          usr_Perfil_Id: '$perfil._id',
          usr_Perfil_Nombre: '$perfil.prf_Nombre',
          usr_Creacion_Id: '$usuarioCreacion._id',
          usr_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
            ],
          },

          usr_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          usr_Actualizacion_Nombre: {
            $cond: {
              if: { $ifNull: ['$usuarioActualizacion._id', false] },
              then: {
                $concat: [
                  { $ifNull: ['$usuarioActualizacion.usr_Primer_Nombre', ''] },
                  ' ',
                  { $ifNull: ['$usuarioActualizacion.usr_Primer_Apellido', ''] },
                ],
              },
              else: null,
            },
          }
        },
      },
      {
        $project: {
          usr_Primer_Nombre: 1,
          usr_Segundo_Nombre: 1,
          usr_Primer_Apellido: 1,
          usr_Segundo_Apellido: 1,
          usr_Usuario: 1,
          usr_Password: 1,
          usr_Identificacion: 1,
          usr_Correo: 1,
          usr_Telefono: 1,
          usr_Estado: 1,
          usr_Intentos_Fallidos: 1,
          usr_Requiere_Cambio_Clave: 1,
          usr_Fecha_Creacion: 1,
          usr_Creacion_Id: 1,
          usr_Fecha_Actualizacion: 1,
          usr_Actualizacion_Id: 1,
          usr_Perfil_Id: 1,
          usr_Perfil_Nombre: 1,
          usr_Creacion_Nombre: 1,
          usr_Actualizacion_Nombre: 1
        },
      },
    ]);

    return docs.length ? this._toEntity(docs[0]) : null;
  }

  async delete(data) {
    const payload = {
      usr_Fecha_Eliminacion: new Date(),
      usr_Eliminacion: data.usuarioEliminacion,
    };

    const doc = await UsuariosSchema.findByIdAndUpdate(
      data.id,  // ← corregido: era `id` sin definir
      { $set: payload },
      { new: true }                 // ← sin upsert: si no existe, no crea
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
    return this._toEntity(doc);
  }

  async changeStatus(data) {
    const payload = {
      usr_Fecha_Actualizacion: new Date(),
      usr_Estado: data.estado,
      usr_Actualizacion: data.usuarioActualizacion,
    };

    const doc = await UsuariosSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
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
      // Perfil
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'usr_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      { $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true } },

      // Usuario creación (siempre presente)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'usr_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'usr_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      // Usuario eliminación (opcional)

      {
        $set: {
          usr_Perfil_Id: '$perfil._id',
          usr_Perfil_Nombre: '$perfil.prf_Nombre',
          usr_Creacion_Id: '$usuarioCreacion._id',
          usr_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
            ],
          },

          usr_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          usr_Actualizacion_Nombre: {
            $cond: {
              if: { $ifNull: ['$usuarioActualizacion._id', false] },
              then: {
                $concat: [
                  { $ifNull: ['$usuarioActualizacion.usr_Primer_Nombre', ''] },
                  ' ',
                  { $ifNull: ['$usuarioActualizacion.usr_Primer_Apellido', ''] },
                ],
              },
              else: null,
            },
          }
        },
      },
      {
        $project: {
          usr_Primer_Nombre: 1,
          usr_Segundo_Nombre: 1,
          usr_Primer_Apellido: 1,
          usr_Segundo_Apellido: 1,
          usr_Usuario: 1,
          usr_Password: 1,
          usr_Identificacion: 1,
          usr_Correo: 1,
          usr_Telefono: 1,
          usr_Estado: 1,
          usr_Intentos_Fallidos: 1,
          usr_Requiere_Cambio_Clave: 1,
          usr_Fecha_Creacion: 1,
          usr_Creacion_Id: 1,
          usr_Fecha_Actualizacion: 1,
          usr_Actualizacion_Id: 1,
          usr_Perfil_Id: 1,
          usr_Perfil_Nombre: 1,
          usr_Creacion_Nombre: 1,
          usr_Actualizacion_Nombre: 1
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
          from: 'Perfiles',
          localField: 'usr_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      {
        $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true },
      },
      {
        $set: {
          perfilId: '$perfil._id',
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
          from: 'Perfiles',
          localField: 'usr_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      {
        $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true },
      },
      {
        $set: {
          perfilId: '$perfil._id',
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
                { usr_Usuario: usuario },
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
          from: 'Perfiles',
          localField: 'usr_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      {
        $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true },
      },
      {
        $set: {
          perfilId: '$perfil._id',
          perfilNombre: '$perfil.prf_Nombre',
        },
      },
    ]);
    return docs.length ? this._toEntity(docs[0]) : null;
  }

  async create(data) {

    const payload = {
      usr_Primer_Nombre: data.primer_nombre,
      usr_Primer_Apellido: data.primer_apellido,
      usr_Usuario: data.usuario,
      usr_Password: await hashPassword(data.identificacion),
      usr_Identificacion: data.identificacion,
      usr_Correo: data.correo,
      usr_Telefono: data.telefono,
      usr_Estado: true,
      usr_Prf_Id: data.perfil,
      usr_Fecha_Creacion: new Date(),
      usr_Creacion: data.usuarioCreacion
    };

    if (data.segundo_nombre) payload.usr_Segundo_Nombre = data.segundo_nombre;
    if (data.segundo_apellido) payload.usr_Segundo_Apellido = data.segundo_apellido;

    const doc = new UsuariosSchema(payload);
    const saved = await doc.save();

    if (!saved || !saved._id) throw new Error('No se pudo crear el usuario');

    return this._toEntity(saved);
  }

  async update(data) {
    
    const payload = {
      usr_Primer_Nombre: data.primer_nombre,
      usr_Primer_Apellido: data.primer_apellido,
      usr_Identificacion: data.identificacion,
      usr_Correo: data.correo,
      usr_Telefono: data.telefono,
      usr_Fecha_Actualizacion: new Date(),
      usr_Prf_Id: data.perfil,
      usr_Actualizacion: data.usuarioActualizacion
    };

    if (data.segundo_nombre) payload.usr_Segundo_Nombre = data.segundo_nombre;
    if (data.segundo_apellido) payload.usr_Segundo_Apellido = data.segundo_apellido;

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