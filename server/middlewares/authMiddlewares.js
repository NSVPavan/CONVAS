require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Roles = require('../constants/Roles');

/*
    Verify JWT from authorization header Middleware
*/
module.exports.verifyAuthHeaderAndRole = (roles) => async (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    console.log(`authHeader : ${authHeader}`);

    if(!authHeader){
        return res.status(403).json({ message: 'authentication token is required', success: false })
    }

    const token = authHeader.split(" ")[1]
    console.log(`token : ${token}`);

    jwt.verify(token, process.env.TOKEN_KEY, async (error, decoded) => {
        if(error) {
            return res.status(403).json({
                message: 'Invalid token passed',
                success: false
            })
        }
        console.log(decoded.id);

        const user = await User.findById(decoded.id)
        console.log(`requesting user : ${user}`);

        // checking for role
        if(roles){
            console.log(`route is allowed for roles : ${roles}`);
            if(!roles.includes(user.role.toLowerCase())){
                return res.status(403).json({
                    message: 'you are not authorized to access the endpoint'
                })
            }   
        }    

        req.userId = user._id
        next();
    })
}
