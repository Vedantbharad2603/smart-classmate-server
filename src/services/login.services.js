const db = require("../helper/db.helper");
const { isValidPassword } = require('../helper/data.validator');
const { Op } = require("sequelize");
const { link } = require("../routes/logindata.router");

module.exports = {
    getAll,
    getById,
    getTeacher,
    checklogin,
    create,
    update,
    del,
    changeType,
    changeStatus,
    getteacheratribute,
    getstudentatribute,
    getByUname
};
async function getAll() {
    return await db.Login.findAll();
}

async function getTeacher() {
    // return
    //  await db.Login.findAll({
    //     where: {
    //         type: {
    //             [Op.not]: 'student'
    //         }
    //     }
    // });
    const login = await db.Login.findAll({
        where: {
            type: {
                [Op.not]: 'student'
            }
        },
    });
    // console.log(login);
    // let userdata;
    // userdata = await getteacheratribute(login.id);
    // if (!userdata) return "Teacher not found for this login";
    // return { login, userdata };
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
async function getById(inid) {
    const login = await db.Login.findOne({
        where: { id: inid},
    });
    if (!login) throw new Error("User not found");
    return login;
}

async function getByUname(uname) {
    const login = await db.Login.findOne({
        where: { username: uname},
    });
    if (!login) throw new Error("User not found");
    return login;
}
async function update(idin, params) {
    const { username, password } = params;
    const existingLogin = await getloginatribute(idin);

    if (existingLogin.username !== username) {
        throw new Error("Username cannot be changed.");
    }
    const userWithSameUsername = await login_service.findByUsername(username);
    if (userWithSameUsername && userWithSameUsername.id !== idin) {
        throw new Error("Username already exists in the database.");
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
    if (login.isActive) {
        login.isActive = false;
        console.log("User is Inactivate");
    } else {
        login.isActive = true;
        console.log("User is Activate");
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
        where: { username: params.username, isActive: true },
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

async function getstudentatribute(idin) {
    const student = await db.Student.findOne({
        where:{logindatumId :idin}
    });
    if (!student) return "Login not found";
    return student;
}

async function getteacheratribute(idin) {
    const teacher = await db.Teacher.findOne({
        where:{logindatumId :idin}
    });
    if (!teacher) return "Login not found";
    return teacher;
}

async function getCurrentCourse(idin) {
    const course = await db.CourseEnrollment.findOne({ 
        where: { studentdatumId : idin,is_current_course:1 }});
    if (!course) return "Course not found";
    return course;
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
