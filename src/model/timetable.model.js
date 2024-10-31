const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("timetable", {
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        class_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slot_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 6,
            },
        },
    });
}
