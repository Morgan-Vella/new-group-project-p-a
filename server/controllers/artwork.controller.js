import Artwork from "../models/artwork.model.js"
import User from "../models/user.model.js"

export const ArtworkController = {

    getAllArtworks: async (req, res) => {
        try {
            const allArtworks = await Artwork.find().populate('user').exec()
            res.json(allArtworks)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    getArtworkById: async (req, res) => {
        try {
            const oneArtwork = await Artwork.findById(req.params.id).populate("user").exec()
            res.json(oneArtwork)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    createArtwork: async (req, res) => {
        try {
            const newArtwork = await Artwork.create(req.body)
            const user = await User.findById(newArtwork.user)
            user.artworks.push(newArtwork)
            console.log(user.artworks)
            res.json(newArtwork)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    updateArtwork: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        }
        try {
            const updatedArtwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(updatedArtwork)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    deleteArtwork: async (req, res) => {
        try {
            const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id)
            res.json(deletedArtwork)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

}