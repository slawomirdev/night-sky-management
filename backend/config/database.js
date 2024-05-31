import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sky_management', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;
