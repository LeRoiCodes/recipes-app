import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/Users';


const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (user) {
        return res.json({
            message: "User already exist"
        });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = new userModel({username, password: hashedPassword});
    await newUser.save();

    res.json({
        message: "User registered successfully",
        user: newUser
    });
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await userModel.findOne({ username });

    if(!user) {
        return res.json({
            message: "User does not exist"
        });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword){
        return res.json({
            message: "Username or password is incorrect"
        });
    }

    const token = jwt.sign({id: user._id}, "leroicodes");
    res.json({
        token,
        userId: user._id
    })
});

export default usersRoute = router;