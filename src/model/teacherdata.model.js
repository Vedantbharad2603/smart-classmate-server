const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("teacherdata", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        block_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        street_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pin_code: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
}
