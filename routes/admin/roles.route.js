const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/roles.controller");
const rolesValidate = require("../../validates/admin/rolesValidate");

route.get("/",controller.index);
route.get("/create",controller.create);
route.post(
    "/create",
    rolesValidate.createPost,
    controller.createPost
);
route.get("/edit/:id",controller.edit);
route.patch("/edit/:id",
    rolesValidate.createPost,
    controller.editPatch);

route.get("/permissions",controller.permissions);
route.patch("/permissions",controller.permissionsPatch);

module.exports = route;