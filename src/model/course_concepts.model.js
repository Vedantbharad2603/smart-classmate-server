const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("course_concepts", {
        // id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        // concept_name: { type: DataTypes.STRING(255), allowNull: true },
        // course_id: { type: DataTypes.INTEGER, allowNull: true },
        // course_level_id: { type: DataTypes.INTEGER, allowNull: true , references: { model: 'courses', key: 'id' } },
        // concept_index: { type: DataTypes.INTEGER, allowNull: false },

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        concept_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'courses', key: 'id' }
        },
        course_level_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'course_levels', key: 'id' }
        },
        concept_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });
}
