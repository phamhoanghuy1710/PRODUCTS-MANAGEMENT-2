module.exports.createPost = (req,res,next)=>{
    if (!req.body.title){
        req.flash("error","vui long nhap tieu de nhom quyen!");
        res.redirect("back");
        return;
    }
    next();
}