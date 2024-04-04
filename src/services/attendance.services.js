const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    create,
    update,
    getStudnetAttendance,
    del
};
async function getAll() {
    return await db.Attendance.findAll();
}

// async function update(params) {
//     const attendance = await getaddressatribute(idin);
//     Object.assign(attendance, params);
//     await attendance.save();
//     return attendance;
// }
async function update(params) {
    // Get the existing attendance record
    const existingAttendance = await db.Attendance.findOne({
        where: {
            studentdatumId: params.studentdatumId,
            date: params.date
        },
    });

    // If the record exists, update it and return
    if (existingAttendance) {
        Object.assign(existingAttendance, params);
        await existingAttendance.save();
        return existingAttendance;
    }

    // If the record does not exist, return null or throw an error
    return null; // or throw new Error("Attendance record not found");
}

async function create(params) {
    // Check if a record with the same studentId and date already exists
    const existingAttendance = await db.Attendance.findOne({
        where: {
            studentdatumId: params.studentdatumId,
            date: params.date
        },
    });
    // If a record already exists, update the record and return
    if (existingAttendance) {
        return update(params);
    }

    // If no record exists, create a new attendance record
    const attendance = new db.Attendance(params);
    await attendance.save();
    return attendance;
}

async function getStudnetAttendance(id){
    const studentAttendance = await db.Attendance.findAll({
        where: {
            studentdatumId: id,
        },
    });
    return studentAttendance;
}

async function del(did){
    return await db.Attendance.destroy({
        where:{
        id:did
        }
    });
}
