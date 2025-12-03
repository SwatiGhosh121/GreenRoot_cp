const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SoilData = sequelize.define('SoilData', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ph: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    rainfall: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    recommended_crop: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = SoilData;
