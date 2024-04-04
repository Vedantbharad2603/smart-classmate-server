const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("logindata", {
        // username: { type: DataTypes.STRING(20), primaryKey: true, allowNull: false },
        // password: { type: DataTypes.STRING(255), allowNull: false },
        // type: { type: DataTypes.STRING(10), allowNull: false },
        // isActive: { type: DataTypes.BOOLEAN, allowNull: false }
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}
