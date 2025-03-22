import { Request, Response } from 'express';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import path from 'path';
import fs from 'fs/promises';  // Используем fs.promises для асинхронных операций

class Menu extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public description!: string;
    public photo!: string;
}

Menu.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        photo: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
    },
    {
        tableName: 'menu',
        sequelize, // передаем экземпляр sequelize
    }
);

class IndexController {
    // Получить меню
    async getMenu(req: Request, res: Response) {
        try {
            const menu = await Menu.findAll();
            res.json(menu);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching menu', error: error.message });
        }
    }

    // Разместить заказ
    async placeOrder(req: Request, res: Response) {
        const order = req.body;
        res.status(201).json({ message: 'Order placed successfully', order });
    }

    // Добавить элемент меню
    async addMenuItem(req: Request, res: Response) {
        const { name, price, description } = req.body;
        const photo = req.file;

        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Name, price, and description are required' });
        }

        try {
            const newItem = await Menu.create({
                name,
                price,
                description,
                photo: photo ? photo.filename : '',
            });
            res.status(201).json({ message: 'Menu item added successfully', newItem });
        } catch (error: any) {
            res.status(500).json({ message: 'Error adding menu item', error: error.message });
        }
    }

    // Обновить элемент меню
    async updateMenuItem(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price, description } = req.body;
        const photo = req.file;

        if (!name || !price || !description) {
            return res.status(400).json({ message: 'Name, price, and description are required' });
        }

        try {
            const item = await Menu.findByPk(id);
            if (item) {
                item.name = name;
                item.price = price;
                item.description = description;
                if (photo) {
                    item.photo = photo.filename;
                }
                await item.save();
                res.status(200).json({ message: 'Menu item updated successfully', item });
            } else {
                res.status(404).json({ message: 'Menu item not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating menu item', error: error.message });
        }
    }

    // Удалить элемент меню
    async deleteMenuItem(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const item = await Menu.findByPk(id);
            if (item) {
                // Удаление файла, если он есть
                if (item.photo) {
                    const filePath = path.join(__dirname, '../../uploads', item.photo);
                    try {
                        // Проверка существования файла
                        await fs.access(filePath);
                        // Удаление файла
                        await fs.unlink(filePath);
                        console.log('File successfully deleted');
                    } catch (err) {
                        console.error('Error deleting file:', err);
                    }
                }
                await item.destroy();
                res.status(200).json({ message: 'Menu item deleted successfully' });
            } else {
                res.status(404).json({ message: 'Menu item not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Error deleting menu item', error: error.message });
        }
    }
}

export default IndexController;

