const mongoose = require('mongoose');

const User = require("../models/userModel");

module.exports.getUsersOfSystem = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log(`getUsersOfSystem called with ${userId}`);

        const user = await User.findById(userId);
        console.log(user);
        if(!user){
            return res.status(404).json({ message: 'User not found with provided userId', success: false})
        }

        const users = await User.find({});
        console.log(`users in database : ${users.length}`);

        const filteredUser = users.filter((user) => !user._id.equals(userId))
        console.log(`filtered users : ${filteredUser.length}`);

        res.status(200).json({ message: 'Users of system', users: filteredUser, success: true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports.getUserInfoById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log(`getUserInfoById called with ${userId}`);

        const user = await User.findById(userId);
        console.log(user);
        if(!user){
            return res.status(404).json({ message: 'User not found with provided userId', success: false})
        }

        res.status(200).json({ message: 'User info retrieved succesfully!!', user, success: true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}