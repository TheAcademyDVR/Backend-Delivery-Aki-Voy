const Category = require('../models/categoryModel');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Category.getAll();
            // console.log(`La data es: ${data}`);
            console.log(`La data es: ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error en el getAll ${error}`);
            return res.status(501).json({
                message: 'Error al obtener las categorias',
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.create(category);

            return res.status(201).json({
                message: 'Categoria creada exitosamente',
                success: true,
                data: data.id
            });

        } catch (error) {
            console.log(`Error en Model Category ${error}`);
            return res.status(501).json({
                message: 'Error al crear la categoria',
                success: false,
                error: error
            });
        }
    }
}