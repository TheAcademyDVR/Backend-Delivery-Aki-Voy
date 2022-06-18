const ProductsController = require('../controllers/productController');
const passport = require('passport');

module.exports = (app, upload) => {
    // GET
    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', { session: false }), ProductsController.findByCategory);

    // POST
    app.post('/api/products/create', passport.authenticate('jwt', { session: false }), upload.array('image', 3), ProductsController.create);

}