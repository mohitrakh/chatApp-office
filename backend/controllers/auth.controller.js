import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";
export const signUp = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({error: "password dont match"})
        }
        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "user already exist"})
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName, username, password:hashedPass, gender, profilePic: gender === "male" ? boyProfile : girlProfile
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })

        }else{
            res.status(400).json({
                error: "Invalid user data"
            })
        }


      

    } catch (error) {
        console.log(error)
         res.status(500).json({error: "internal server error"})
    }
}

export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!user || !isPassCorrect) {
            return res.status(400).json({
                error: "invalid credentials"
            })
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({error: "internal server error gdfgf"})
    }
}
export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
}
