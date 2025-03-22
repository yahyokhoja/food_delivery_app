import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import IndexController from '../controllers/indexController';
import UserController from '../controllers/userController';

const router = Router();
const upload = multer({ dest: 'uploads/' });
const indexController = new IndexController();
const userController = new UserController();

// API routes
router.get('/api/menu', (req, res) => indexController.getMenu(req, res)); // Получить элементы меню
router.post('/api/order', (req, res) => indexController.placeOrder(req, res)); // Разместить заказ
router.post('/api/register', (req, res) => userController.register(req, res)); // Регистрация нового пользователя
router.post('/api/menu', upload.single('photo'), (req, res) => indexController.addMenuItem(req, res)); // Добавить элемент меню
router.put('/api/menu/:id', upload.single('photo'), (req, res) => indexController.updateMenuItem(req, res)); // Обновить элемент меню
router.delete('/api/menu/:id', (req, res) => indexController.deleteMenuItem(req, res)); // Удалить элемент меню

// Serve static files
router.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/menu.html')); // Страница меню
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html')); // Главная страница
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin.html')); // Страница администратора
});

export default router;