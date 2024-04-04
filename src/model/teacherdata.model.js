const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("teacherdata", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
}
