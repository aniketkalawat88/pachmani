"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carouselController_1 = require("../controllers/carouselController"); // Update the path as needed
const router = (0, express_1.Router)();
router
    .route("/pages/name/:name")
    .get(carouselController_1.getPageByName)
    .put(carouselController_1.updatePage)
    .delete(carouselController_1.deletePage);
router.route("/pages").get(carouselController_1.getAllPages).post(carouselController_1.createPage);
exports.default = router;
