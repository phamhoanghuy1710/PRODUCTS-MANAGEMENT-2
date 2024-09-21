const systemConfig = require("../../config/systems");
const rolesModel = require("../../models/roles.model");

//[GET] /admin/roles
module.exports.index = async (req,res)=>{
    const find = {
        delete: false,
    };
    const records = await rolesModel.find(find);
    res.render("admin/pages/roles/index", {
        pageTitle: "Trang nhom quyen",
        records: records
    });
}