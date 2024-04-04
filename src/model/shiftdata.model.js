const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("shiftdata", {
        shiftName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });
}
