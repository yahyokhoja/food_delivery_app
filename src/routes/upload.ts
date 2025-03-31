import { Router } from 'express';
import IndexController from '../controllers/indexController';
import upload from '../controllers/middleware/upload';

const router = Router();
const indexController = new IndexController();

router.post('/menu', upload.single('photo'), (req, res) => indexController.addMenuItem(req, res));
router.put('/menu/:id', upload.single('photo'), (req, res) => indexController.updateMenuItem(req, res));

export default router;