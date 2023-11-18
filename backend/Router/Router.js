import express from "express"
import {signUpUser,signInUser, signOutUser, getUserData, createRecipe, getUserRecipe, getAllUsersRecipes} from "../Controller/Controller.js"
import Authenticate from "../Middleware/Authenticate.js"

const router = express.Router()
router.post("/signup",signUpUser)
router.post("/signin",signInUser)
router.get("/signout", signOutUser);
router.get("/getUserData",Authenticate, getUserData);
router.post("/createRecipe",createRecipe);

router.get("/getUserRecipe",Authenticate,getUserRecipe);
router.get("/getAllUsersRecipes",Authenticate,getAllUsersRecipes);

export default router