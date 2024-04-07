//for config
const { MYSQL_DB_CONFIG } = require("../../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });

  await connection.query(`Create database if not exists \`${DB}\`;`);

  //connect to db
  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: "mysql",
    host: HOST,
  });

  db.Login = require("../model/logindata.model")(sequelize);
  db.Address = require("../model/address.model")(sequelize);
  db.Teacher = require("../model/teacherdata.model")(sequelize);
  db.Shift = require("../model/shiftdata.model")(sequelize);
  db.Student = require("../model/studentdata.model")(sequelize);
  db.Attendance = require("../model/attendance.model")(sequelize);
  db.BookUpload = require("../model/book_upload.model")(sequelize);
  db.Events = require("../model/events.model")(sequelize);
  db.Holidays = require("../model/holidays.model")(sequelize);
  db.Homework = require("../model/homework.model")(sequelize);

  // For Teacher references
  db.Address.hasMany(db.Teacher, { foreignKey: { allowNull: false } });
  db.Login.hasMany(db.Teacher, { foreignKey: { allowNull: false } });

  // For Student references
  db.Login.hasMany(db.Student, { foreignKey: { allowNull: false } });
  db.Shift.hasMany(db.Student, { foreignKey: { allowNull: false } });
  db.Address.hasMany(db.Student, { foreignKey: { allowNull: false } });

  // For Attendance references
  db.Student.hasMany(db.Attendance, { foreignKey: { allowNull: false } });

  // For Events references
  db.Shift.hasMany(db.Events, { foreignKey: { allowNull: false } });

  // For Homework references
  db.Student.hasMany(db.Homework, { foreignKey: { allowNull: false } });
  db.Teacher.hasMany(db.Homework, { foreignKey: { allowNull: false } });

  await sequelize.sync({ alter: false });
}
