const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("homework", {
        homework_details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_submited: {
            type: DataTypes.BOOLEAN,
            default:false,
            allowNull: false,
        },
        homework_date: {
            type: DataTypes.DATE,
            default:Date.now(),
            allowNull: false,
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
}
