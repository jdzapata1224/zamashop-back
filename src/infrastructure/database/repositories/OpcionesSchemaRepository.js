const OpcionesRepository  = require('../../../domain/repositories/IOpcionesRepository');
const OpcionesSchema  = require('../models/OpcionesSchema');
const OpcionesUsuariosSchema  = require('../models/OpcionesUsuariosSchema');
const Opciones            = require('../../../domain/entities/Opciones');
const OpcionesUsuarios            = require('../../../domain/entities/OpcionesUsuarios');
const { Types } = require('mongoose');

class OpcionesSchemaRepository extends OpcionesRepository {

  // Mongoose doc → Domain Entity
  _toEntity(doc) {
    return new Opciones({
      id:             doc._id.toString(),
      nombre:  doc.opc_Nombre,
      codigo:       doc.opc_Codigo,
      estado:         doc.opc_Estado,
      fechaCreacion:  doc.opc_Fecha_Creacion,
      usuarioCreacion:       doc.opc_Usr_Creacion ? doc.opc_Usr_Creacion.toString() : null,
      fechaActualizacion:  doc.opc_Fecha_Actualizacion ?? null,
      usuarioActualizacion:       doc.opc_Usr_Actualizacion ? doc.opc_Usr_Actualizacion.toString() : null, 
      fechaEliminacion:  doc.opc_Fecha_Eliminacion ?? null,
      usuarioEliminacion:       doc.opc_Usr_Eliminacion ? doc.opc_Usr_Eliminacion.toString() : null,
    });
  }


  async findById(id) {
      if (!Types.ObjectId.isValid(id)) {
        return null;
      }
      const doc = await OpcionesSchema.findOne({
        _id: new Types.ObjectId(id),
        opc_Fecha_Eliminacion: { $in: [null, undefined] },
      });
      return doc ? this._toEntity(doc) : null;
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
    { $unwind: { path: '$perfil', preserveNullAndEmptyArrays: false } },

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
      $lookup: {
        from: 'Usuarios',
        localField: 'usr_Eliminacion',
        foreignField: '_id',
        as: 'usuarioEliminacion',
      },
    },
    { $unwind: { path: '$usuarioEliminacion', preserveNullAndEmptyArrays: true } },

    {
      $set: {
        perfilId: '$perfil._id',
        perfilNombre: '$perfil.prf_Nombre',
        creacionId: '$usuarioCreacion._id',
        creacionNombre: {
          $concat: [
            { $ifNull: ['$usuarioCreacion.usr_Nombre', ''] },
            ' ',
            { $ifNull: ['$usuarioCreacion.usr_Apellido', ''] },
          ],
        },

        actualizacionId: { $ifNull: ['$usuarioActualizacion._id', null] },
        actualizacionNombre: {
          $cond: {
            if: { $ifNull: ['$usuarioActualizacion._id', false] },
            then: {
              $concat: [
                { $ifNull: ['$usuarioActualizacion.usr_Nombre', ''] },
                ' ',
                { $ifNull: ['$usuarioActualizacion.usr_Apellido', ''] },
              ],
            },
            else: null,
          },
        },

        eliminacionId: { $ifNull: ['$usuarioEliminacion._id', null] },
        eliminacionNombre: {
          $cond: {
            if: { $ifNull: ['$usuarioEliminacion._id', false] },
            then: {
              $concat: [
                { $ifNull: ['$usuarioEliminacion.usr_Nombre', ''] },
                ' ',
                { $ifNull: ['$usuarioEliminacion.usr_Apellido', ''] },
              ],
            },
            else: null,
          },
        },
      },
    },
  ]);

    return docs.map(doc => this._toEntity(doc));


  }

  async create(data) {
   
     const payload={
        opc_Nombre:        data.nombre,
        opc_Codigo:        data.codigo,
        opc_Estado:         true,
        opc_Fecha_Creacion: new Date(),
      };
  
      if (data.usuarioCreacion && Types.ObjectId.isValid(data.usuarioCreacion)) {
        payload.opc_Usr_Creacion = new Types.ObjectId(data.usuarioCreacion);
      }
  
      const doc = await OpcionesSchema.create(payload);
  
  
      if (!doc || !doc._id) throw new Error('No se pudo crear la opción');
  
      return this._toEntity(doc);
  }

  async delete(data) {
      if (!Types.ObjectId.isValid(data.id)) return null;
      
      const payload = {
        opc_Fecha_Eliminacion: new Date(),
      };
  
      // usr_Eliminacion solo se guarda si es un ObjectId válido
      if (data.usuarioEliminacion && Types.ObjectId.isValid(data.usuarioEliminacion)) {
        payload.opc_Usr_Eliminacion = new Types.ObjectId(data.usuarioEliminacion);
      }
  
      const doc = await OpcionesSchema.findByIdAndUpdate(
        new Types.ObjectId(data.id),  // ← corregido: era `id` sin definir
        { $set: payload },
        { new: true }                 // ← sin upsert: si no existe, no crea
      );
  
      if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
      return this._toEntity(doc);
  
     
  }

    async findByCodigo(codigo) {
      const doc = await OpcionesSchema.findOne({ opc_Codigo: codigo });
        return doc ? this._toEntity(doc) : null;
    }
  
  async changeStatus(data) {
      if (!Types.ObjectId.isValid(data.id)) return null;
      
      const payload = {
        opc_Fecha_Actualizacion: new Date(),
        opc_Estado: data.estado,
      };
  
      // usr_Eliminacion solo se guarda si es un ObjectId válido
      if (data.usuarioActualizacion && Types.ObjectId.isValid(data.usuarioActualizacion)) {
        payload.opc_Usr_Actualizacion = new Types.ObjectId(data.usuarioActualizacion);
      }
  
      const doc = await OpcionesSchema.findByIdAndUpdate(
        new Types.ObjectId(data.id),  // ← corregido: era `id` sin definir
        { $set: payload },
        { new: true }                 // ← sin upsert: si no existe, no crea
      );
  
      if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
      return this._toEntity(doc);
  
     
  }
}
       
module.exports = OpcionesSchemaRepository;