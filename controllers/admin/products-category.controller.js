const ProductsCategory = require("../../models/productsCategory.model");
const systemConfig = require("../../config/systems");
//[GET] /admin/products-category
module.exports.index = async (req,res)=>{
    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh muc san pham",
    });
}
//[GET] /admin/products-category/create
module.exports.create = (req,res)=>{
    res.render("admin/pages/products-category/create",{
        pageTitle: "Them moi mot danh muc san pham"
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