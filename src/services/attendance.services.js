const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    create,
    update,
    createtodayattendance,
    getStudnetAttendance,
    getAllactiveStudent,
    getAllactiveloginid,
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

async function getAllactiveloginid() {
    const logins = await db.Login.findAll({
        attributes: ['id'],
        where: {
            isActive: true,
            type: "student"
        }
    });

    // Map the array of objects to an array of id values
    const loginIds = logins.map(login => login.id);
    return loginIds;
}


async function getAllactiveStudent() {
    const loginIds = await getAllactiveloginid();
    console.log("Heloooooooooooooooo"+String(loginIds));
    const data=await db.Student.findAll({
        attributes: ['id'],
        where: {
            logindatumId:  {
                [Op.in]: [2]
            }
        }
    });
    console.log("----------------------"+data);
    return data;
}


async function createtodayattendance() {
    // Get today's date in UTC format
    const today = new Date().toISOString().slice(0, 10);

    // Get the IDs of active student logins
    // const loginIds = await getAllactiveloginid();

    // Get the IDs of active students
    const activeStudents = await getAllactiveStudent();

    // Create an array to store promises for creating attendance records
    const createAttendancePromises = [];

    // Iterate over each active student
    activeStudents.forEach(student => {
        // Check if there is already an entry in the attendance table for today's date and the student ID
        const existingAttendance = db.Attendance.findOne({
            where: {
                date: today,
                studentdatumId: student.id
            }
        });

        // If there is no existing entry, create a new attendance record
        if (!existingAttendance) {
            createAttendancePromises.push(
                db.Attendance.create({
                    date: today,
                    studentdatumId: student.id,
                    status: 4 // Assuming 4 represents the status
                })
            );
        }
    });

    // Wait for all attendance records to be created
    await Promise.all(createAttendancePromises);

    // Return the attendance data for today's date
    return db.Attendance.findAll({
        where: {
            date: today
        }
    });
}


async function del(did){
    return await db.Attendance.destroy({
        where:{
        id:did
        }
    });
}
