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
    return await db.Address.findAll();
}
async function getById(id) {
    const address = await db.Address.findByPk(id);
    if (!address) {
        throw new Error("No data found");
    }
    return address;
}

async function update(idin, params) {
    const address = await getaddressatribute(idin);
    if (!address) {
        throw new Error("No data found");
    }
    Object.assign(address, params);
    await address.save();
    return address;
}

async function create(params) {
    const address = new db.Address(params);
    await address.save();
    return address;
}

async function getaddressatribute(inid) {
    const address = await db.Address.findByPk(inid);
    if (!address) return "Address not found";
    return address;
}
async function del(did){
    return await db.Address.destroy({
        where:{
        id:did
        }
    });
}
