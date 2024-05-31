import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Star = sequelize.define('Star', {
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
    constellations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    isLit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default Star;
