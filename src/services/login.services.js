const db = require("../helper/db.helper");
const { isValidPassword } = require('../helper/data.validator');
const { Op } = require("sequelize");
const { link } = require("../routes/logindata.router");

module.exports = {
    getAll,
    getByEmail,
    getTeacher,
    checklogin,
    create,
    update,
    del,
    studentcount,
    givestudentDetail,
    givestudentDetail2,
    changeType,
    changeStatus,
    getteacheratribute,
    getstudentatribute,
    getByUname
};
async function getAll() {
    return await db.Login.findAll();
}

async function studentcount() {
    return await db.Login.count({
        where: { type: 'student' }
    });
}


async function getTeacher() {
    const login = await db.Login.findAll({
        where: {
            type: {
                [Op.not]: 'student'
            }
        },
    });
    const userDataPromises = login.map(async (login) => {
        if (login.type !== 'student') {
            const userdata = await getteacheratribute(login.id);
            if (!userdata) return "Teacher not found for this login";
            return { login, userdata };
        }
    });

    const userData = await Promise.all(userDataPromises);
    return userData.filter(Boolean);
}
async function getByEmail(emailin) {
    const login = await db.Login.findOne({
        where: { email: emailin, is_active: true},
    });
    if (!login) throw new Error("User not found");

    let userdata;
    let courseinfo;
    if (login.type == "student") {
        userdata = await getstudentatribute(login.id);
        if (!userdata) return "Student not found for this login";
        courseinfo = await getCurrentCourse(userdata.id);
        if (!courseinfo) return "Course not found for this login";
    }
    else {
        userdata = await getteacheratribute(login.id);
        if (!userdata) return "Teacher not found for this login";
    }
    return { login, userdata ,courseinfo};
}

async function getByUname(uname) {
    const login = await db.Login.findOne({
        where: { username: uname},
    });
    if (!login) throw new Error("User not found");
    return login;
}
async function update(idin, params) {
    const { username, password ,email} = params;
    const existingLogin = await getloginatribute(idin);

    if (existingLogin.username !== username) {
        throw new Error("Username cannot be changed.");
    }
    const userWithSameUsername = await login_service.findByUsername(username);
    if (userWithSameUsername && userWithSameUsername.id !== idin) {
        throw new Error("Username already exists in the database.");
    }
    const userWithSameemail = await login_service.findByEmail(email);
    if (userWithSameemail && userWithSameemail.id !== idin) {
        throw new Error("Email already exists.");
    }

    // Validate password format
    if (password && !isValidPassword(password)) {
        throw new Error('Invalid password format. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
    }

    Object.assign(existingLogin, params);
    await existingLogin.save();
    return existingLogin;
}

async function create(params) {
    const {password } = params;

    const existingLogin = await db.Login.findOne({ 
        where: { username: params.username}});
    if (existingLogin) {
        throw new Error("Username already exists.");
    }

    const existingEmail = await db.Login.findOne({ where: { email: params.email } });
    if (existingEmail) {
        throw new Error("Email already exists.");
    }

    // Validate password format
    if (!isValidPassword(password)) {
        throw new Error('Invalid password format. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
    }

    const login = new db.Login(params);
    await login.save();
    return login;
}



async function changeStatus(inid) {
    const login = await getloginatribute(inid);
    if (login.is_active) {
        login.is_active = false;
    } else {
        login.is_active = true;
    }
    await login.save();
    return login;
}
async function changeType(inid,typein) {
    const login = await getloginatribute(inid);
    login.type = typein;
    await login.save();
    return login;
}

async function checklogin(params) {
    const login = await db.Login.findOne({
        where: {
            [Op.or]: [
                { username: params.username, is_active: true },
                {  email: params.username, is_active: true }
            ]
        },
    });
    if (!login) return "no login found";
    if (login.password !== params.password) return "incorrect password";
    let userdata;
    let courseinfo;
    if (login.type == "student") {
        userdata = await getstudentatribute(login.id);
        if (!userdata) return "Student not found for this login";
        courseinfo = await getCurrentCourse(userdata.id);
        if (!courseinfo) return "Course not found for this login";
    }
    else {
        userdata = await getteacheratribute(login.id);
        if (!userdata) return "Teacher not found for this login";
    }
    return { login, userdata ,courseinfo};
}
async function givestudentDetail(idin){
    let userdata;
    let login;
    let courseinfo;
    let shift;

    userdata = await db.Student.findOne({
        where:{id:idin}
    });
    if (!userdata) return "Student not found";

    login = await db.Login.findOne({
        where: {
            id:userdata.logindatum_id
        },
    });
    if (!login) return "Student not found in login";

    courseinfo = await getCurrentCourse(userdata.id);
    if (!courseinfo) return "Course not found for this Student";

    shift = await db.Shift.findOne({
        where:{
            id:userdata.shiftdatum_id
        }
    });

    return { login, userdata, courseinfo, shift };
}


async function givestudentDetail2(idin){
    let userdata;
    let login;
    let courseinfo;
    let shift;

    userdata = await db.Student.findOne({
        where:{id:idin}
    });
    if (!userdata) return "Student not found";

    login = await db.Login.findOne({
        where: {
            id:userdata.logindatum_id
        },
    });
    if (!login) return "Student not found in login";

    courseinfo = await db.CourseEnrollment.findAll({ 
        where: { studentdatum_id: userdata.id}
    });
    
    if (!courseinfo) return "Course not found for this Student";

    shift = await db.Shift.findOne({
        where:{
            id:userdata.shiftdatum_id
        }
    });

    return { login, userdata, courseinfo, shift };
}
// async function givestudentDetail(idin){
//     let userdata;
//     let login;
//     let courseinfo;
//     userdata = await db.Student.findOne({
//         where:{id:idin}
        
//     });
//     if (!userdata) return "Student not found";
//     login = await db.Login.findOne({
//         where: {
//             id:userdata.logindatum_id
//         },
//     });
//     if (!login) return "Student not found in login";
//     courseinfo = await getCurrentCourse(userdata.id);
//     if (!courseinfo) return "Course not found for this Student";

    
//     return { login, userdata ,courseinfo};
// }

async function getstudentatribute(idin) {
    const student = await db.Student.findOne({
        where:{logindatum_id :idin}
    });
    if (!student) return "Login not found";
    return student;
}

async function getteacheratribute(idin) {
    const teacher = await db.Teacher.findOne({
        where:{logindatum_id :idin}
    });
    if (!teacher) return "Login not found";
    return teacher;
}

async function getCurrentCourse(idin) {
    const courseEnrollment = await db.CourseEnrollment.findOne({ 
        where: { studentdatum_id: idin, is_current_course: 1 }
    });
    if (!courseEnrollment) return "Course not found";

    const courseId = courseEnrollment.course_id;
    const courseName = await getcourseName(courseId);

    return { ...courseEnrollment.dataValues, course_name: courseName };
}

async function getcourseName(idin) {
    const course = await db.Courses.findOne({ 
        where: { id: idin },
        attributes: ['course_name']
    });
    if (!course) throw new Error("Course not found");
    return course.course_name;
}


async function getloginatribute(inid) {
    const login = await db.Login.findOne({
        where:{id :inid}
    });
    if (!login) return "Login not found";
    return login;
}
async function del(idin){
    return await db.Login.destroy({
        where:{
            id :idin
        }
    });
}
