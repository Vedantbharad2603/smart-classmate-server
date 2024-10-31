const db = require("../helper/db.helper");
const valid = require("../helper/data.validator");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getByDay,
    create,
    update,
    del,
    getTimetableById
};

async function getAll() {
    return await db.TimeTable.findAll();
}


async function getByDay(dayin) {
    return await db.TimeTable.findAll({
        where: {
            day: {
                [Op.eq]: dayin
            }
        },
        order: [['slot_number', 'ASC']]
    });
}




async function create(params) {
    const createdTimetables = [];

    for (const entry of params) {

        const timetable = new db.TimeTable(entry); // Use the correct model name
        await timetable.save();
        createdTimetables.push(timetable); // Collect created entries
    }

    return createdTimetables; // Return all created entries
}


async function update(id, params) {
    const timetableEntry = await getTimetableById(id);
    if (!timetableEntry) throw new Error("Timetable entry not found");

    Object.assign(timetableEntry, params);
    await timetableEntry.save();
    return timetableEntry;
}

async function getTimetableById(id) {
    const timetable = await db.TimeTable.findByPk(id);
    if (!timetable) throw new Error("Timetable entry not found");
    return timetable;
}

async function del(id) {
    const result = await db.TimeTable.destroy({
        where: { id }
    });
    return result ? "Deleted successfully" : "Timetable entry not found";
}
