const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("holidays", {
        holiday_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        holiday_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_holiday: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}
