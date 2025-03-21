import { Router } from 'express';
import IndexController from '../controllers/index';
import UserController from '../controllers/userController';

const router = Router();
const indexController = new IndexController();
const userController = new UserController();

router.get('/меню', (req, res) => indexController.получитьМеню(req, res));
router.post('/заказ', (req, res) => indexController.разместитьЗаказ(req, res));
router.post('/регистрация', (req, res) => userController.зарегистрироваться(req, res));
router.post('/меню', (req, res) => indexController.добавитьМеню(req, res));

export default router;