import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { ArtworkController } from "../controllers/artwork.controller.js";

const PortfolioRouter = Router();

PortfolioRouter.route("/portfolio")
    .get(ArtworkController.getAllArtworks)

PortfolioRouter.route("/portfolio/users")
    .get(UserController.getAllUsers)

PortfolioRouter.route("/portfolio/user/create")
    .post(UserController.createUser)

PortfolioRouter.route("/portfolio/artwork/create")
    .post(ArtworkController.createArtwork)

PortfolioRouter.route("/portfolio/user/:id")
    .get(UserController.getUserById)
    .delete(UserController.deleteUser)

PortfolioRouter.route("/portfolio/artwork/:id")
    .get(ArtworkController.getArtworkById)
    .delete(ArtworkController.deleteArtwork)

PortfolioRouter.route("/portfolio/:id/edit")
    .patch(UserController.updateUser)

PortfolioRouter.route("/portfolio/artwork/:id/edit")
    .patch(ArtworkController.updateArtwork)

export default PortfolioRouter