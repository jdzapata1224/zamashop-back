const TallasRepository = require('../../../domain/repositories/ITallasRepository');
const TallasSchema = require('../models/TallasSchema');
const Tallas = require('../../../domain/entities/Tallas');

class TallasSchemaRepository extends TallasRepository {

    _toEntity(doc) {
        return new Tallas({
            id: doc._id.toString(),
            nombre: doc.tal_Nombre,
            orden: doc.tal_Orden,
            estado: doc.tal_Estado,
            fechaCreacion: doc.tal_Fecha_Creacion,
            usuarioCreacion: doc.tal_Usr_Creacion ? doc.tal_Usr_Creacion.toString() : null,
            fechaActualizacion: doc.tal_Fecha_Actualizacion ?? null,
            usuarioActualizacion: doc.tal_Usr_Actualizacion ? doc.tal_Usr_Actualizacion.toString() : null,
            fechaEliminacion: doc.tal_Fecha_Eliminacion ?? null,
            usuarioEliminacion: doc.tal_Usr_Eliminacion ? doc.tal_Usr_Eliminacion.toString() : null,
        });
    }


    async findById(id) {
        const docs = await TallasSchema.aggregate([
            {
                $match: {
                     _id: id,
                    $or: [
                        { tal_Fecha_Eliminacion: null },
                        { tal_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'tal_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'tal_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    tal_Creacion_Id: '$usuarioCreacion._id',
                    tal_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    tal_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    tal_Actualizacion_Nombre: {
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
                  
                    tal_Codigo: 1,
                    tal_Nombre: 1,
                    tal_Orden: 1,
                    tal_Estado: 1,
                    tal_Fecha_Creacion: 1,
                    tal_Creacion_Id: 1,
                    tal_Creacion_Nombre: 1,
                    tal_Fecha_Actualizacion: 1,
                    tal_Actualizacion_Id: 1,
                    tal_Actualizacion_Nombre: 1
                },
            },
        ]);
     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async findByNombre(nombre) {
        const docs = await TallasSchema.aggregate([
            {
                $match: {
                    tal_Nombre: nombre,
                    $or: [
                        { tal_Fecha_Eliminacion: null },
                        { tal_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'tal_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'tal_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    tal_Creacion_Id: '$usuarioCreacion._id',
                    tal_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    tal_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    tal_Actualizacion_Nombre: {
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
                  
                    tal_Codigo: 1,
                    tal_Nombre: 1,
                    tal_Orden: 1,
                    tal_Estado: 1,
                    tal_Fecha_Creacion: 1,
                    tal_Creacion_Id: 1,
                    tal_Creacion_Nombre: 1,
                    tal_Fecha_Actualizacion: 1,
                    tal_Actualizacion_Id: 1,
                    tal_Actualizacion_Nombre: 1
                },
            },
        ]);
     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async delete(data) {

        const payload = {
            tal_Fecha_Eliminacion: new Date(),
            tal_Usr_Eliminacion: data.usuarioEliminacion
        };


        const doc = await TallasSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);


    }

    async changeStatus(data) {
      
        const payload = {
            tal_Fecha_Actualizacion: new Date(),
            tal_Estado: data.estado,
            tal_Usr_Actualizacion:data.usuarioActualizacion
        };


        const doc = await TallasSchema.findByIdAndUpdate(
            data.id, 
            { $set: payload },
            { new: true }       
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);


    }

    async find() {
        const docs = await TallasSchema.aggregate([
            {
                $match: {
                    $or: [
                        { tal_Fecha_Eliminacion: null },
                        { tal_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'tal_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'tal_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    tal_Creacion_Id: '$usuarioCreacion._id',
                    tal_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    tal_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    tal_Actualizacion_Nombre: {
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
                  
                    tal_Codigo: 1,
                    tal_Nombre: 1,
                    tal_Orden: 1,
                    tal_Estado: 1,
                    tal_Fecha_Creacion: 1,
                    tal_Creacion_Id: 1,
                    tal_Creacion_Nombre: 1,
                    tal_Fecha_Actualizacion: 1,
                    tal_Actualizacion_Id: 1,
                    tal_Actualizacion_Nombre: 1
                },
            },
        ]);

        return docs.map(doc => this._toEntity(doc));
    }

    async create(data) {

        const payload = {
            tal_Nombre: data.nombre,
            tal_Orden: data.orden,
            tal_Estado: true,
            tal_Fecha_Creacion: new Date(),
            tal_Usr_Creacion: data.usuarioCreacion,
        };
        const doc = await TallasSchema.create(payload);


        if (!doc || !doc._id) throw new Error('No se pudo crear el usuario');

        return this._toEntity(doc);
    }

    async update(data) {
        const payload = {
            tal_Nombre: data.nombre,
            tal_Orden: data.orden,
            tal_Estado: true,
            tal_Fecha_Actualizacion: new Date(),
            tal_Usr_Actualizacion: data.usuarioActualizacion
        };

        const doc = await TallasSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);
    }

}

module.exports = TallasSchemaRepository;