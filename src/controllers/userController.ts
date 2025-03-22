import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
    // Register user
    async register(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const newUser = await User.create({ username, password });
            res.status(201).json({ message: 'User registered successfully', newUser });
        } catch (error: any) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    }
}

export default UserController;