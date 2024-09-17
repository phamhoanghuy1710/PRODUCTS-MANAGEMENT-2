const ProductsCategory = require("../../models/productsCategory.model");
const systemConfig = require("../../config/systems");
const createTreeHelper = require("../../helpers/createTree");
//[GET] /admin/products-category
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }
    const records = await ProductsCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh muc san pham",
        records: newRecords
    });
}
//[GET] /admin/products-category/create
module.exports.create = async (req,res)=>{
    const find = {
        deleted: false
    }
    const records = await ProductsCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/create",{
        pageTitle: "Them moi mot danh muc san pham",
        records: newRecords
    })
}
//[POST] /admin/products-category/create
module.exports.createPost = async (req,res)=>{
    if (req.body.position === ""){
        const countProductsCategory = await ProductsCategory.countDocuments();
        req.body.position = countProductsCategory + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductsCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}