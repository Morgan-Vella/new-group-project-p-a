import Artwork from "../models/artwork.model.js";

import fs from "fs";
import path from "path";

import multer from "multer";

import { fileURLToPath } from "url";
const upload = multer({ dest: "uploads/" });


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

      
      if (req.file) {
        const oldImagePath = path.join(__dirname, "../", artwork.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });

   
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

      const imagePath = path.join(__dirname, "../", artwork.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });

   
      await Artwork.findByIdAndDelete(req.params.id);

      res.json({ message: "Artwork and image deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Error deleting artwork" });
    }
  },
};
