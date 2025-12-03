const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Farm = sequelize.define('Farm', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    farm_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size_acres: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Farm;
