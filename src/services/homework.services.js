const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    create,
    update,
    getStudnetHomework,
    getStudnetHomeworks,
    listforcheckWork,
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
async function update(params) {
    // Get the existing attendance record
    const existingHomework = await db.Homework.findOne({
        where: {
            id: params.id
        }
    });
    console.log(existingHomework);
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
            studentdatum_id : studid,
        },
    });

    const result = await Promise.all(studentHomework.map(async (work, index) => {
        const teachername = await getTeacherName(work.teacherdatum_id);
        let checkername = null;
        if (work.checker_teacher_id !== null) {
            checkername = await getTeacherName(work.checker_teacher_id);
        }
        return { ...work.dataValues, teachername: teachername, checker_teacher: checkername };
    }));
    

    return result;
}

async function listforcheckWork() {
    const studentHomework = await db.Homework.findAll({
        where: {
            [Op.or]: [
                { is_submited: false },
                { remark: { [Op.is]: null } }
            ],
        },
    });

    const result = await Promise.all(studentHomework.map(async (work, index) => {
        const studentname = await getStudentName(work.studentdatum_id);
        return { ...work.dataValues, student_name: studentname};
    }));
    return result;
}

async function getStudentName(idin) {
    const student = await db.Student.findOne({
        where: {
            id: idin
        },
        attributes: ['full_name']
    });
    if (!student) return "Unknown";
    return student.full_name;
}

async function getTeacherName(idin) {
    const teacker = await db.Teacher.findOne({
        where: {
            id: idin
        },
        attributes: ['full_name']
    });
    if (!teacker) return "Unknown";
    return teacker.full_name;
}


async function del(did){
    return await db.Homework.destroy({
        where:{
        id:did
        }
    });
}
