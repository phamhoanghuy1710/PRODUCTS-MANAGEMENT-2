const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();
const productsCategoryValidate = require("../../validates/admin/productsCategoryValidate");
const uploadCloundMiddleware = require("../../middlewares/admin/uploadClound.middleware");

const controller = require("../../controllers/admin/products-category.controller");

route.get("/",controller.index);
route.get("/create",controller.create);
route.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloundMiddleware.upload,
    productsCategoryValidate.createPost,
    controller.createPost);
route.get("/edit/:id",controller.edit);
route.patch("/edit/:id",
    upload.single('thumbnail'),
    uploadCloundMiddleware.upload,
    productsCategoryValidate.createPost,
    controller.editPatch
);
module.exports = route;