const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("holidays", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        holiday_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        holiday_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_holiday: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    });
}
