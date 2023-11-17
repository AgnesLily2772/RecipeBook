import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password : {
            type:String,
            required:true
        },
        dietPreference:{
                type:String,
        },
        location:{
                type:String,
        },
        signedUpAt:{
            type:Date,
            default:Date.now,
            immutable:true
        },
        sessionToken:{
                type:String,
        },
        activationToken:{
                type:String,
                required:true
        },
        isActivated:{
                type:Boolean,
                default:false
        },
        agreedToTerms: {
                type: Boolean,
                default: false
        },
    });

    userSchema.methods.generateSessionToken = async function() {
        try {
            let token = jwt.sign({ _id: this._id }, process.env.SESSION_KEY,{ expiresIn: "2h" });
            this.sessionToken = token
            return token;
        } catch (err) {
            console.log(err);
        }
    };

    export const UserModel = mongoose.model("USER", userSchema);
