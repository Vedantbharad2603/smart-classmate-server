const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("course_enrollment", {
        enrollment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        is_current_course: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        last_month: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        course_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
}
