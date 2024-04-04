const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("homework", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teacher_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: 'teacherdata', key: 'ID' }
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: 'studentdata', key: 'id' }
        },
        homework_details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_submited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}
