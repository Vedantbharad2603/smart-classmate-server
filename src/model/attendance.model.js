const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("attendance", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Present', 'Absent', 'On Leave','undefined'),
            allowNull: false,
        },
    });
}
