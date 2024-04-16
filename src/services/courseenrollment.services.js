const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
};
async function getAll() {
    return await db.CourseEnrollment.findAll();
}
async function getById(id) {
    const courseenrollment = await db.CourseEnrollment.findByPk(id);
    if (!courseenrollment) throw new Error("CourseEnrollment not found");
    return courseenrollment;
}
async function update(idin, params) {
    const updatingCourseEnrollment = await getCourseEnrollmentatribute(idin);
    
    Object.assign(updatingCourseEnrollment, params);
    await updatingCourseEnrollment.save();
    return updatingCourseEnrollment;
}

async function create(params) {
    const existingCourseEnrollment = await db.CourseEnrollment.findOne({ 
        where: { studentdatumId : params.studentdatumId,is_current_course:1 }});
    if (existingCourseEnrollment) {
        throw new Error("Student is Currently enrolled in other course.");
    }
    const courseenrollment = new db.CourseEnrollment(params);
    await courseenrollment.save();
    return courseenrollment;
}

async function getCourseEnrollmentatribute(idin) {
    const courseenrollment = await db.CourseEnrollment.findByPk(idin);
    if (!courseenrollment) return "CourseEnrollment not found";
    return courseenrollment;
}
async function del(did){
    return await db.CourseEnrollment.destroy({
        where:{
        id:did
        }
    });
}
