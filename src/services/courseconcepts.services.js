const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    create2,
    update,
    getlevels,
    del,
};
async function getAll() {
    return await db.CourseConcepts.findAll();
}

async function getlevels(courseIdin, courseLevelIdin) {
    let whereClause = { courseId: courseIdin };
    if (courseLevelIdin !== null) {
        whereClause.courseLevelId = courseLevelIdin;
    }

    return await db.CourseConcepts.findAll({ where: whereClause });
}

async function getById(id) {
    const courseconcepts = await db.CourseConcepts.findByPk(id);
    if (!courseconcepts) throw new Error("Course Concepts not found");
    return courseconcepts;
}
async function update(idin, params) {
    const updatingCourseConcepts = await getCourseConceptsatribute(idin);
    
    Object.assign(updatingCourseConcepts, params);
    await updatingCourseConcepts.save();
    return updatingCourseConcepts;
}

async function create(params) {
    const existingCourseConcepts = await db.CourseConcepts.findOne({ 
        where: { courseId: params.courseId, courseLevelId: params.courseLevelId,concept_name:params.concept_name }
    });

    if (existingCourseConcepts) {
        throw new Error("Course Concept already exists.");
    }

    const maxConceptIndex = await db.CourseConcepts.max('concept_index', {
        where: { courseLevelId: params.courseLevelId,courseId: params.courseId }
    });

    const courseconcepts = new db.CourseConcepts({
        ...params,
        concept_index: (maxConceptIndex || 0) + 1
    });

    await courseconcepts.save();
    return courseconcepts;
}
async function create2(params) {
    const existingCourseConcepts = await db.CourseConcepts.findOne({ 
        where: { courseId: params.courseId,concept_name:params.concept_name }
    });

    if (existingCourseConcepts) {
        throw new Error("Course Concept already exists.");
    }

    const maxConceptIndex = await db.CourseConcepts.max('concept_index', {
        where: {courseId: params.courseId }
    });

    const courseconcepts = new db.CourseConcepts({
        ...params,
        concept_index: (maxConceptIndex || 0) + 1
    });

    await courseconcepts.save();
    return courseconcepts;
}


async function getCourseConceptsatribute(idin) {
    const courseconcepts = await db.CourseConcepts.findByPk(idin);
    if (!courseconcepts) return "Course Concepts not found";
    return courseconcepts;
}
async function del(did){
    return await db.CourseConcepts.destroy({
        where:{
        id:did
        }
    });
}
