const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    return sequelize.define("book_upload", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pdfpath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
}
