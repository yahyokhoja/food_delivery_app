import { Request, Response } from 'express';
import Menu from '../models/Menu';

class IndexController {
    async получитьМеню(req: Request, res: Response) {
        // Логика для получения меню еды из базы данных
        const меню = await Menu.findAll();
        res.json(меню);
    }

    async разместитьЗаказ(req: Request, res: Response) {
        // Логика для обработки размещения заказа
        const заказ = req.body;
        // Здесь обычно вы сохраняете заказ в базу данных
        res.status(201).json({ сообщение: 'Заказ успешно размещен', заказ });
    }

    async добавитьМеню(req: Request, res: Response) {
        // Логика для добавления нового элемента меню
        const { название, цена } = req.body;
        const новыйЭлемент = await Menu.create({ название, цена });
        res.status(201).json({ сообщение: 'Элемент меню добавлен успешно', новыйЭлемент });
    }
}

export default IndexController;