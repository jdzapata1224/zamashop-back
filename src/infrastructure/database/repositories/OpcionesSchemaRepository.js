const OpcionesRepository = require('../../../domain/repositories/IOpcionesRepository');
const OpcionesSchema = require('../models/OpcionesSchema');
const OpcionesUsuariosSchema = require('../models/OpcionesUsuariosSchema');
const Opciones = require('../../../domain/entities/Opciones');
const OpcionesUsuarios = require('../../../domain/entities/OpcionesUsuarios');
const { Types } = require('mongoose');

class OpcionesSchemaRepository extends OpcionesRepository {

  // Mongoose doc → Domain Entity
 _toEntity(doc) {
    return new Opciones({
      id: doc._id.toString(),
      nombre: doc.opc_Nombre,
      codigo: doc.opc_Codigo,
      tipoOpcion: doc.opc_TipoOpcion,
      estado: doc.opc_Estado,
      fechaCreacion: doc.opc_Fecha_Creacion,
      usuarioCreacionId: doc.opc_Creacion_Id,
      usuarioCreacionNombre: doc.opc_Creacion_Nombre ? doc.opc_Creacion_Nombre.toString() : null,
      fechaActualizacion: doc.opc_Fecha_Actualizacion ?? null,
      usuarioActualizacionId: doc.opc_Actualizacion_Id,
      usuarioActualizacionNombre: doc.opc_Actualizacion_Nombre ? doc.opc_Actualizacion_Nombre.toString() : null,
      fechaEliminacion: doc.opc_Fecha_Eliminacion ?? null,
      usuarioEliminacionId: doc.opc_Eliminacion_Id,
      usuarioEliminacionNombre: doc.opc_Eliminacion_Nombre ? doc.opc_Eliminacion_Nombre.toString() : null,
    });
  }


  async findById(id) {


    const doc = await OpcionesSchema.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          $or: [
            { opc_Fecha_Eliminacion: null },
            { opc_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      // Usuario creación (siempre presente)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'opc_Usr_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

      // Usuario actualización (opcional)
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'opc_Usr_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

      {
        $set: {

          opc_Creacion_Id: '$usuarioCreacion._id',
          opc_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
            ],
          },

          opc_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          opc_Actualizacion_Nombre: {
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
          opc_Codigo: 1,
          opc_Nombre: 1,
          opc_TipoOpcion: 1,
          opc_Estado: 1,
          opc_Fecha_Creacion: 1,
          opc_Creacion_Id: 1,
          opc_Creacion_Nombre: 1,
          opc_Fecha_Actualizacion: 1,
          opc_Actualizacion_Id: 1,
          opc_Actualizacion_Nombre: 1
        },
      },
    ]);
    return doc ? this._toEntity(doc) : null;
  }

  async find() {
    const docs = await OpcionesSchema.aggregate([
      {
        $match: {
          $or: [
            { opc_Fecha_Eliminacion: null },
            { opc_Fecha_Eliminacion: { $exists: false } },
          ],
        },
      },
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'opc_Usr_Creacion',
          foreignField: '_id',
          as: 'usuarioCreacion',
        },
      },
      { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'Usuarios',
          localField: 'opc_Usr_Actualizacion',
          foreignField: '_id',
          as: 'usuarioActualizacion',
        },
      },
      { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },
      {
        $set: {
          opc_Creacion_Id: '$usuarioCreacion._id',
          opc_Creacion_Nombre: {
            $concat: [
              { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
              ' ',
              { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
            ],
          },
          opc_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
          opc_Actualizacion_Nombre: {
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
          opc_Codigo: 1,
          opc_Nombre: 1,
          opc_Estado: 1,
           opc_TipoOpcion: 1,
          opc_Fecha_Creacion: 1,
          opc_Creacion_Id: 1,
          opc_Creacion_Nombre: 1,
          opc_Fecha_Actualizacion: 1,
          opc_Actualizacion_Id: 1,
          opc_Actualizacion_Nombre: 1
        },
      },
    ]);

    return docs.map(doc => this._toEntity(doc));
  }

  async create(data) {

    const payload = {
      opc_Nombre: data.nombre,
      opc_Codigo: data.codigo,
      opc_TipoOpcion: data.tipoOpcion,
      opc_Estado: true,
      opc_Fecha_Creacion: new Date(),
      opc_Usr_Creacion:data.usuarioCreacion
    };

    const doc = new OpcionesSchema(payload);
    const saved = await doc.save();
                
    if (!saved || !saved._id) throw new Error('No se pudo crear la opcion');
                
    return this._toEntity(saved);

  }

  async delete(data) {

    const payload = {
      opc_Fecha_Eliminacion: new Date(),
      opc_Usr_Eliminacion: data.usuarioEliminacion
    };

    const doc = await OpcionesSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar la opcion');
    return this._toEntity(doc);


  }

  async findByCodigo(codigo) {
    const doc = await OpcionesSchema.findOne({ opc_Codigo: codigo });
    return doc ? this._toEntity(doc) : null;
  }

  async changeStatus(data) {

    const payload = {
      opc_Fecha_Actualizacion: new Date(),
      opc_Estado: data.estado,
      opc_Usr_Actualizacion: data.usuarioActualizacion
    };

    const doc = await OpcionesSchema.findByIdAndUpdate(
      data.id,
      { $set: payload },
      { new: true }
    );

    if (!doc || !doc._id) throw new Error('No se pudo actualizar la opcion');
    return this._toEntity(doc);


  }
}

module.exports = OpcionesSchemaRepository;