const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("shiftdata", {
        shift_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    });
}
