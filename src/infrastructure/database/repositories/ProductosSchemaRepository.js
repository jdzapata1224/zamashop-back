const ProductosRepository = require('../../../domain/repositories/IProductosRepository');
const ProductosSchema = require('../models/ProductoSchema');
const Productos = require('../../../domain/entities/Productos');

class ProductosSchemaRepository extends ProductosRepository {

    _toEntity(doc) {
        return new Productos({
            id: doc._id.toString(),
            nombre: doc.prd_Nombre,
            codigo: doc.prd_Codigo,
            descripcion: doc.prd_Descripcion,
            tieneColor: doc.prd_Tiene_Color ?? null,
            tieneTalla: doc.prd_Tiene_Talla ?? null,
            estado: doc.prd_Estado,
            categoriaId: doc.prd_Categoria_Id ?? null,
            categoriaNombre: doc.prd_Categoria_Nombre ?? null,
            fechaCreacion: doc.prd_Fecha_Creacion,
            usuarioCreacionId: doc.prd_Creacion_Id,
            usuarioCreacionNombre: doc.prd_Creacion_Nombre ? doc.prd_Creacion_Nombre.toString() : null,
            fechaActualizacion: doc.prd_Fecha_Actualizacion ?? null,
            usuarioActualizacionId: doc.prd_Actualizacion_Id ?? null,
            usuarioActualizacionNombre: doc.prd_Actualizacion_Nombre ? doc.prd_Actualizacion_Nombre.toString() : null,
            fechaEliminacion: doc.prd_Fecha_Eliminacion ?? null,
            usuarioEliminacionId: doc.prd_Eliminacion_Id ?? null,
            usuarioEliminacionNombre: doc.prd_Eliminacion_Nombre ? doc.prd_Eliminacion_Nombre.toString() : null
            
        });
    }


    async findById(id) {
        const docs = await ProductosSchema.aggregate([
            {
                $match: {
                     _id: new Types.ObjectId(id),
                    $or: [
                        { prd_Fecha_Eliminacion: null },
                        { prd_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Categorias',
                    localField: 'prd_Cat_Id',
                    foreignField: '_id',
                    as: 'productoCategoria',
                },
            },
            { $unwind: { path: '$productoCategoria', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prd_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prd_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    prd_Categoria_Id: '$productoCategoria._id',
                    prd_Categoria_Nombre: '$productoCategoria.cat_Nombre',
                    prd_Creacion_Id: '$usuarioCreacion._id',
                    prd_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    prd_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    prd_Actualizacion_Nombre: {
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
                    prd_Tiene_Color: 1,
                    prd_Tiene_Talla: 1,
                    prd_Codigo: 1,
                    prd_Nombre: 1,
                    prd_Descripcion: 1,
                    prd_Categoria_Id: 1,
                    prd_Categoria_Nombre: 1,
                    prd_Estado: 1,
                    prd_Fecha_Creacion: 1,
                    prd_Creacion_Id: 1,
                    prd_Creacion_Nombre: 1,
                    prd_Fecha_Actualizacion: 1,
                    prd_Actualizacion_Id: 1,
                    prd_Actualizacion_Nombre: 1
                },
            },
        ]);

     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async findByNombreYCategoria(nombre,categoria) {
         const docs = await ProductosSchema.aggregate([
            {
                $match: {
                    prd_Nombre: nombre,
                    prd_Cat_Id: categoria,
                    $or: [
                        { prd_Fecha_Eliminacion: null },
                        { prd_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Categorias',
                    localField: 'prd_Cat_Id',
                    foreignField: '_id',
                    as: 'productoCategoria',
                },
            },
            { $unwind: { path: '$productoCategoria', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prd_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prd_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    prd_Categoria_Id: '$productoCategoria._id',
                    prd_Categoria_Nombre: '$productoCategoria.cat_Nombre',
                    prd_Creacion_Id: '$usuarioCreacion._id',
                    prd_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    prd_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    prd_Actualizacion_Nombre: {
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
                    prd_Codigo: 1,
                    prd_Nombre: 1,
                    prd_Descripcion: 1,
                    prd_Categoria_Id: 1,
                    prd_Tiene_Color: 1,
                    prd_Tiene_Talla: 1,
                    prd_Categoria_Nombre: 1,
                    prd_Estado: 1,
                    prd_Fecha_Creacion: 1,
                    prd_Creacion_Id: 1,
                    prd_Creacion_Nombre: 1,
                    prd_Fecha_Actualizacion: 1,
                    prd_Actualizacion_Id: 1,
                    prd_Actualizacion_Nombre: 1
                },
            },
        ]);

     
        return docs.length ? this._toEntity(docs[0]) : null;
    }

    async delete(data) {

        const payload = {
            prd_Fecha_Eliminacion: new Date(),
            prd_Usr_Eliminacion: data.usuarioEliminacion
        };


        const doc = await ProductosSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el producto');
        return this._toEntity(doc);


    }

    async changeStatus(data) {
      
        const payload = {
            prd_Fecha_Actualizacion: new Date(),
            prd_Estado: data.estado,
            prd_Usr_Actualizacion:data.usuarioActualizacion
        };


        const doc = await ProductosSchema.findByIdAndUpdate(
            data.id, 
            { $set: payload },
            { new: true }       
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el producto');
        return this._toEntity(doc);


    }

    async find() {
        const docs = await ProductosSchema.aggregate([
            {
                $match: {
                    $or: [
                        { prd_Fecha_Eliminacion: null },
                        { prd_Fecha_Eliminacion: { $exists: false } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'Categorias',
                    localField: 'prd_Cat_Id',
                    foreignField: '_id',
                    as: 'productoCategoria',
                },
            },
            { $unwind: { path: '$productoCategoria', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prd_Usr_Creacion',
                    foreignField: '_id',
                    as: 'usuarioCreacion',
                },
            },
            { $unwind: { path: '$usuarioCreacion', preserveNullAndEmptyArrays: true } },

            // Usuario actualización (opcional)
            {
                $lookup: {
                    from: 'Usuarios',
                    localField: 'prd_Usr_Actualizacion',
                    foreignField: '_id',
                    as: 'usuarioActualizacion',
                },
            },
            { $unwind: { path: '$usuarioActualizacion', preserveNullAndEmptyArrays: true } },

            {
                $set: {
                    prd_Categoria_Id: '$productoCategoria._id',
                    prd_Categoria_Nombre: '$productoCategoria.cat_Nombre',
                    prd_Creacion_Id: '$usuarioCreacion._id',
                    prd_Creacion_Nombre: {
                        $concat: [
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Nombre', ''] },
                            ' ',
                            { $ifNull: ['$usuarioCreacion.usr_Primer_Apellido', ''] },
                        ],
                    },

                    prd_Actualizacion_Id: { $ifNull: ['$usuarioActualizacion._id', null] },
                    prd_Actualizacion_Nombre: {
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
                    prd_Codigo: 1,
                    prd_Nombre: 1,
                    prd_Tiene_Color: 1,
                    prd_Tiene_Talla: 1,
                    prd_Descripcion: 1,
                    prd_Categoria_Id: 1,
                    prd_Categoria_Nombre: 1,
                    prd_Estado: 1,
                    prd_Fecha_Creacion: 1,
                    prd_Creacion_Id: 1,
                    prd_Creacion_Nombre: 1,
                    prd_Fecha_Actualizacion: 1,
                    prd_Actualizacion_Id: 1,
                    prd_Actualizacion_Nombre: 1
                },
            },
        ]);
        return docs.map(doc => this._toEntity(doc));
    }

    async create(data) {

        const payload = {
            prd_Nombre: data.nombre,
            prd_Descripcion: data.descripcion,
            prd_Codigo: data.codigo,
            prd_Tiene_Color: data.tieneColor,
            prd_Tiene_Talla: data.tieneTalla,
            prd_Cat_Id: data.categoriaId,
            prd_Estado: true,
            prd_Fecha_Creacion: new Date(),
            prd_Usr_Creacion: data.usuarioCreacion,
            prd_Precio_Base:data.precioBase
        };

        const doc = new ProductosSchema(payload);
        const saved = await doc.save();
        
        if (!saved || !saved._id) throw new Error('No se pudo crear el producto');
        
        return this._toEntity(saved);

    }

    async update(data) {
        const payload = {
            prd_Nombre: data.nombre,
            prd_Descripcion: data.descripcion,
            prd_Codigo: data.codigo,
            prd_Tiene_Color: data.tieneColor,
            prd_Tiene_Talla: data.tieneTalla,
            prd_Cat_Id: data.categoriaId,
            prd_Estado: true,
            prd_Fecha_Actualizacion: new Date(),
            prd_Usr_Actualizacion: data.usuarioActualizacion
        };

        const doc = await ProductosSchema.findByIdAndUpdate(
            data.id,
            { $set: payload },
            { new: true }
        );

        if (!doc || !doc._id) throw new Error('No se pudo actualizar el producto');
        return this._toEntity(doc);
    }

}

module.exports = ProductosSchemaRepository;