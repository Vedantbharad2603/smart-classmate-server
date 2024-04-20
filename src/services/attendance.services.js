const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    create,
    update,
    getStudnetAttendance,
    getAllTodayAttendance,
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

async function getActiveStudentsid() {
    const logins = await db.Login.findAll({
        where: { isActive: true ,type:"student"},
        attributes: ['id']
    });
    return logins.map(login => login.id);
}

async function getStudentsInfo(loginIds) {
    const students = await db.Student.findAll({
        where: { logindatumId: { [Op.in]: loginIds } },
        attributes: ['id']
    });
    return students.map(student => student.id);
}

async function create() {
    const activeStudentIds= await getActiveStudentsid();
    const studentInfo = await getStudentsInfo(activeStudentIds);
    const attendancePromises = studentInfo.map(async studentId => {
        const existingAttendance = await db.Attendance.findOne({
            where: {
                date: new Date().toISOString().split('T')[0],
                studentdatumId: studentId
            }
        });

        if (!existingAttendance) {
            return db.Attendance.create({
                date: new Date().toISOString().split('T')[0], // Date only, no time
                status: 4,
                studentdatumId: studentId
            });
        } else {
            return null; // Return null for existing rows
        }
    });
    const attendance = await Promise.all(attendancePromises);
    return attendance;
}


async function getAllTodayAttendance(){
    const studentAttendance = await db.Attendance.findAll({
        where: {
            date: new Date().toISOString().split('T')[0],
        },
    });
    const result = await Promise.all(studentAttendance.map(async (student, index) => {
        const studinfo = await getStudentname(student.studentdatumId);
        return { ...student.dataValues, full_name: studinfo.full_name,shiftdatumId: studinfo.shiftdatumId };
    }));
    return result;
}
async function getStudentname(studentId) {
    const student = await db.Student.findOne({
        where: { id: studentId },
        attributes: ['full_name','shiftdatumId']
    });
    return {
        full_name: student.full_name,
        shiftdatumId: student.shiftdatumId
    };
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
