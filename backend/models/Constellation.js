import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Constellation = sequelize.define('Constellation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stars: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    isLit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default Constellation;
