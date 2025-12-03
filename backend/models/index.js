const sequelize = require('../config/db');
const User = require('./User');
const Farm = require('./Farm');
const SoilData = require('./SoilData');

// Relationships
User.hasMany(Farm, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Farm.belongsTo(User, { foreignKey: 'user_id' });

Farm.hasMany(SoilData, { foreignKey: 'farm_id', onDelete: 'CASCADE' });
SoilData.belongsTo(Farm, { foreignKey: 'farm_id' });

module.exports = {
    sequelize,
    User,
    Farm,
    SoilData,
};
