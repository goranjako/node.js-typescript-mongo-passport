
import*as express from 'express';
import usersController from './controllers/users.controller';
import passportMenager from './config/passport';
import authController from './controllers/auth.controller';
export default function setRoutes(app:any) {

    const router = express.Router();
    
    router.route('/register').post(authController.register);
    router.route('/login').post(authController.login);

    router.route('/user').post(usersController.create);
    router.route('/user').get(passportMenager.authenticate,usersController.getAll);
    router.route('/user/:id').get(usersController.get);
    router.route('/user/:id').put(usersController.put);
    router.route('/user/:id').delete(passportMenager.authenticate,usersController.delete);

app.use('/', router);
}