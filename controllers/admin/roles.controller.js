const systemConfig = require("../../config/systems");
const rolesModel = require("../../models/roles.model");

//[GET] /admin/roles
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false,
    };
    const records = await rolesModel.find(find);
    res.render("admin/pages/roles/index", {
        pageTitle: "Trang nhom quyen",
        records: records
    });
}

//[GET] /admin/roles/create
module.exports.create = (req,res) =>{
    res.render("admin/pages/roles/create", {
        pageTitle: "Them nhom quyen",
    });
}

//[Post] /admin/roles/create
module.exports.createPost = async (req,res) =>{
    const record = rolesModel(req.body);
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req,res)=>{
    const id = req.params.id;
    const find = {
        deleted : false,
        _id: id
    };
    const role = await rolesModel.findOne(find);
    res.render("admin/pages/roles/edit.pug",{
        pageTitle: "Chinh nhom quyen",
        role: role
    })
}

//[Patch] /admin/roles/edit/:id
module.exports.editPatch = async (req,res) =>{
    const id = req.params.id;
    await rolesModel.updateOne({
        _id: id,
    },req.body);
    req.flash("success",`Chinh sua thanh cong`);
    res.redirect("back");
}

//[Get] /admin/roles/permissions
module.exports.permissions = async (req,res) =>{
    const find = {
        deleted : false,
    }
    const records = await rolesModel.find(find);
    res.render("admin/pages/roles/permissions.pug",{
        pageTitle: "Chinh nhom quyen",
        records: records,
    })
}


//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req,res) =>{
    // console.log(req.body.permissions);
    const permissions = JSON.parse(req.body.permissions);
    // console.log(permissions);
    for (const item of permissions){
        await rolesModel.updateOne({_id:item.id},{permissions:item.permissions});
    };
    req.flash("success",`Chinh sua thanh cong`);
    res.redirect("back");
}

