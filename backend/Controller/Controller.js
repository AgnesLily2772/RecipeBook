import { RecipeModel, UserModel } from "../Model/Model.js";
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
        return
      }

    export const signOutUser = (req, res)=> {
        res.clearCookie("jwtoken", { path: "/" });
        res.status(200).send(`userLogout`);
      }

      export const createRecipe = async(req,res) => {
        try {
                const {title,ingredients,instructions,imageUrl,cuisine,category,preparationTime,createdBy} = req.body;
                const newRecipe = new RecipeModel({title:title,ingredients:ingredients,instructions:instructions,imageUrl:imageUrl,cuisine:cuisine,category:category,preparationTime:preparationTime,createdBy:createdBy})
                await newRecipe.save()
                res.status(200).json(newRecipe);
        } catch (error) {
                res.status(404).json({ message: "Create Recipe Error: " + error });
        }
      }
      export const getUserRecipe =async(req,res) => {
        const userId = req.rootUserId
        const userRecipes = await RecipeModel.find({createdBy:userId})
        res.status(200).json(userRecipes)
      }
      export const getAllUsersRecipes =async(req,res) => {
        const userId = req.rootUserId
        const allUsersRecipes = await RecipeModel.find({createdBy:{$ne:userId}})
        res.status(200).json(allUsersRecipes)
      }