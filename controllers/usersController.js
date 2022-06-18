const User = require('../models/userModel');
const Rol = require('../models/rolModel');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');


module.exports = {


    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                mesaage: 'Error al obtener user por ID'
            });
        }
    },

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);

        } catch (error) {

            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                mesaage: 'Error ID del los datos'

            });
        }
    },

    async findDelivery(req, res, next) {
        try {
            const data = await User.findDelivery();
            console.log(`Repartidores: ${data}`);
            return res.status(201).json(data);

        } catch (error) {

            console.log(`Error de Repartidores: ${error}`);
            return res.status(501).json({
                success: false,
                mesaage: 'Error al obtener del los repartidores'

            });
        }
    },

    async register(req, res, next) {
        try {
            const email = req.body.email;

            const myUserEmail = await User.findByEmailRegister(email);
            if (myUserEmail) {
                return res.status(401).json({
                    success: false,
                    message: 'Email ya existe'
                });
            }

            const phone = req.body.phone;

            const myUserPhone = await User.findByPhoneRegister(phone);
            if (myUserPhone) {
                return res.status(401).json({
                    success: false,
                    message: 'Teléfono ya existe'
                });
            }

            const user = req.body;
            const data = await User.create(user);

            //ROLPOR DEFECTO CLIENTE
            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'Registro de usuario exitoso ',
                data: data.id
            });
        } catch (error) {
            console.log(`Error Al creaar usuario: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al ingresar a los datos de los usuarios',
                error: error
            });
        }
    },

    async registerWithImage(req, res, next) {
        try {


            const user = JSON.parse(req.body.user);
            console.log(`DATOS ENVIADOS DEL USUARIOS: ${user}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            const data = await User.create(user);

            //ROLPOR DEFECTO CLIENTE
            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'Registro de usuario exitoso ',
                data: data.id
            });
        } catch (error) {
            console.log(`Error crear producto: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro al registrarse',
                error: error
            });
        }
    },

    async update(req, res, next) {
        try {

            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }
            await User.update(user);

            return res.status(201).json({
                success: true,
                message: 'Actualización de datos exitoso',

            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error actualización de datos',
                error: error
            });
        }
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Email del usuario no existe'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {
                    //expiresIn: (60*60*24),  // 1 hora
                    expiresIn: (60 * 60 * 24)
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    phone: myUser.phone,
                    email: myUser.email,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                await User.updateToken(myUser.id, `JWT ${token}`);

                console.log(`USUARAIUOS ENVIADO ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'Iniciando Sesión'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña incorrecta',

                });
            }
        } catch (error) {
            console.log(`The Academy hay un Error:  ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al intentar iniciar sesión',
                error: error

            })
        }
    },

    async logout(req, res, next) {
        try {
            const id = req.body.id;
            await User.updateToken(id, null);
            return res.status(201).json({
                success: true,
                message: 'Sesión cerrada correctamente'
            });
            respues
        } catch (error) {
            console.log(`The Academy hay un:  ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al cerrar sesión',
                error: error

            })
        }

    }
};