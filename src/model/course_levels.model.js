const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("course_levels", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'courses', key: 'id' }
        },
        level_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
    });
}
