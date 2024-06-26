const db = require("../helper/db.helper");
const { Op, where } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
};
async function getAll() {
    const shifts = await db.Shift.findAll();
    if (shifts.length <= 0) {
        throw new Error("Shifts not found");
    }
    return shifts;
}
async function getById(idin) {
    const shift = await db.Shift.findOne({
        where:{
        id:idin
        }
    });
    if (shift.length <= 0) {
        throw new Error("Shift not found");
    }
    return shift;
}
async function update(idin, params) {
    const updatingShift = await getshiftatribute(idin);
    const existingShift = await db.Shift.findAll({
        where: {
            start_time : params.start_time,
            end_time : params.end_time,
        },
    });
    
    if (existingShift.length > 0)  {
        throw new Error("Shift with the same start and end time already exists.");
    }
    Object.assign(updatingShift, params);
    await updatingShift.save();
    return updatingShift;
}

async function create(params) {
    const existingShift = await db.Shift.findAll({
        where: {
            start_time : params.start_time,
            end_time : params.end_time,
        },
    });
    if (existingShift.length > 0)  {
        throw new Error("Shift already exists.");
    }

    const shift = new db.Shift(params);
    await shift.save();
    return shift;
}

async function getshiftatribute(id) {
    const shift = await db.Shift.findByPk(id);
    if (!shift) {
        throw new Error("Shift not found");
    }
    return shift;
}
async function del(did){
    const shift = await db.Shift.findByPk(did);
    if (!shift) {
        throw new Error("Shift not found");
    }
    return await db.Shift.destroy({
        where:{
        id:did
        }
    });
}
