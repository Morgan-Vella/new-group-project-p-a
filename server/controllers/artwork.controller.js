import Artwork from "../models/artwork.model.js";

import fs from "fs";
import path from "path";

import multer from "multer";

import { fileURLToPath } from "url";
const upload = multer({ dest: "uploads/" });

// Manually define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


  // Convert string to ObjectId

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
      const artwork = await Artwork.findById(req.params.id);

      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }

      // If a new image is uploaded, delete the old image
      if (req.file) {
        const oldImagePath = path.join(__dirname, "../", artwork.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });

        // Update the image path in the database
        req.body.image = req.file.path;
      }

      const updatedArtwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, options);
      res.json(updatedArtwork);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  deleteArtwork: async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }

      // Delete the image from the uploads folder
      const imagePath = path.join(__dirname, "../", artwork.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });

      // Delete the artwork from the database
      await Artwork.findByIdAndDelete(req.params.id);

      res.json({ message: "Artwork and image deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Error deleting artwork" });
    }
  },
};
