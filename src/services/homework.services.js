const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    create,
    update,
    getStudnetHomework,
    getStudnetHomeworks,
    del
};
async function getAll() {
    return await db.Homework.findAll();
}

// async function update(params) {
//     const attendance = await getaddressatribute(idin);
//     Object.assign(attendance, params);
//     await attendance.save();
//     return attendance;
// }
async function update(idin,params) {
    // Get the existing attendance record
    const existingHomework = await getStudnetHomework(idin);

    // If the record exists, update it and return
    if (existingHomework) {
        Object.assign(existingHomework, params);
        await existingHomework.save();
        return existingHomework;
    }

    // If the record does not exist, return null or throw an error
    return { error: "Homework record not found" };
}

async function create(params) {
    const attendance = new db.Homework(params);
    await attendance.save();
    return attendance;
}

async function getStudnetHomework(idin){
    const studentHomework = await db.Homework.findAll({
        where: {
            id: idin,
        },
    });
    return studentHomework;
}

async function getStudnetHomeworks(studid){
    const studentHomework = await db.Homework.findAll({
        where: {
            studentdatumId : studid,
        },
    });
    return studentHomework;
}

async function del(did){
    return await db.Homework.destroy({
        where:{
        id:did
        }
    });
}
