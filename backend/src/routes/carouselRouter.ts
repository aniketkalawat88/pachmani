import { Router } from "express";
import {
  getAllPages,
  getPageByName,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/carouselController"; // Update the path as needed

const router = Router();
router
  .route("/pages/name/:name")
  .get(getPageByName)
  .put(updatePage)
  .delete(deletePage);

router.route("/pages").get(getAllPages).post(createPage);

export default router;
