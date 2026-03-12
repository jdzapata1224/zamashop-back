const { Types }              = require('mongoose');
const OpcionesPerfilesSchema = require('../models/OpcionesPerfilesSchema');
const OpcionesPerfiles       = require('../../../domain/entities/OpcionesPerfiles');

class OpcionesPerfilesSchemaRepository {

  _toEntity(doc) {
    return new OpcionesPerfiles({
      id:               doc._id.toString(),
      nombre:           doc.nombre,
      codigo:           doc.codigo,
      tipoOpcion:     doc.tipoOpcion,
      
      hijos: (doc.hijos || []).map(h => ({
        id:               h._id.toString(),
        nombre:           h.nombre,
        codigo:           h.codigo,
        tipoOpcion:     h.tipoOpcion
      })),
    });
  }

  async findByPerfilId(perfilId) {
    if (!Types.ObjectId.isValid(perfilId)) return [];

    const docs = await OpcionesPerfilesSchema.aggregate([
      // 1. Filtrar registros del usuario
      {
        $match: {
          opr_Prf_Id:            new Types.ObjectId(perfilId),
          opr_Fecha_Eliminacion: { $in: [null, undefined] },
        }
      },
      // 2. Traer la opcion asignada (puede ser padre o hijo)
      {
        $lookup: {
          from:         'Opciones',
          localField:   'opr_Opc_Id',
          foreignField: '_id',
          as:           'opcion'
        }
      },
      { $unwind: '$opcion' },
      {
        $lookup: {
          from:         'Opciones',
          localField:   'opcion.opc_Padre_Id',
          foreignField: '_id',
          as:           'padre'
        }
      },
      { $unwind: { path: '$padre', preserveNullAndEmptyArrays: true } },
     
      // 6. Normalizar: definir quién es el padre del grupo y quién es hijo
      {
        $project: {
          // Si tiene padre -> la opcion es hijo; si no -> la opcion es el padre del grupo
          tienepadre: { $cond: [{ $ifNull: ['$opcion.opc_Padre_Id', false] }, true, false] },

          // Datos del padre del grupo
          grupoId:     { $ifNull: ['$padre._id',         '$opcion._id']         },
          grupoNombre: { $ifNull: ['$padre.opc_Nombre',  '$opcion.opc_Nombre']  },
          grupoCodigo: { $ifNull: ['$padre.opc_Codigo',  '$opcion.opc_Codigo']  },
          grupoTipo: { $ifNull: ['$padre.opc_TipoOpcion',  '$opcion.opc_TipoOpcion']  },

          // Datos del hijo (solo aplica si tienepadre = true)
          hijoId:     '$opcion._id',
          hijoNombre: '$opcion.opc_Nombre',
          hijoCodigo: '$opcion.opc_Codigo',
          hijoTipo: '$opcion.opc_TipoOpcion',
        }
      },
      // 7. Agrupar por padre, acumulando hijos
      {
        $group: {
          _id:      '$grupoId',
          nombre:   { $first: '$grupoNombre' },
          codigo:   { $first: '$grupoCodigo' },
          tipoOpcion: { $first: '$grupoTipo' },
          hijos: {
            $push: {
              $cond: [
                '$tienepadre',
                { _id: '$hijoId', nombre: '$hijoNombre', codigo: '$hijoCodigo', tipoOpcion: '$hijoTipo' },
                '$$REMOVE'
              ]
            }
          }
        }
      },
      { $sort: { nombre: 1 } }
    ]);

    return docs.map(doc => this._toEntity(doc));
  }

  async findByPerfilYOpcion(perfilId, opcionId) {
  return OpcionesPerfilesSchema.findOne({
    opr_Prf_Id: new Types.ObjectId(perfilId),
    opr_Opc_Id: new Types.ObjectId(opcionId),
    opr_Fecha_Eliminacion: { $in: [null, undefined] },
  });
}

async createOne(perfilId, opcionId, usuarioCreacion) {
  await OpcionesPerfilesSchema.create({
    opr_Prf_Id:         new Types.ObjectId(perfilId),
    opr_Opc_Id:         new Types.ObjectId(opcionId),
    opr_Fecha_Creacion: new Date(),
    ...(Types.ObjectId.isValid(usuarioCreacion) && {
      opr_Usr_Creacion: new Types.ObjectId(usuarioCreacion),
    }),
  });
}

async deleteOne(perfilId, opcionId) {
  await OpcionesPerfilesSchema.deleteOne({
    opr_Prf_Id: new Types.ObjectId(perfilId),
    opr_Opc_Id: new Types.ObjectId(opcionId)
  });
}
}

module.exports = OpcionesPerfilesSchemaRepository;
