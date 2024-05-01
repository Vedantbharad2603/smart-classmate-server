const db = require("../helper/db.helper");
const valid = require("../helper/data.validator");
const { Op, where } = require("sequelize");

module.exports = {
    getAll,
    getStudentWithActiveCourse,
    getById,
    create,
    update,
    del,
    getStudentAtribute,
};
async function getAll() {
    const students = await db.Student.findAll();
    return students;
}

async function getStudentWithActiveCourse() {
    const students = await db.Student.findAll();

    const login_ids = students.map(student => student.logindatum_id);
    const is_active = await getisActiveStatus(login_ids);

    const result = await Promise.all(students.map(async (student, index) => {
        const currentCourse = await getCurrentCourse(student.id);
        return { ...student.dataValues, is_active: is_active[index].is_active, username: is_active[index].username, course_name: currentCourse.course_name };
    }));

    return result;
}

async function getisActiveStatus(login_ids) {
    const logins = await db.Login.findAll({
        where: { id: login_ids },
        attributes: ['is_active', 'username']
    });

    return logins.map(login => ({
        is_active: login.is_active,
        username: login.username
    }));
}


async function getCurrentCourse(studentId) {
    const courseEnrollment = await db.CourseEnrollment.findOne({ 
        where: { studentdatum_id: studentId, is_current_course: 1 }
    });
    if (!courseEnrollment) throw new Error("Course not found");

    const course_id = courseEnrollment.course_id;
    const courseName = await getCourseName(course_id);

    return { course_name: courseName };
}

async function getCourseName(course_id) {
    const course = await db.Courses.findOne({ 
        where: { id: course_id },
        attributes: ['course_name']
    });
    if (!course) throw new Error("Course not found");
    return course.course_name;
}


// async function getById(id, callback) {
//     getloginatribute(id)
//     .then((response) => {
//         return callback(null, response);
//     })
//     .catch((error) => {
//         return callback(error);
//     });
// }
async function getById(id) {
    const student = await db.Student.findByPk(id);
    if (!student) throw new Error("Student not found");

    if (!student) return "Student not found for this login";
    login = await getloginatribute(student.logindatum_id);
    if (!login) return "Login data not found for this student";
    return { student,login};
}

async function create(params) {
    
    // Validate mobile number format
    if (params.mobile_number && !valid.isValidMobileNumber(params.mobile_number)) {
        throw new Error('Invalid mobile number format');
    }
    const student = new db.Student(params);
    await student.save();
    return student;
}



async function getloginatribute(id) {
    const login = await db.Login.findByPk(id);
    if (!login) return "Login not found";
    return login;
}
async function update(params) {
    const existingStudent = await getStudentAtribute(params.id);

    // Validate email format
    if (params.email && !valid.isValidEmail(params.email)) {
        throw new Error('Invalid email format');
    }

    // Validate mobile number format
    if (params.mobile_number && !valid.isValidMobileNumber(params.mobile_number)) {
        throw new Error('Invalid mobile number format');
    }
    if (existingStudent) {
        Object.assign(existingStudent, params);
        await existingStudent.save();
        return existingStudent;
    }
}
async function getStudentAtribute(id) {
    const student = await db.Student.findByPk(id);
    if (!student) return "Student not found";
    return student;
}
async function del(did){
    return await db.Student.destroy({
        where:{
        id:did
        }
    });
}
