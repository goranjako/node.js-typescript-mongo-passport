
import express from 'express';
import usersController from './controllers/users.controller';
import passportMenager from './config/passport';
import authController from './controllers/auth.controller';
const {validateRegistrationBody,validateLoginBody, validate} = require('./config/verifi');
export default function setRoutes(app:any) {

    const router = express.Router();
    
    router.route('/register').post(validateRegistrationBody(),validate,authController.register);
    router.route('/login').post(validateLoginBody,validate,authController.login);

    router.route('/user').post(passportMenager.authenticate,usersController.create);
    router.route('/user').get(passportMenager.authenticate,usersController.getAll);
    router.route('/user/:id').get(passportMenager.authenticate,usersController.get);
    router.route('/user/:id').put(passportMenager.authenticate,usersController.put);
    router.route('/user/:id').delete(passportMenager.authenticate,usersController.delete);

app.use('/', router);
}