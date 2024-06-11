import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('anki_app', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;
