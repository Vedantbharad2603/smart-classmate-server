const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("courses", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        has_levels: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        timeDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
}
