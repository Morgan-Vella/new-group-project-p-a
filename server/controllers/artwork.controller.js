import Artwork from "../models/artwork.model.js";
export const ArtworkController = {
  getAllArtworks: async (req, res) => {
    try {
      const allArtworks = await Artwork.find().populate("user_id", "name");
      res.json(allArtworks);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  getArtworkById: async (req, res) => {
    try {
      const oneArtwork = await Artwork.findById(req.params.id).populate(
        "user_id",
        "name"
      );
      res.json(oneArtwork);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  createArtwork: async (req, res) => {
    try {
      const { name, description, user_id } = req.body;
      const image = req.file.path;

      const newArtwork = await Artwork.create({
        name,
        description,
        image,
        user_id,
      });

      res.status(201).json(newArtwork);
    } catch (error) {
      if (error.name === "ValidationError") {
        const formattedErrors = Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {});
        return res.status(400).json(formattedErrors);
      }

      console.error(error);
      res.status(500).json({ general: "An unexpected error occurred." });
    }
  },

  updateArtwork: async (req, res) => {
    const options = {
      new: true,
      runValidators: true,
    };
    try {
      const updatedArtwork = await Artwork.findByIdAndUpdate(
        req.params.id,
        req.body,
        options
      );
      res.json(updatedArtwork);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  deleteArtwork: async (req, res) => {
    try {
      const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
      res.json(deletedArtwork);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
};
