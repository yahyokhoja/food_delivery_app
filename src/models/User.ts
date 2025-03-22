import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
    public id!: number;
    public имя!: string;
    public email!: string;
    public пароль!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        имя: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        пароль: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required
    }
);

export default User;