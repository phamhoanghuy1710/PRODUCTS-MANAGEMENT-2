module.exports.createPost = (req,res,next)=>{
    if (!req.body.title){
        req.flash("error","vui long nhap tieu de danh muc san pham!");
        res.redirect("back");
        return;
    }
    next();
}