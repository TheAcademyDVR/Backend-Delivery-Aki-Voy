const Order = require('../models/orderModel');
const OrderHasProduct = require('../models/order_has_productModel');

module.exports = {

    async findByStatus(req, res, next) {
        try {
            const status = req.params.status;
            const data = await Order.findByStatus(status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);

        } catch (error) {
            console.log(`Error en el findByStatus ${error}`);
            return res.status(501).json({
                message: 'Error al obtener las ordenes por estados',
                success: false,
                error: error
            });
        }
    },

    async findByDeliveryAndStatus(req, res, next) {
        try {
            const id_delivery = req.params.id_delivery;
            const status = req.params.status;
            const data = await Order.findByDeliveryAndStatus(id_delivery, status);
            console.log(`Estado Delivery y Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);

        } catch (error) {
            console.log(`Error en el  Delivery y Status ${error}`);
            return res.status(501).json({
                message: 'Error de ordenes por estados',
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {
        try {
            let order = req.body;
            order.status = 'PAGADO';
            const data = await Order.create(order);

            // RECORRER TODOS LOS PRODUCTOS AGREGARDOR EN EL CARRITO
            for (const product of order.products) {
                await OrderHasProduct.create(data.id, product.id, product.quantity);
            }

            return res.status(201).json({
                success: true,
                message: 'Registro de orden exitoso.',
                data: data.id
            });
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear la orden',
                error: error
            });
        }
    },

    async updateToDispatched(req, res, next) {
        try {
            let order = req.body;
            order.status = 'DESPACHADO';
            await Order.update(order);

            return res.status(201).json({
                success: true,
                message: 'Orden de actualizado.',
            });
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToOnTheMay(req, res, next) {
        try {
            let order = req.body;
            order.status = 'EN CAMINO';
            await Order.update(order);

            return res.status(201).json({
                success: true,
                message: 'Orden de actualizado.',
            });
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar la orden',
                error: error
            });
        }
    },
    async updateToDelivey(req, res, next) {
        try {
            let order = req.body;
            order.status = 'ENTREGADO';
            await Order.update(order);

            return res.status(201).json({
                success: true,
                message: 'Orden de actualizado.',
            });
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar la orden',
                error: error
            });
        }
    }
}