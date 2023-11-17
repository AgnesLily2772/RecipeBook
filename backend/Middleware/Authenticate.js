import jwt from "jsonwebtoken"
import { UserModel } from "../Model/Model.js";

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            return res.status(401).json({ error: "Token is missing" });
        }
        
        const verrifyToken = jwt.verify(token, process.env.SESSION_KEY);
        if (!verrifyToken) {
            return res.status(401).json({ error: "Token is invalid" });
        }
        const rootUser = await UserModel.findOne({ _id: verrifyToken._id});
        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.rootUserId = rootUser._id;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
        console.error(err);
    }
}

export default Authenticate;