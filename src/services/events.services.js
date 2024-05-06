const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    upcoming,
    upcomingone,
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

async function upcoming() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await db.Events.findAll({
        where: {
            event_date: {
                [Op.gt]: today
            }
        },
        order: [['event_date', 'ASC']],
    });
}

async function upcomingone() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await db.Events.findOne({
        where: {
            event_date: {
                [Op.gt]: today
            }
        },
        order: [['event_date', 'ASC']],
        limit: 1
    });
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
