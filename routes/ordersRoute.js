const passport = require('passport');
const ordersController = require('../controllers/ordersController');

module.exports = (app) => {

    //GET
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', { session: false }), ordersController.findByStatus);
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', { session: false }), ordersController.findByDeliveryAndStatus);

    //POST 
    app.post('/api/orders/create', passport.authenticate('jwt', { session: false }), ordersController.create);

    //PUT
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', { session: false }), ordersController.updateToDispatched);
    app.put('/api/orders/updateToOnTheMay', passport.authenticate('jwt', { session: false }), ordersController.updateToOnTheMay);
    app.put('/api/orders/updateToDelivey', passport.authenticate('jwt', { session: false }), ordersController.updateToDelivey);
}