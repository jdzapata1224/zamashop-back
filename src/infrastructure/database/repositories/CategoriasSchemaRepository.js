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
      fechaCreacion: doc.cat_Fecha_Creacion,
      usuarioCreacionId: doc.cat_Creacion_Id,
      usuarioCreacionNombre: doc.cat_Creacion_Nombre ? doc.cat_Creacion_Nombre.toString() : null,
      fechaActualizacion: doc.cat_Fecha_Actualizacion ?? null,
      usuarioActualizacionId: doc.cat_Actualizacion_Id,
      usuarioActualizacionNombre: doc.cat_Actualizacion_Nombre ? doc.cat_Actualizacion_Nombre.toString() : null,
      fechaEliminacion: doc.cat_Fecha_Eliminacion ?? null,
      usuarioEliminacionId: doc.cat_Eliminacion_Id,
      usuarioEliminacionNombre: doc.cat_Eliminacion_Nombre ? doc.cat_Eliminacion_Nombre.toString() : null,
    });
  }


  async findById(id) {
    
    const docs = await CategoriasSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          $or: [
            { cat_Fecha_Eliminacion: null },
            { cat_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
       {
        $lookup: {
          from: 'Usuarios',
          localField: 'cat_Usr_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'cat_Usr_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      {
        $set: {

          cat_Creacion_Id: '$usuarioCreacion._id',
          cat_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
            ],
          },

          cat_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          cat_Actualizacion_Nombre: {
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
          },
        },
      },
      {
        $project: {
          cat_Codigo: 1,
          cat_Nombre: 1,
          cat_Descripcion: 1,
          cat_Estado: 1,
          cat_Fecha_Creacion: 1,
          cat_Creacion_Id: 1,
          cat_Creacion_Nombre: 1,
          cat_Fecha_Actualizacion: 1,
          cat_Actualizacion_Id: 1,
          cat_Actualizacion_Nombre: 1
        },
      },
    ]);
    return docs.length ? this._toEntity(docs[0]) : null;
  }

  async findByNombre(nombre) {
  
    const docs = await CategoriasSchema.aggregate([
      {
        $match: {
          cat_Nombre: nombre,
          $or: [
            { cat_Fecha_Eliminacion: null },
            { cat_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      {
        $lookup: {
          from:         'Usuarios',
          localField:   'cat_Usr_Creacion',
          foreignField: '_id',
          as:           'usuarioCreacion',
        },
      },
      {
        $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true },
      },
      {
        $set: {
          usuarioId: '$usuarioCreacion._id',
          usuarioNombre: {
            $trim: {
              input: {
                $concat: [
                  { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                  {
                    $cond: [
                      { $gt: [{ $ifNull: ['$usuarioCreacion.usr_Segundo_Nombre', null] }, null] },
                      { $concat: [' ', '$usuarioCreacion.usr_Segundo_Nombre'] },
                      '',
                    ],
                  },
                  { $concat: [' ', { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] }] },
                  {
                    $cond: [
                      { $gt: [{ $ifNull: ['$usuarioCreacion.usr_Segundo_Apellido', null] }, null] },
                      { $concat: [' ', '$usuarioCreacion.usr_Segundo_Apellido'] },
                      '',
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    return docs.length ? this._toEntity(docs[0]) : null;
  }

  async delete(data) {
    
    const payload = {
      cat_Fecha_Eliminacion: new Date(),
      cat_Usr_Eliminacion: data.usuarioEliminacion
    };


    const doc = await CategoriasSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar la categoria');
    return this._toEntity(doc);

   
  }

   async changeStatus(data) {
    if (!Types.ObjectId.isValid(data.id)) return null;
    
    const payload = {
      cat_Fecha_Actualizacion: new Date(),
      cat_Estado: data.estado,
    };

    // usr_Eliminacion solo se guarda si es un ObjectId válido
    if (data.usuarioActualizacion && Types.ObjectId.isValid(data.usuarioActualizacion)) {
      payload.cat_Usr_Actualizacion = new Types.ObjectId(data.usuarioActualizacion);
    }

    const doc = await CategoriasSchema.findByIdAndUpdate(
      new Types.ObjectId(data.id),  // ← corregido: era `id` sin definir
      { $set: payload },
      { new: true }                 // ← sin upsert: si no existe, no crea
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
    return this._toEntity(doc);

   
  }

  async find() {
    const docs = await CategoriasSchema.aggregate([
      {
        $match: {
          $or: [
            { cat_Fecha_Eliminacion: null },
            { cat_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
        {
        $lookup: {
          from: 'Usuarios',
          localField: 'cat_Usr_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'cat_Usr_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      {
        $set: {

          cat_Creacion_Id: '$usuarioCreacion._id',
          cat_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
            ],
          },

          cat_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          cat_Actualizacion_Nombre: {
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
          },
        },
      },
      {
        $project: {
          cat_Codigo: 1,
          cat_Nombre: 1,
          cat_Descripcion: 1,
          cat_Estado: 1,
          cat_Fecha_Creacion: 1,
          cat_Creacion_Id: 1,
          cat_Creacion_Nombre: 1,
          cat_Fecha_Actualizacion: 1,
          cat_Actualizacion_Id: 1,
          cat_Actualizacion_Nombre: 1
        },
      },
    ]);
    return docs.map(doc => this._toEntity(doc));
  }

  async create(data) {

   const payload={
      cat_Nombre:        data.nombre,
      cat_Descripcion:      data.descripcion,
      cat_Estado:         true,
      cat_Fecha_Creacion: new Date(),
      cat_Usr_Creacion:data.usuarioCreacion
    };

    const doc = new CategoriasSchema(payload);
    const saved = await doc.save();
                            
    if (!saved || !saved._id) throw new Error('No se pudo crear la categoria');
                            
    return this._toEntity(saved);

    
  }

 async update(data) {
    const payload={
      cat_Nombre:        data.nombre,
      cat_Descripcion:      data.descripcion,
      cat_Fecha_Actualizacion: new Date(),
      cat_Usr_Actualizacion:data.usuarioActualizacion
    };

    const doc = await CategoriasSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar la categoria');
    return this._toEntity(doc);
  }

}

module.exports = CategoriasSchemaRepository;