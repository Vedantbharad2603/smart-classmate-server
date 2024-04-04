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
    return await db.BookUpload.findAll();
}
async function getById(id) {
    const bookupload = await db.BookUpload.findByPk(id);
    if (!bookupload) throw new Error("book not found");
    return bookupload;
}
async function update(idin, params) {
    const updatingBookupload = await getbookatribute(idin);
    
    Object.assign(updatingBookupload, params);
    await updatingBookupload.save();
    return updatingBookupload;
}

async function create(params) {
    const bookupload = new db.BookUpload(params);
    await bookupload.save();
    return bookupload;
}

async function getbookatribute(idin) {
    const bookupload = await db.BookUpload.findByPk(idin);
    if (!bookupload) return "BookUpload not found";
    return bookupload;
}
async function del(did){
    return await db.BookUpload.destroy({
        where:{
        id:did
        }
    });
}
