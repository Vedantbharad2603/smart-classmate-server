const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("course_levels", {
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
