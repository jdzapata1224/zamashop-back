const { Types }              = require('mongoose');
const OpcionesUsuariosSchema = require('../models/OpcionesUsuariosSchema');
const OpcionesUsuarios       = require('../../../domain/entities/OpcionesUsuarios');

class OpcionesUsuariosSchemaRepository {

  _toEntity(doc) {
    return new OpcionesUsuarios({
      id:               doc._id.toString(),
      nombre:           doc.nombre,
      codigo:           doc.codigo,
      tipoOpcionId:     doc.tipoOpcion?._id?.toString() || null,
      tipoOpcionNombre: doc.tipoOpcion?.nombre || null,
      hijos: (doc.hijos || []).map(h => ({
        id:               h._id.toString(),
        nombre:           h.nombre,
        codigo:           h.codigo,
        tipoOpcionId:     h.tipoOpcion?._id?.toString() || null,
        tipoOpcionNombre: h.tipoOpcion?.nombre || null,
      })),
    });
  }

  async findByUsuarioId(usuarioId) {
    
    const docs = await OpcionesUsuariosSchema.aggregate([      
      {
        $match: {
          ous_Usr_Id:            new Types.ObjectId(usuarioId),
          ous_Fecha_Eliminacion: { $in: [null, undefined] },
        }
      },
      {
        $lookup: {
          from:         'Opciones',
          localField:   'ous_Opc_Id',
          foreignField: '_id',
          as:           'opcion'
        }
      },
      { $unwind: '$opcion' },
      {
        $lookup: {
          from:         'TipoOpcion',
          localField:   'opcion.opc_Top_Id',
          foreignField: '_id',
          as:           'opcionTipo'
        }
      },
      { $unwind: { path: '$opcionTipo', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from:         'Opciones',
          localField:   'opcion.opc_Padre_Id',
          foreignField: '_id',
          as:           'padre'
        }
      },
      { $unwind: { path: '$padre', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from:         'TipoOpcion',
          localField:   'padre.opc_Top_Id',
          foreignField: '_id',
          as:           'padreTipo'
        }
      },
      { $unwind: { path: '$padreTipo', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          tienepadre: { $cond: [{ $ifNull: ['$opcion.opc_Padre_Id', false] }, true, false] },
          grupoId:     { $ifNull: ['$padre._id',         '$opcion._id']         },
          grupoNombre: { $ifNull: ['$padre.opc_Nombre',  '$opcion.opc_Nombre']  },
          grupoCodigo: { $ifNull: ['$padre.opc_Codigo',  '$opcion.opc_Codigo']  },
          grupoTipo: {
            _id:    { $ifNull: ['$padreTipo._id',         '$opcionTipo._id']         },
            nombre: { $ifNull: ['$padreTipo.top_Nombre',  '$opcionTipo.top_Nombre']  },
          },
          hijoId:     '$opcion._id',
          hijoNombre: '$opcion.opc_Nombre',
          hijoCodigo: '$opcion.opc_Codigo',
          hijoTipo: {
            _id:    '$opcionTipo._id',
            nombre: '$opcionTipo.top_Nombre',
          },
        }
      },
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

  async createMany(usuarioId, opcionesPerfil, usuarioCreacion) {
    const { Types } = require('mongoose');
    
    const docs = [];
    for (const opcion of opcionesPerfil) {
      docs.push({
        ous_Usr_Id:        new Types.ObjectId(usuarioId),
        ous_Opc_Id:        new Types.ObjectId(opcion.id),
        ous_Fecha_Creacion: new Date(),
        ...(Types.ObjectId.isValid(usuarioCreacion) && {
          ous_Usr_Creacion: new Types.ObjectId(usuarioCreacion),
        }),
      });
      for (const hijo of opcion.hijos) {
        docs.push({
          ous_Usr_Id:        new Types.ObjectId(usuarioId),
          ous_Opc_Id:        new Types.ObjectId(hijo.id),
          ous_Fecha_Creacion: new Date(),
          ...(Types.ObjectId.isValid(usuarioCreacion) && {
            ous_Usr_Creacion: new Types.ObjectId(usuarioCreacion),
          }),
        });
      }
    }

    if (docs.length > 0) {
      await OpcionesUsuariosSchema.insertMany(docs);
    }
  }

  async deleteByUsuarioId(usuarioId, usuarioEliminacion) {
    if (!Types.ObjectId.isValid(usuarioId)) return;

    const payload = {
      ous_Fecha_Eliminacion: new Date(),
      ...(Types.ObjectId.isValid(usuarioEliminacion) && {
        ous_Usr_Eliminacion: new Types.ObjectId(usuarioEliminacion),
      }),
    };

    await OpcionesUsuariosSchema.deleteMany(
      {
        ous_Usr_Id:            new Types.ObjectId(usuarioId),
        ous_Fecha_Eliminacion: { $in: [null, undefined] },
      },
      { $set: payload }
    );
  }

  async findByUsuarioYOpcion(usuarioId, opcionId) {
  return OpcionesUsuariosSchema.findOne({
    ous_Usr_Id: new Types.ObjectId(usuarioId),
    ous_Opc_Id: new Types.ObjectId(opcionId),
    ous_Fecha_Eliminacion: { $in: [null, undefined] },
  });
}

async createOne(usuarioId, opcionId, usuarioCreacion) {
  await OpcionesUsuariosSchema.create({
    ous_Usr_Id:         new Types.ObjectId(usuarioId),
    ous_Opc_Id:         new Types.ObjectId(opcionId),
    ous_Fecha_Creacion: new Date(),
    ...(Types.ObjectId.isValid(usuarioCreacion) && {
      ous_Usr_Creacion: new Types.ObjectId(usuarioCreacion),
    }),
  });
}

async deleteOne(usuarioId, opcionId) {
  await OpcionesUsuariosSchema.deleteOne({
    ous_Usr_Id: new Types.ObjectId(usuarioId),
    ous_Opc_Id: new Types.ObjectId(opcionId),
    
  });
}
}

module.exports = OpcionesUsuariosSchemaRepository;
