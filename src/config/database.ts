import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('food_delivery_app', 'yahyo', '929281129', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;