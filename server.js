const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const session = require("express-session");
const passport = require("passport");

// INICIALZAR FIREBASE ADMIN    

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})


// ROUTES
const users = require('./routes/usersRoute');
const categories = require('./routes/categoriesRoute');
const products = require('./routes/productsRoute');
const address = require('./routes/addressRoute');
const orders = require('./routes/ordersRoute');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.disable('x-powered-by');

app.set('port', port);

// CALL ROUTES
users(app, upload);
categories(app);
address(app);
orders(app);
products(app, upload);

server.listen(port, '192.168.1.17' || 'localhost', function() {
    console.log('Backend del Delivery AKI VOY ' + process.pid + ' Corriendo...' + ' por el puerto: ' + port)
});




//MANEJKO DE ERRORES
app.use((err, req, res, next) => {
    console.log(err),
        res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server

}

// 200 - es una respuesta exitosa
// 404 - significa que la url no existe
// 500 - error interno del servidor