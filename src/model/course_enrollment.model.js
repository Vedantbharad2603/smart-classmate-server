const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("course_enrollment", {
        // id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        // student_id: { type: DataTypes.STRING(255), allowNull: true },
        // course_id: { type: DataTypes.INTEGER, allowNull: true },
        // enrollment_date: { type: DataTypes.DATE, allowNull: true },
        // is_current_course: { type: DataTypes.BOOLEAN, allowNull: true },
        // last_month: { type: DataTypes.DATE, allowNull: true },
        // course_status: { type: DataTypes.INTEGER, allowNull: true },

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        student_id: {
            type: DataTypes.STRING,
            allowNull: true,
            references: { model: 'studentdata', key: 'id' },
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'courses', key: 'id' },
        },
        enrollment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_current_course: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        last_month: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        course_status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
}
