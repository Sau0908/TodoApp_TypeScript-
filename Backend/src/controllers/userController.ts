import UserModel from "../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


const createToken = (id: string): string => {
    return jwt.sign({id}, process.env.JWT_SECRET as string, {
        expiresIn: 3 * 24 * 60 * 60
    });
};

const loginUser = async (req: any, res: any): Promise<void> => {

    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({message: "Please enter all fields"});
        }
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = createToken(user._id);
        res.status(200).json({user, token});
    } catch (error:any) {
        res.status(500).json({message: error.message});
    }
};


const registerUser = async (req: any, res: any): Promise<void> => {
    
    const {name, email, password} = req.body;
  
    try {
        
        const exists = await UserModel.findOne({email});
        if (exists) {
            return res.status(400).json({message: "User already exists"});
        }
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            return res.status(400).json({message: "Please enter all fields"});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Please enter a valid email"});
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({message: "Please enter a strong password"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({name, email, password: hashedPassword});
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(200).json({user, token});
    } catch (error:any) {
        res.status(500).json({message: error.message});
    }
};


const getUser = async (req: any, res: any): Promise<void> => {
    const id = req.user.id;
    try {
        const user = await UserModel.find({_id: id});
        res.status(200).json({user: user[0]});
    } catch (error:any) {
        res.status(502).json({message: error.message});
    }
};

export {loginUser, registerUser, getUser};

