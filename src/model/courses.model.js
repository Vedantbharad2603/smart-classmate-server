const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("courses", {
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
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
