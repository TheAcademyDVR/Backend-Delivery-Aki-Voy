const Address = require('../models/addressModel');

module.exports = {
    async findByUser(req, res, next) {
        try {

            const id_user = req.params.id_user
            const data = await Address.findByUser(id_user);
            // console.log(`La data es: ${data}`);
            console.log(`LAS ADDRESS SON: ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error en el getAll ${error}`);
            return res.status(501).json({
                message: 'Error al obtener las direcciones',
                success: false,
                error: error
            });
        }
    },
    async create(req, res, next) {
        try {
            const address = req.body;
            const data = await Address.create(address);

            return res.status(201).json({
                success: true,
                message: 'Registro de dirección exitoso ',
                data: data.id
            });
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear la ubicación',
                error: error
            });
        }
    }
}