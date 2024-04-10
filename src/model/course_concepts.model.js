const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("course_concepts", {
        concept_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        concept_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
}
