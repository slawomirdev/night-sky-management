import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Card = sequelize.define('Card', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Card;
