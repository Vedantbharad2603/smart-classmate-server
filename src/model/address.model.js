const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("address", {
        // address_id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },
        block_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pin_code: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}