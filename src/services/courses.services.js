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
    return await db.Courses.findAll();
}
async function getById(id) {
    const courses = await db.Courses.findByPk(id);
    if (!courses) throw new Error("Courses not found");
    return courses;
}
async function update(idin, params) {
    const updatingCourses = await getCoursesatribute(idin);
    
    Object.assign(updatingCourses, params);
    await updatingCourses.save();
    return updatingCourses;
}

async function create(params) {
    const existingCourses = await db.Courses.findOne({ 
        where: { course_name: params.course_name}});
    if (existingCourses) {
        throw new Error("Courses already exists.");
    }
    const courses = new db.Courses(params);
    await courses.save();
    return courses;
}

async function getCoursesatribute(idin) {
    const courses = await db.Courses.findByPk(idin);
    if (!courses) return "Courses not found";
    return courses;
}
async function del(did){
    return await db.Courses.destroy({
        where:{
        id:did
        }
    });
}
