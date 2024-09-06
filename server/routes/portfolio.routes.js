import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { ArtworkController } from "../controllers/artwork.controller.js";
import upload from "../config/multer.config.js";

const PortfolioRouter = Router();

PortfolioRouter.route("/portfolio").get(ArtworkController.getAllArtworks);

PortfolioRouter.route("/portfolio/users").get(UserController.getAllUsers);

PortfolioRouter.route("/portfolio/user/create").post(UserController.createUser);

PortfolioRouter.route("/portfolio/user/login").post(UserController.loginUser);

PortfolioRouter.route("/portfolio/artwork/create").post(
  upload.single("image"),
  ArtworkController.createArtwork
);

PortfolioRouter.route("/portfolio/user/:id")
  .get(UserController.getUserById)
  .delete(UserController.deleteUser);

PortfolioRouter.route("/portfolio/artwork/:id")
  .get(ArtworkController.getArtworkById)
  .delete(ArtworkController.deleteArtwork);

PortfolioRouter.route("/portfolio/:id/edit").patch(UserController.updateUser);

PortfolioRouter.route("/portfolio/artwork/:id").patch(
  ArtworkController.updateArtwork
);

PortfolioRouter.route("/portfolio/artwork/:id").put(upload.single("image"), ArtworkController.updateArtwork);

export default PortfolioRouter;
