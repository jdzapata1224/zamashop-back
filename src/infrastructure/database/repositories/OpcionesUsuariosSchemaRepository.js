const { Types }              = require('mongoose');
const OpcionesUsuariosSchema = require('../models/OpcionesUsuariosSchema');
const OpcionesUsuarios       = require('../../../domain/entities/OpcionesUsuarios');

class OpcionesUsuariosSchemaRepository {

  _toEntity(doc) {
    return new OpcionesUsuarios({
      id:              doc._id.toString(),
      nombre:          doc.nombre,
      codigo:          doc.codigo,
      tipoOpcionId:    doc.tipoOpcion ? doc.tipoOpcion._id.toString() : null,
      tipoOpcionNombre:doc.tipoOpcion ? doc.tipoOpcion.nombre : null,
      hijos: (doc.hijos || []).map(h => ({
        id:               h._id.toString(),
        nombre:           h.nombre,
        codigo:           h.codigo,
        tipoOpcionId:     h.tipoOpcion ? h.tipoOpcion._id.toString() : null,
        tipoOpcionNombre: h.tipoOpcion ? h.tipoOpcion.nombre : null,
      })),
    });
  }

  async findByUsuarioId(usuarioId) {
    if (!Types.ObjectId.isValid(usuarioId)) return [];

    const docs = await OpcionesUsuariosSchema.aggregate([
      // 1. Filtrar registros del usuario
      {
        $match: {
          ous_Usr_Id:            new Types.ObjectId(usuarioId),
          ous_Fecha_Eliminacion: { $in: [null, undefined] },
        }
      },
      // 2. Cruzar con Opciones para obtener la opcion asignada
      {
        $lookup: {
          from:         'Opciones',
          localField:   'ous_Opc_Id',
          foreignField: '_id',
          as:           'opcion'
        }
      },
      { $unwind: { path: '$opcion', preserveNullAndEmptyArrays: true } },
      // 3. Cruzar la opcion con su TipoOpcion
      {
        $lookup: {
          from:         'TipoOpcion',
          localField:   'opcion.opc_Top_Id',
          foreignField: '_id',
          as:           'opcion.tipoOpcionArr'
        }
      },
      { $unwind: { path: '$opcion.tipoOpcionArr', preserveNullAndEmptyArrays: true } },
      // 4. Cruzar la opcion con su Padre
      {
        $lookup: {
          from:         'Opciones',
          localField:   'opcion.opc_Padre_Id',
          foreignField: '_id',
          as:           'opcion.padreArr'
        }
      },
      { $unwind: { path: '$opcion.padreArr', preserveNullAndEmptyArrays: true } },
      // 5. Cruzar el padre con su TipoOpcion
      {
        $lookup: {
          from:         'TipoOpcion',
          localField:   'opcion.padreArr.opc_Top_Id',
          foreignField: '_id',
          as:           'opcion.padreTipoArr'
        }
      },
      { $unwind: { path: '$opcion.padreTipoArr', preserveNullAndEmptyArrays: true } },
      // 6. Proyectar campos normalizados
      {
        $project: {
          hijoId:           '$opcion._id',
          hijoNombre:       '$opcion.opc_Nombre',
          hijoCodigo:       '$opcion.opc_Codigo',
          hijoTipoOpcion: {
            _id:    '$opcion.tipoOpcionArr._id',
            nombre: '$opcion.tipoOpcionArr.top_Nombre',
          },
          padreId:          { $ifNull: ['$opcion.padreArr._id',         '$opcion._id']         },
          padreNombre:      { $ifNull: ['$opcion.padreArr.opc_Nombre',  '$opcion.opc_Nombre']  },
          padreCodigo:      { $ifNull: ['$opcion.padreArr.opc_Codigo',  '$opcion.opc_Codigo']  },
          padreTipoOpcion: {
            _id:    { $ifNull: ['$opcion.padreTipoArr._id',         '$opcion.tipoOpcionArr._id']         },
            nombre: { $ifNull: ['$opcion.padreTipoArr.top_Nombre',  '$opcion.tipoOpcionArr.top_Nombre']  },
          },
          // Si no tiene padre, la opcion misma es el padre -> no es hijo
          esHijo: { $cond: [{ $ifNull: ['$opcion.opc_Padre_Id', false] }, true, false] },
        }
      },
      // 7. Agrupar por padre
      {
        $group: {
          _id:      '$padreId',
          nombre:   { $first: '$padreNombre' },
          codigo:   { $first: '$padreCodigo' },
          tipoOpcion: { $first: '$padreTipoOpcion' },
          hijos: {
            $push: {
              $cond: [
                '$esHijo',
                {
                  _id:       '$hijoId',
                  nombre:    '$hijoNombre',
                  codigo:    '$hijoCodigo',
                  tipoOpcion:'$hijoTipoOpcion',
                },
                '$$REMOVE'
              ]
            }
          }
        }
      },
    ]);

    return docs.map(doc => this._toEntity(doc));
  }
}
module.exports = OpcionesUsuariosSchemaRepository;