const PerfilesRepository = require('../../../domain/repositories/IPerfilesRepository');
const PerfilesSchema = require('../models/PerfilesSchema');
const Perfiles = require('../../../domain/entities/Perfiles');
const { hashPassword } = require('../../utils/hash.util');
const { Types } = require('mongoose');

class PerfilesSchemaRepository extends PerfilesRepository {

  _toEntity(doc) {
    return new Perfiles({
      id: doc._id.toString(),
      codigo: doc.prf_Codigo,
      nombre: doc.prf_Nombre,
      estado: doc.prf_Estado,
      fechaCreacion: doc.prf_Fecha_Creacion,
      usuarioCreacionId: doc.prf_Creacion_Id,
      usuarioCreacionNombre: doc.prf_Creacion_Nombre ? doc.prf_Creacion_Nombre.toString() : null,
      fechaActualizacion: doc.prf_Fecha_Actualizacion ?? null,
      usuarioActualizacionId: doc.prf_Actualizacion_Id ?? null,
      usuarioActualizacionNombre: doc.prf_Actualizacion_Nombre ? doc.prf_Actualizacion_Nombre.toString() : null,
      fechaEliminacion: doc.prf_Fecha_Eliminacion ?? null,
      usuarioEliminacionId: doc.prf_Eliminacion_Id ?? null,
      usuarioEliminacionNombre: doc.prf_Eliminacion_Nombre ? doc.prf_Eliminacion_Nombre.toString() : null
    });
  }

 


  async findById(id) {
    const docs = await PerfilesSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          $or: [
            { prf_Fecha_Eliminacion: null },
            { prf_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      // Perfil
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      { $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true } },

      // Usuario creación (siempre presente)
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      // Usuario eliminación (opcional)
      {
        $set: {
          prf_Perfil_Id: '$perfil._id',
          prf_Perfil_Nombre: '$perfil.prf_Nombre',
          prf_Creacion_Id: '$usuarioCreacion._id',
          prf_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.prf_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.prf_Primer_Apellido', ''] },
            ],
          },

          prf_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          prf_Actualizacion_Nombre: {
            $cond: {
              if: { $ifNull: ['$usuarioActualizacion._id', false] },
              then: {
                $concat: [
                  { $ifNull: ['$usuarioActualizacion.prf_Primer_Nombre', ''] },
                  ' ',
                  { $ifNull: ['$usuarioActualizacion.prf_Primer_Apellido', ''] },
                ],
              },
              else: null,
            },
          }
        },
      },
      {
        $project: {
          prf_Nombre: 1,
          prf_Codigo: 1,
          prf_Estado: 1,
          prf_Fecha_Creacion: 1,
          prf_Creacion_Id: 1,
          prf_Creacion_Nombre: 1,
          prf_Fecha_Actualizacion: 1,
          prf_Actualizacion_Id: 1,
          prf_Actualizacion_Nombre: 1,
          prf_Fecha_Eliminacion: 1,
          prf_Eliminacion_Id: 1,
          prf_Eliminacion_Nombre: 1
          
        },
      },
    ]);

    return docs.length ? this._toEntity(docs[0]) : null;
  }

  async delete(data) {
    const payload = {
      prf_Fecha_Eliminacion: new Date(),
      prf_Usr_Eliminacion: data.usuarioEliminacion,
    };

    const doc = await PerfilesSchema.findByIdAndUpdate(
      data.id,  // ← corregido: era `id` sin definir
      { $set: payload },
      { new: true }                 // ← sin upsert: si no existe, no crea
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el perfil');
    return this._toEntity(doc);
  }

  async changeStatus(data) {
    const payload = {
      prf_Fecha_Actualizacion: new Date(),
      prf_Estado: data.estado,
      prf_Usr_Actualizacion: data.usuarioActualizacion,
    };

    const doc = await PerfilesSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el perfil');
    return this._toEntity(doc);


  }

  async find() {
    const docs = await PerfilesSchema.aggregate([
      {
        $match: {
          $or: [
            { prf_Fecha_Eliminacion: null },
            { prf_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      // Perfil
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      { $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true } },

      // Usuario creación (siempre presente)
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      // Usuario eliminación (opcional)
      {
        $set: {
          prf_Perfil_Id: '$perfil._id',
          prf_Perfil_Nombre: '$perfil.prf_Nombre',
          prf_Creacion_Id: '$usuarioCreacion._id',
          prf_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.prf_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.prf_Primer_Apellido', ''] },
            ],
          },

          prf_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          prf_Actualizacion_Nombre: {
            $cond: {
              if: { $ifNull: ['$usuarioActualizacion._id', false] },
              then: {
                $concat: [
                  { $ifNull: ['$usuarioActualizacion.prf_Primer_Nombre', ''] },
                  ' ',
                  { $ifNull: ['$usuarioActualizacion.prf_Primer_Apellido', ''] },
                ],
              },
              else: null,
            },
          }
        },
      },
      {
        $project: {
          prf_Nombre: 1,
          prf_Codigo: 1,
          prf_Estado: 1,
          prf_Fecha_Creacion: 1,
          prf_Creacion_Id: 1,
          prf_Creacion_Nombre: 1,
          prf_Fecha_Actualizacion: 1,
          prf_Actualizacion_Id: 1,
          prf_Actualizacion_Nombre: 1,
          prf_Fecha_Eliminacion: 1,
          prf_Eliminacion_Id: 1,
          prf_Eliminacion_Nombre: 1
          
        },
      },
    ]);

    return docs.map(doc => this._toEntity(doc));
  }

  async findByNombre(nombre) {
    const docs = await PerfilesSchema.aggregate([
      {
        $match: {
          prf_Nombre: nombre,
          $or: [
            { prf_Fecha_Eliminacion: null },
            { prf_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      // Perfil
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Prf_Id',
          foreignField: '_id',
          as: 'perfil',
        },
      },
      { $unwind: { path: '$perfil', preserveNullAndEmptyArrays: true } },

      // Usuario creación (siempre presente)
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Perfiles',
          localField: 'prf_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      // Usuario eliminación (opcional)
      {
        $set: {
          prf_Perfil_Id: '$perfil._id',
          prf_Perfil_Nombre: '$perfil.prf_Nombre',
          prf_Creacion_Id: '$usuarioCreacion._id',
          prf_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.prf_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.prf_Primer_Apellido', ''] },
            ],
          },

          prf_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          prf_Actualizacion_Nombre: {
            $cond: {
              if: { $ifNull: ['$usuarioActualizacion._id', false] },
              then: {
                $concat: [
                  { $ifNull: ['$usuarioActualizacion.prf_Primer_Nombre', ''] },
                  ' ',
                  { $ifNull: ['$usuarioActualizacion.prf_Primer_Apellido', ''] },
                ],
              },
              else: null,
            },
          }
        },
      },
      {
        $project: {
          prf_Nombre: 1,
          prf_Codigo: 1,
          prf_Estado: 1,
          prf_Fecha_Creacion: 1,
          prf_Creacion_Id: 1,
          prf_Creacion_Nombre: 1,
          prf_Fecha_Actualizacion: 1,
          prf_Actualizacion_Id: 1,
          prf_Actualizacion_Nombre: 1,
          prf_Fecha_Eliminacion: 1,
          prf_Eliminacion_Id: 1,
          prf_Eliminacion_Nombre: 1
          
        },
      },
    ]);
    return docs.length ? this._toEntity(docs[0]) : null;
  }

 

  async create(data) {

    const payload = {
      prf_Nombre: data.nombre,
      prf_Codigo: data.codigo,
      prf_Estado: true,
      prf_Fecha_Creacion: new Date(),
      prf_Creacion: data.usuarioCreacion
    };

    const doc = new PerfilesSchema(payload);
    const saved = await doc.save();
            
    if (!saved || !saved._id) throw new Error('No se pudo crear el perfil');
            
    return this._toEntity(saved);

    
  }

  async update(data) {
    
    const payload = {
      prf_Nombre: data.nombre,
      prf_Codigo: data.codigo,
      prf_Fecha_Actualizacion: new Date(),
      prf_Usr_Actualizacion: data.usuarioActualizacion
    };
    const doc = await PerfilesSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el perfil');
    return this._toEntity(doc);
  }



}

module.exports = PerfilesSchemaRepository;