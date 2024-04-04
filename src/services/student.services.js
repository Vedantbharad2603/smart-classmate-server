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
    return await db.Student.findAll();
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
    address = await getaddressatribute(student.addressId);
    if (!address) return "Address not found for this student";
    login = await getloginatribute(student.logindatumId);
    if (!login) return "Login data not found for this student";
    return { student,login, address };
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
    
    const student = new db.Student(params);
    await student.save();
    return student;
}

async function getteacheratribute(id) {
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
