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
  db.Teacher = require("../model/teacherdata.model")(sequelize);
  db.Shift = require("../model/shiftdata.model")(sequelize);
  db.Student = require("../model/studentdata.model")(sequelize);
  db.Attendance = require("../model/attendance.model")(sequelize);
  db.Events = require("../model/events.model")(sequelize);
  db.Holidays = require("../model/holidays.model")(sequelize);
  db.Homework = require("../model/homework.model")(sequelize);
  db.Courses = require("../model/courses.model")(sequelize);
  db.CourseLevels = require("../model/course_levels.model")(sequelize);
  db.CourseConcepts = require("../model/course_concepts.model")(sequelize);
  db.CourseEnrollment = require("../model/course_enrollment.model")(sequelize);

  // For Teacher references
  db.Login.hasMany(db.Teacher, { foreignKey: { allowNull: false,name:'logindatum_id' } });

  // For Student references
  db.Login.hasMany(db.Student, { foreignKey: { allowNull: false,name:'logindatum_id' } });
  db.Shift.hasMany(db.Student, { foreignKey: { allowNull: false , name:'shiftdatum_id'} });

  // For Attendance references
  db.Student.hasMany(db.Attendance, { foreignKey: { allowNull: false ,name:'studentdatum_id'} });

  // For Events references
  db.Shift.hasMany(db.Events, { foreignKey: { allowNull: false, name:'shiftdatum_id' } });

  // For Homework references
  db.Student.hasMany(db.Homework, { foreignKey: { allowNull: false,name:'studentdatum_id'} });
  db.Teacher.hasMany(db.Homework, { foreignKey: { allowNull: false,name:'teacherdatum_id' } });
  db.Teacher.hasMany(db.Homework, { foreignKey: { allowNull: true,name: 'checker_teacher_id' } });

  // For CourseLevels references
  db.Courses.hasMany(db.CourseLevels, { foreignKey: { allowNull: false,name: 'course_id' } });

  // For CourseConcepts references
  db.Courses.hasMany(db.CourseConcepts, { foreignKey: { allowNull: false,name: 'course_id' } });
  db.CourseLevels.hasMany(db.CourseConcepts, { foreignKey: { allowNull: true,name: 'course_level_id' } });

  // For CourseEnrollment references
  db.Student.hasMany(db.CourseEnrollment, { foreignKey: { allowNull: false,name: 'studentdatum_id' } });
  db.Courses.hasMany(db.CourseEnrollment, { foreignKey: { allowNull: false,name: 'course_id' } });
  db.CourseLevels.hasMany(db.CourseEnrollment, { foreignKey: { allowNull: true ,name: 'course_level_id'} });

  await sequelize.sync({ alter: false });
}
