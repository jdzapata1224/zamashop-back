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
    
    const docs = await CategoriasSchema.aggregate([
      {
        $match: {
          _id: id,
          $or: [
            { cat_Fecha_Eliminacion: null },
            { cat_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      {
        $lookup: {
          from:         'Categorias',
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
          from:         'Categorias',
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
    if (!Types.ObjectId.isValid(data.id)) return null;
    
    const payload = {
      cat_Fecha_Eliminacion: new Date(),
    };

    // usr_Eliminacion solo se guarda si es un ObjectId válido
    if (data.usuarioEliminacion && Types.ObjectId.isValid(data.usuarioEliminacion)) {
      payload.cat_Usr_Eliminacion = new Types.ObjectId(data.usuarioEliminacion);
    }

    const doc = await CategoriasSchema.findByIdAndUpdate(
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
          from:         'Categorias',
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
    return docs.map(doc => this._toEntity(doc));
  }

  async create(data) {

   const payload={
      cat_Nombre:        data.nombre,
      cat_Descripcion:      data.descripcion,
      cat_Estado:         true,
      cat_Fecha_Creacion: new Date(),
    };

    if (data.usuarioCreacion && Types.ObjectId.isValid(data.usuarioCreacion)) {
      payload.cat_Usr_Creacion = new Types.ObjectId(data.usuarioCreacion);
    }

    const doc = await CategoriasSchema.create(payload);


    if (!doc || !doc._id) throw new Error('No se pudo crear el usuario');

    return this._toEntity(doc);
  }

 async update(data) {
    const payload={
      cat_Nombre:        data.nombre,
      cat_Descripcion:      data.descripcion,
      cat_Estado:         true,
      cat_Fecha_Creacion: new Date(),
    };

    if (data.usuarioActualizacion && Types.ObjectId.isValid(data.usuarioActualizacion)) {
      payload.cat_Usr_Actualizacion = new Types.ObjectId(data.usuarioActualizacion);
    }

    const doc = await CategoriasSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
    return this._toEntity(doc);
  }

}

module.exports = CategoriasSchemaRepository;