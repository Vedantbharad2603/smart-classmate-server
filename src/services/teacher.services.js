const db = require("../helper/db.helper");
const valid = require("../helper/data.validator");
const { Op, where } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
    getteacheratribute,
};
async function getAll() {
    return await db.Teacher.findAll();
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
    const teacher = await db.Teacher.findByPk(id);
    if (!teacher) throw new Error("Teacher not found");

    if (!teacher) return "Teacher not found for this login";
    address = await getaddressatribute(teacher.addressId);
    if (!address) return "Address not found for this teacher";
    login = await getloginatribute(teacher.logindatumId);
    if (!login) return "Login data not found for this teacher";
    return { teacher,login, address };
}

async function getaddressatribute(idin) {
    const address = await db.Address.findOne({
        where:{id :idin}
    });
    if (!address) return "Address not found";
    return address;
}

async function getloginatribute(id) {
    const login = await db.Login.findByPk(id);
    if (!login) return "Login not found";
    return login;
}
async function update(idin, params) {
    const existingTeacher = await getteacheratribute(idin);

    // Validate email format
    if (params.email && !valid.isValidEmail(params.email)) {
        throw new Error('Invalid email format');
    }

    // Validate mobile number format
    if (params.mobile_number && !valid.isValidMobileNumber(params.mobile_number)) {
        throw new Error('Invalid mobile number format');
    }

    Object.assign(existingTeacher, params);
    await existingTeacher.save();
    return existingTeacher;
}
async function create(params) {
    // Validate email format
    if (params.email && !valid.isValidEmail(params.email)) {
        throw new Error('Invalid email format');
    }

    // Validate mobile number format
    if (params.mobile_number && !valid.isValidMobileNumber(params.mobile_number)) {
        throw new Error('Invalid mobile number format');
    }
    
    const teacher = new db.Teacher(params);
    await teacher.save();
    return teacher;
}

async function getteacheratribute(id) {
    const teacher = await db.Teacher.findByPk(id);
    if (!teacher) return "Teacher not found";
    return teacher;
}
async function del(did){
    return await db.Teacher.destroy({
        where:{
        id:did
        }
    });
}
