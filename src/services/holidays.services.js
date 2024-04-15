const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    changeStatus,
    upcoming,
    update,
    del
};
async function getAll() {
    return await db.Holidays.findAll();
}


async function upcoming() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return await db.Holidays.findOne({
        where: {
            holiday_date: {
                [Op.gt]: today
            },
            is_holiday: true
        },
        order: [['holiday_date', 'ASC']],
        limit: 1
    });
}

async function getById(id) {
    const holidays = await db.Holidays.findByPk(id);
    if (!holidays) throw new Error("Holidays not found");
    return holidays;
}

async function changeStatus(id) {
    const holidays = await getHolidaysatribute(id);
    if (holidays.is_holiday) {
        holidays.is_holiday = false;
        console.log("It's not holiday");
    } else {
        holidays.is_holiday = true;
        holidays.log("It's holidays");
    }
    await holidays.save();
    return holidays;
}

async function update(idin, params) {
    const holidays = await getHolidaysatribute(idin);
    Object.assign(holidays, params);
    await holidays.save();
    return holidays;
}

async function create(params) {
    const holidays = new db.Holidays(params);
    await holidays.save();
    return holidays;
}

async function getHolidaysatribute(inid) {
    const holidays = await db.Holidays.findByPk(inid);
    if (!holidays) return "Holidays not found";
    return holidays;
}
async function del(did){
    return await db.Holidays.destroy({
        where:{
        id:did
        }
    });
}
