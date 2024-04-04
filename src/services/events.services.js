const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del
};
async function getAll() {
    return await db.Events.findAll();
}
async function getById(id) {
    const events = await db.Events.findByPk(id);
    if (!events) throw new Error("Events not found");
    return events;
}

async function update(idin, params) {
    const events = await getaddressatribute(idin);
    Object.assign(events, params);
    await events.save();
    return events;
}

async function create(params) {
    const events = new db.Events(params);
    await events.save();
    return events;
}

async function getaddressatribute(inid) {
    const events = await db.Events.findByPk(inid);
    if (!events) return "Events not found";
    return events;
}
async function del(did){
    return await db.Events.destroy({
        where:{
        id:did
        }
    });
}
