import { Request, Response } from 'express';

class UserController {
    зарегистрироваться(req: Request, res: Response) {
        // Логика для регистрации пользователя
        const пользователь = req.body;
        // Здесь обычно вы сохраняете пользователя в базу данных
        res.status(201).json({ сообщение: 'Пользователь успешно зарегистрирован', пользователь });
    }
}

export default UserController;