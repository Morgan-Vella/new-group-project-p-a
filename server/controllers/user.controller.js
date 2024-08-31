import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserController = {

    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find()
            res.json(allUsers)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    getUserById: async (req, res) => {
        try {
            const oneUser = await User.findById(req.params.id).populate("artworks")
            res.json(oneUser)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body)
            res.json(newUser)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            const foundUser = await User.findOne({ email })
            if (!foundUser) {
                return res.status(400).json({ message: ["Invalid user credentials"] })
            }

            const isMatch = await bcrypt.compare(password, foundUser.password)
            if (!isMatch) {
                return res.status(400).json({ message: ["Invalid user credentials"] })
            }

            const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })

            res.json({ user: foundUser, token })
        } catch {
            console.log(error)
            res.status(500).json({ message: "Server error" })
        }
    },

    updateUser: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(updatedUser)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.json(deletedUser)
        }
        catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

}