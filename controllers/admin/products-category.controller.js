const ProductsCategory = require("../../models/productsCategory.model");
const systemConfig = require("../../config/systems");
//[GET] /admin/products-category
module.exports.index = async (req,res)=>{
    const find = {
        deleted: false
    }
    const records = await ProductsCategory.find(find);
    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh muc san pham",
        records: records
    });
}
//[GET] /admin/products-category/create
module.exports.create = async (req,res)=>{
    const find = {
        deleted: false
    }
    function createTree(arr,parentId="") {
        let tree = [];
        arr.forEach((item) => {
            if (item.parent_id == parentId){
                const newItem = item;
                const children = createTree (arr,item.id);
                if (children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const records = await ProductsCategory.find(find);
    const newRecords = createTree(records);
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