import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Menu extends Model {
    public id!: number;
    public название!: string;
    public цена!: number;
}

Menu.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        название: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        цена: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'меню',
    }
);

export default Menu;