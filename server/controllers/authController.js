const Roles = require("../constants/Roles");
const User = require("../models/userModel");
const { createSecretToken } = require("../utils/jwtUtils")
const bcrypt = require("bcrypt");

module.exports.SignUp = async (req, res, next) => {
    try {
      const { email, password, firstName, lastName, username, role, createdAt } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }

      if(!role || (role && !(role.toUpperCase() in Roles))){
        console.log(`passed role : ${role}`);
        return res.status(409).json({ message: "invalid role is passed, plz provide valid role"})
      }

      const user = await User.create({ email, password, firstName, role: role.toUpperCase(), lastName, username, createdAt });
      const token = createSecretToken(user._id);
      console.log(`generated token: ${token}`);
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
};

module.exports.SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(409).json({message: 'please provide all required fields', success: false})
        }
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message:'Incorrect password or email', success: false }) 
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.status(400).json({message:'Incorrect password or email', success: false }) 
        }
        const token = createSecretToken(user._id);
        res.status(200).json({ message: "User logged in successfully", success: true, username: user.username, token, userId: user._id, fullname: user.firstName+' '+user.lastName });
        next()
    } catch (error) {
        console.error(error);
    }
}

module.exports.resetPasswordForUser = async (req, res, next) => {
  try {
      const { userId } = req.params;
      const { currentPassword, newPassword } = req.body;

      if(!userId || !currentPassword || !newPassword) {
        return res.status(409).json({message: 'please provide all required fields', success: false})
      }
      
      const user = await User.findOne({ _id: userId });
      if(!user){
        return res.status(400).json({message:'Incorrect userId', success: false }) 
      }
      const auth = await bcrypt.compare(currentPassword, user.password)
      if (!auth) {
        return res.status(400).json({message:'Incorrect current password', success: false }) 
      }

      user.password = await bcrypt.hash(newPassword, 12);
      const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
      return res.status(200).json({ message: 'user password reset successful', success: true, updatedUser })
  } catch (error) {
      console.error(error);
  }
}