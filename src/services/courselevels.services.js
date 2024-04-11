const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    getlevels,
    del,
};
async function getAll() {
    return await db.CourseLevels.findAll();
}

async function getlevels(idin) {
    return await db.CourseLevels.findAll({ 
        where: { courseId : idin}});
}
async function getById(id) {
    const courselevels = await db.CourseLevels.findByPk(id);
    if (!courselevels) throw new Error("CourseLevels not found");
    return courselevels;
}
async function update(idin, params) {
    const updatingCourseLevels = await getCourseLevelsatribute(idin);
    
    Object.assign(updatingCourseLevels, params);
    await updatingCourseLevels.save();
    return updatingCourseLevels;
}

async function create(params) {
    const existingCourseLevels = await db.CourseLevels.findOne({ 
        where: { courseId : params.courseId , level_name: params.level_name}});
    if (existingCourseLevels) {
        throw new Error("CourseLevels already exists.");
    }
    const courselevels = new db.CourseLevels(params);
    await courselevels.save();
    return courselevels;
}

async function getCourseLevelsatribute(idin) {
    const courselevels = await db.CourseLevels.findByPk(idin);
    if (!courselevels) return "CourseLevels not found";
    return courselevels;
}
async function del(did){
    return await db.CourseLevels.destroy({
        where:{
        id:did
        }
    });
}
