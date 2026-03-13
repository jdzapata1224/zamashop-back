const ProductoVariacionRepository = require('../../../domain/repositories/IProductoVariacionRepository');
const ProductoVariacionSchema = require('../models/ProductoVariacionSchema');
const ProductoVariacion = require('../../../domain/entities/ProductoVariacion');

class ProductoVariacionSchemaRepository extends ProductoVariacionRepository {

    _toEntity(doc) {
        return new ProductoVariacion({
            id: doc._id.toString(),
            productoNombre: doc.prv_Producto_Nombre,
            productoId: doc.prv_Producto_Id,
            codigo: doc.prv_Codigo,
            colorId: doc.prv_Color_Id,
            colorNombre: doc.prv_Color_Nombre,
            stock: doc.prv_Stock,
            fechaCreacion: doc.prv_Fecha_Creacion,
            estado:doc.prv_Estado,
            tallaId: doc.prv_Talla_Id,
            tallaNombre: doc.prv_Talla_Nombre,
            usuarioCreacion: doc.prv_Usr_Creacion ? doc.prv_Usr_Creacion.toString() : null,
            fechaActualizacion: doc.prv_Fecha_Actualizacion ?? null,
            usuarioActualizacion: doc.prv_Usr_Actualizacion ? doc.prv_Usr_Actualizacion.toString() : null,
            fechaEliminacion: doc.prv_Fecha_Eliminacion ?? null,
            usuarioEliminacion: doc.prv_Usr_Eliminacion ? doc.prv_Usr_Eliminacion.toString() : null,
        });
    }


    async findById(id) {
        const docs = await ProductoVariacionSchema.aggregate([
            {
                $match: {
                     _id: id,
                    $or: [
                        { prv_Fecha_Eliminacion: null },
                        { prv_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Productos',
                    localField: 'prv_Prd_Id',
                    foreignField: '_id',
                    as: 'productos',
                },
            },
            { $unwind: { path: '$productos', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Tallas',
                    localField: 'prv_Tal_Id',
                    foreignField: '_id',
                    as: 'tallas',
                },
            },
            { $unwind: { path: '$tallas', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Colores',
                    localField: 'prv_Col_Id',
                    foreignField: '_id',
                    as: 'colores',
                },
            },
            { $unwind: { path: '$colores', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prv_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prv_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },
            {
                $set: {
                    prv_Producto_Id: '$productos._id',
                    prv_Producto_Nombre: '$productos.prd_Nombre',
                    prv_Talla_Id: '$tallas._id',
                    prv_Talla_Nombre: '$tallas.tal_Nombre',
                    prv_Color_Id: '$colores._id',
                    prv_Color_Nombre: '$colores.col_Nombre',
                    prv_Creacion_Id: '$usuarioCreacion._id',
                    prv_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    prv_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    prv_Actualizacion_Nombre: {
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
                    prv_Codigo: 1,
                    prv_Producto_Id: 1,
                    prv_Producto_Nombre: 1,
                    prv_Talla_Id: 1,
                    prv_Talla_Nombre: 1,
                    prv_Color_Id: 1,
                    prv_Color_Nombre: 1,
                    prv_Estado: 1,
                    prv_Fecha_Creacion: 1,
                    prv_Creacion_Id: 1,
                    prv_Creacion_Nombre: 1,
                    prv_Fecha_Actualizacion: 1,
                    prv_Actualizacion_Id: 1,
                    prv_Actualizacion_Nombre: 1
                },
            },
        ]);

     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async findByPrdTalCol(productoId,tallaId,colorId) {
        const docs = await ProductoVariacionSchema.aggregate([
            {
                $match: {
                    prv_Prd_Id: productoId,
                    prv_Tal_Id: tallaId,
                    prv_Col_Id: colorId,
                    $or: [
                        { prv_Fecha_Eliminacion: null },
                        { prv_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Productos',
                    localField: 'prv_Prd_Id',
                    foreignField: '_id',
                    as: 'productos',
                },
            },
            { $unwind: { path: '$productos', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Tallas',
                    localField: 'prv_Tal_Id',
                    foreignField: '_id',
                    as: 'tallas',
                },
            },
            { $unwind: { path: '$tallas', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Colores',
                    localField: 'prv_Col_Id',
                    foreignField: '_id',
                    as: 'colores',
                },
            },
            { $unwind: { path: '$colores', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prv_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prv_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },
            {
                $set: {
                    prv_Producto_Id: '$productos._id',
                    prv_Producto_Nombre: '$productos.prd_Nombre',
                    prv_Talla_Id: '$tallas._id',
                    prv_Talla_Nombre: '$tallas.tal_Nombre',
                    prv_Color_Id: '$colores._id',
                    prv_Color_Nombre: '$colores.col_Nombre',
                    prv_Creacion_Id: '$usuarioCreacion._id',
                    prv_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    prv_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    prv_Actualizacion_Nombre: {
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
                    prv_Codigo: 1,
                    prv_Producto_Id: 1,
                    prv_Producto_Nombre: 1,
                    prv_Talla_Id: 1,
                    prv_Talla_Nombre: 1,
                    prv_Color_Id: 1,
                    prv_Color_Nombre: 1,
                    prv_Estado: 1,
                    prv_Fecha_Creacion: 1,
                    prv_Creacion_Id: 1,
                    prv_Creacion_Nombre: 1,
                    prv_Fecha_Actualizacion: 1,
                    prv_Actualizacion_Id: 1,
                    prv_Actualizacion_Nombre: 1
                },
            },
        ]);

     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async delete(data) {

        const payload = {
            prv_Fecha_Eliminacion: new Date(),
            prv_Usr_Eliminacion: data.usuarioEliminacion
        };


        const doc = await ProductoVariacionSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);


    }

    async changeStatus(data) {
      
        const payload = {
            prv_Fecha_Actualizacion: new Date(),
            prv_Estado: data.estado,
            prv_Usr_Actualizacion:data.usuarioActualizacion
        };


        const doc = await ProductoVariacionSchema.findByIdAndUpdate(
            data.id, 
            { $set: payload },
            { new: true }       
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);


    }

    async find() {
         const docs = await ProductoVariacionSchema.aggregate([
            {
                $match: {
                    $or: [
                        { prv_Fecha_Eliminacion: null },
                        { prv_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Productos',
                    localField: 'prv_Prd_Id',
                    foreignField: '_id',
                    as: 'productos',
                },
            },
            { $unwind: { path: '$productos', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Tallas',
                    localField: 'prv_Tal_Id',
                    foreignField: '_id',
                    as: 'tallas',
                },
            },
            { $unwind: { path: '$tallas', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Colores',
                    localField: 'prv_Col_Id',
                    foreignField: '_id',
                    as: 'colores',
                },
            },
            { $unwind: { path: '$colores', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prv_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prv_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },
            {
                $set: {
                    prv_Producto_Id: '$productos._id',
                    prv_Producto_Nombre: '$productos.prd_Nombre',
                    prv_Talla_Id: '$tallas._id',
                    prv_Talla_Nombre: '$tallas.tal_Nombre',
                    prv_Color_Id: '$colores._id',
                    prv_Color_Nombre: '$colores.col_Nombre',
                    prv_Creacion_Id: '$usuarioCreacion._id',
                    prv_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    prv_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    prv_Actualizacion_Nombre: {
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
                    prv_Codigo: 1,
                    prv_Producto_Id: 1,
                    prv_Producto_Nombre: 1,
                    prv_Talla_Id: 1,
                    prv_Talla_Nombre: 1,
                    prv_Color_Id: 1,
                    prv_Color_Nombre: 1,
                    prv_Estado: 1,
                    prv_Fecha_Creacion: 1,
                    prv_Creacion_Id: 1,
                    prv_Creacion_Nombre: 1,
                    prv_Fecha_Actualizacion: 1,
                    prv_Actualizacion_Id: 1,
                    prv_Actualizacion_Nombre: 1
                },
            },
        ]);

        return docs.map(doc => this._toEntity(doc));
    }

    async create(data) {

        const payload = {
            prv_Codigo: data.codigo,
            prv_Prd_Id: data.productoId,
            prv_Tal_Id: data.tallaId,
            prv_Col_Id: data.colorId,
            prv_Precio: data.precio,
            prv_Stock: data.stock,
            prv_Estado: true,
            prv_Fecha_Creacion: new Date(),
            prv_Usr_Creacion: data.usuarioCreacion,
            
        };
        const doc = await ProductoVariacionSchema.create(payload);


        if (!doc || !doc._id) throw new Error('No se pudo crear el usuario');

        return this._toEntity(doc);
    }

    async update(data) {
         const payload = {
            prv_Prd_Id: data.productoId,
            prv_Tal_Id: data.tallaId,
            prv_Col_Id: data.colorId,
            prv_Precio: data.precio,
            prv_Stock: data.stock,
            prv_Estado: true,
            prv_Fecha_Actualizacion: new Date(),
            prv_Usr_Actualizacion: data.usuarioActualizacion
         };
            
      
        const doc = await ProductoVariacionSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el usuario');
        return this._toEntity(doc);
    }

}

module.exports = ProductoVariacionSchemaRepository;