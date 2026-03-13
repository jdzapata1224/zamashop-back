const ColoresRepository = require('../../../domain/repositories/IColoresRepository');
const ColoresSchema = require('../models/ColoresSchema');
const Colores = require('../../../domain/entities/Colores');

class ColoresSchemaRepository extends ColoresRepository {

    _toEntity(doc) {
        return new Colores({
            id: doc._id.toString(),
            nombre: doc.col_Nombre,
            hex: doc.col_Hex,
            estado: doc.col_Estado,
            fechaCreacion: doc.col_Fecha_Creacion,
            usuarioCreacionId: doc.col_Creacion_Id,
            usuarioCreacionNombre: doc.col_Creacion_Nombre ? doc.col_Creacion_Nombre.toString() : null,
            fechaActualizacion: doc.col_Fecha_Actualizacion ?? null,
            usuarioActualizacionId: doc.col_Actualizacion_Id,
            usuarioActualizacionNombre: doc.col_Actualizacion_Nombre ? doc.col_Actualizacion_Nombre.toString() : null,
            fechaEliminacion: doc.col_Fecha_Eliminacion ?? null,
            usuarioEliminacionNombre: doc.col_Eliminacion_Nombre ? doc.col_Eliminacion_Nombre.toString() : null,
            usuarioEliminacionId: doc.col_Eliminacion_Id
        });
    }


    async findById(id) {
        const docs = await ColoresSchema.aggregate([
            {
                $match: {
                     _id: id,
                    $or: [
                        { col_Fecha_Eliminacion: null },
                        { col_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'col_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'col_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    col_Creacion_Id: '$usuarioCreacion._id',
                    col_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    col_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    col_Actualizacion_Nombre: {
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
                  
                    col_Nombre: 1,
                    col_Hex: 1,
                    col_Estado: 1,
                    col_Fecha_Creacion: 1,
                    col_Creacion_Id: 1,
                    col_Creacion_Nombre: 1,
                    col_Fecha_Actualizacion: 1,
                    col_Actualizacion_Id: 1,
                    col_Actualizacion_Nombre: 1
                },
            },
        ]);
     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async findByNombre(nombre) {
        const docs = await ColoresSchema.aggregate([
            {
                $match: {
                    col_Nombre: nombre,
                    $or: [
                        { col_Fecha_Eliminacion: null },
                        { col_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'col_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'col_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    col_Creacion_Id: '$usuarioCreacion._id',
                    col_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    col_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    col_Actualizacion_Nombre: {
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
                  
                    col_Nombre: 1,
                    col_Hex: 1,
                    col_Fecha_Creacion: 1,
                    col_Creacion_Id: 1,
                    col_Creacion_Nombre: 1,
                    col_Fecha_Actualizacion: 1,
                    col_Actualizacion_Id: 1,
                    col_Actualizacion_Nombre: 1
                },
            },
        ]);
     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async delete(data) {

        const payload = {
            col_Fecha_Eliminacion: new Date(),
            col_Usr_Eliminacion: data.usuarioEliminacion
        };


        const doc = await ColoresSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);


    }

    async changeStatus(data) {
      
        const payload = {
            col_Fecha_Actualizacion: new Date(),
            col_Estado: data.estado,
            col_Usr_Actualizacion:data.usuarioActualizacion
        };


        const doc = await ColoresSchema.findByIdAndUpdate(
            data.id, 
            { $set: payload },
            { new: true }       
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);


    }

    async find() {
        const docs = await ColoresSchema.aggregate([
            {
                $match: {
                    $or: [
                        { col_Fecha_Eliminacion: null },
                        { col_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'col_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'col_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    col_Creacion_Id: '$usuarioCreacion._id',
                    col_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    col_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    col_Actualizacion_Nombre: {
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
                  
                    col_Hex: 1,
                    col_Nombre: 1,
                    col_Estado: 1,
                    col_Fecha_Creacion: 1,
                    col_Creacion_Id: 1,
                    col_Creacion_Nombre: 1,
                    col_Fecha_Actualizacion: 1,
                    col_Actualizacion_Id: 1,
                    col_Actualizacion_Nombre: 1
                },
            },
        ]);

        return docs.map(doc => this._toEntity(doc));
    }

    async create(data) {

        const payload = {
            col_Nombre: data.nombre,
            col_Hex: data.hex,
            col_Estado: true,
            col_Fecha_Creacion: new Date(),
            col_Usr_Creacion: data.usuarioCreacion,
        };
        const doc = await ColoresSchema.create(payload);


        if (!doc || !doc._id) throw new Error('No se pudo crear el usuario');

        return this._toEntity(doc);
    }

    async update(data) {
        const payload = {
            col_Nombre: data.nombre,
            col_Hex: data.hex,
            col_Estado: true,
            col_Fecha_Actualizacion: new Date(),
            col_Usr_Actualizacion: data.usuarioActualizacion
        };

        const doc = await ColoresSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);
    }

}

module.exports = ColoresSchemaRepository;