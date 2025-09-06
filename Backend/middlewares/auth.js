import jwt from 'jsonwebtoken'
import User from '../models/users.js'


export const protect = async(req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({error: "User not Signed in"});
    const token = authHeader.split(" ")[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(payload.id).select("-password -refreshTokens");
        next();

    }catch(error){
        res.status(401).json({error: "Invalid token"});
    }

    }

    export const authorize = (...roles) => {
        return (req, res, next) => {
            if(!roles.includes(req.user.role)){
                return res.status(401).json({error: "Unauthorized Access"});
            }
            next();
        }
    }