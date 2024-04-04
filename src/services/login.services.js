const db = require("../helper/db.helper");
const { isValidPassword } = require('../helper/data.validator');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    checklogin,
    create,
    update,
    del,
    changeStatus,
    getteacheratribute,
    getaddressatribute
};
async function getAll() {
    return await db.Login.findAll();
}
async function getById(idin) {
    const login = await db.Login.findOne({
        where: { id: idin},
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
    const { username, password } = params;

    const existingLogin = await db.Login.findOne({ username });
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


async function changeStatus(id) {
    const login = await getloginatribute(id);
    //    const ret_msg = '';
    if (login.isActive) {
        login.isActive = false;
        // ret_msg = 'Camp Inactivated';
        console.log("User Inactivated");
    } else {
        login.isActive = true;
        console.log("User Activated");
        // ret_msg = 'Camp Activated';
    }
    await login.save();
    return login;
}
async function checklogin(params) {
    const login = await db.Login.findOne({
        where: { username: params.username, isActive: true },
    });
    if (!login) return "no login found";
    if (login.password !== params.password) return "incorrect password";
    let teacher, address;
    if (login.type !== "student") {
        teacher = await getteacheratribute(login.id);
        if (!teacher) return "Teacher not found for this login";
        address = await getaddressatribute(teacher.addressId);
        if (!address) return "Address not found for this teacher";
    }
    return { login, teacher, address };
}

async function getteacheratribute(idin) {
    const teacher = await db.Teacher.findOne({
        where:{logindatumId :idin}
    });
    if (!teacher) return "Login not found";
    return teacher;
}

async function getaddressatribute(idin) {
    const teacher = await db.Address.findOne({
        where:{id :idin}
    });
    if (!teacher) return "Address not found";
    return teacher;
}

async function getloginatribute(id) {
    const login = await db.Login.findByPk(id);
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
