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
    return await db.Shift.findAll();
}
async function getById(id) {
    const shift = await db.Shift.findByPk(id);
    if (!shift) throw new Error("User not found");
    return shift;
}
async function update(idin, params) {
    const updatingShift = await getshiftatribute(idin);
    const existingShift = await db.Shift.findOne({ where :{shiftName :{[Op.iLike]: params.shiftName}}});
    
    if (existingShift) {
        throw new Error("Shift already exists.");
    }
    Object.assign(updatingShift, params);
    await updatingShift.save();
    return updatingShift;
}

async function create(params) {
    const existingShift = await db.Shift.findOne({ where :{shiftName :{[Op.iLike]: params.shiftName}}});
    if (existingShift) {
        throw new Error("Shift already exists.");
    }

    const shift = new db.Shift(params);
    await shift.save();
    return shift;
}

async function getshiftatribute(username) {
    const shift = await db.Shift.findByPk(username);
    if (!shift) return "Shift not found";
    return shift;
}
async function del(did){
    return await db.Shift.destroy({
        where:{
        id:did
        }
    });
}
