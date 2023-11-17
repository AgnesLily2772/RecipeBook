import { UserModel } from "../Model/Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendActivationEmail } from "../Utils/sendMail_old.js";

export const signUpUser = async (req, res) => {
    const { fullName, email,  password, dietPreference, location } = req.body;
    try {
        const emailCheck = await UserModel.findOne({ email: email });
        if (emailCheck) {
            res.status(404).json({ message: "Email ID already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const activationToken = jwt.sign( { email: email }, process.env.AUTH_KEY, { expiresIn: "1d" });
        const newUser = new UserModel({
           fullName:fullName,
            email: email,
            password: hashedPassword,
            dietPreference:dietPreference,
            location:location,
            activationToken: activationToken,
        });
        await newUser.save();
        const activationLink = `${process.env.CLIENT_URL}/activate?token=${activationToken}`;
        // sendActivationEmail(email, activationLink);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json({ message:  "SignUp Error: "+error });
    }
};

export const signInUser = async (req, res) => {
        const { email, password } = req.body;
        try {
                const user = await UserModel.findOne({ email: email });
                if (!user) {
                        res.status(404).json({ message: "User does not exist" });
                        return
                }
        //     if (!user.isActivated){
        //             res.status(403).json({ message: "Account not activated. Please verify your account.",});
        //             return
        //     }
                const passwordValidation = await bcrypt.compare(password,user.password);
                if (!passwordValidation) {
                        res.status(404).json({ message: "Password is incorrect" });
                        return
                }
                const token = await user.generateSessionToken();
                //production
                // res.cookie("jwtoken", token, { httpOnly: true, expires: new Date(Date.now() + 3600000), secure: true, sameSite:'none' })
                //development
                res.cookie("jwtoken", token, { httpOnly: false, expires: new Date(Date.now() + 3600000), secure: true, sameSite:'none' })
                res.status(200).json(user);
        } 
        catch (error) {
                res.status(404).json({ message: "Signin Error: " + error });
        }
    };
    
    export const getUserData = (req, res) =>{
        res.send(req.rootUser);
      }

    export const signOutUser = (req, res)=> {
        res.clearCookie("jwtoken", { path: "/" });
        res.status(200).send(`userLogout`);
      }