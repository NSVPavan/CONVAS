const mongoose = require('mongoose');

const Board = require("./../models/boardModel");
const User = require("../models/userModel");

module.exports.createBoard = async (req, res, next) => {
    try {
        const { boardTitle, boardDescription } = req.body;

        // Check if the requesting user exists
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Requesting user is not a valid user",
                success: false
            });
        }

        // Create member object for the board
        const members = [{
            memberId: req.userId,
            memberRole: 'OWNER',
            lastAccessedAt: null,
        }];

        // Create the board
        const board = await Board.create({
            boardTitle,
            boardDescription,
            members
        });

        console.log(`Board created with details: ${board}`);
        res.status(201).json({ message: "Board created successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports.createBoardWithMembers = async (req, res, next) => {
    try {
        const { boardTitle, boardDescription, members } = req.body;

        console.log(members);
        
        let memberObj = []
        
        members.forEach((member) => {
            memberObj.push({
                memberId: member.memberId,
                memberRole: member.role,
                lastAccessedAt: null
            })
        })

        console.log(memberObj);

        // Create the board
        const board = await Board.create({
            boardTitle,
            boardDescription,
            members: memberObj
        });

        console.log(`Board created with details: ${board}`);
        res.status(201).json({ message: "Board created successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports.assignUserToBoard = async (req, res, next) => {
    try {
        const { boardId, userId, role } = req.body;

        console.log(`${boardId} ${userId} ${role}`);

        const [board, user] = await Promise.all([
            Board.findById(boardId),
            User.findById(userId)
        ]);

        if (!board || !user) {
            return res.status(404).json({
                message: "Passed boardID or userId is invalid",
                success: false
            });
        }

        const isAlreadyMapped = board.members.some(member => member.memberId.equals(user._id));

        console.log(`isAlreadyMapped : ${isAlreadyMapped}`);
        if (isAlreadyMapped) {
            return res.status(202).json({
                message: "User is already mapped with board",
                success: true
            });
        }

        board.members.push({
            memberId: userId,
            memberRole: role.toUpperCase(),
            lastAccessedAt: null,
        });

        console.log(board.members);

        const updatedBoard = await Board.findByIdAndUpdate(board._id, board, { new: true });

        console.log(`updated board : ${updatedBoard}`);

        res.status(200).json({ message: "User mapped to board successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Controller function to handle GET request for board details
module.exports.getBoardDetails = async (req, res, next) => {
    try {
        const { boardId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }

        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({
                message: "Board not found",
                success: false
            });
        }

        // Return board details in the response
        res.status(200).json({
            message: "Board details retrieved successfully",
            board,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports.removeUserFromBoard = async (req, res, next) => {
    try {
        const { boardId, userId } = req.body;

        console.log(`${boardId} ${userId}`);

        const [board, user] = await Promise.all([
            Board.findById(boardId),
            User.findById(userId)
        ]);

        if (!board || !user) {
            return res.status(404).json({
                message: "Passed boardID or userId is invalid",
                success: false
            });
        }

        const isAlreadyMapped = board.members.some(member => member.memberId.equals(user._id));

        console.log(`isAlreadyMapped : ${isAlreadyMapped}`);
        if (!isAlreadyMapped) {
            return res.status(202).json({
                message: "User is not mapped with board",
                success: true
            });
        }

        board.members = board.members.filter(member => !member.memberId.equals(user._id));
        console.log(board.members);

        const updatedBoard = await Board.findByIdAndUpdate(board._id, board, { new: true });
        console.log(`updated board : ${updatedBoard}`);

        res.status(200).json({ message: "User removed from board successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports.getBoardsForUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        console.log(`${userId}`);

        const [user] = await Promise.all([
            User.findById(userId)
        ]);

        if (!user) {
            return res.status(404).json({
                message: "Passed userId is invalid",
                success: false
            });
        }

        const boards = await Board.find({ 'members.memberId': userId })
        console.log(boards);

        const respBoard = [];
        boards.forEach((board) => {
            const member = board.members.find(m => m.memberId.equals(userId));
            if (member) {
                respBoard.push({ 
                    ...board._doc, 
                    role: member.memberRole,
                    lastAccessedAt:  member.lastAccessedAt
                });
            }
        });

        res.status(200).json({
            message: "boards for user retrieved successfully",
            respBoard, 
            boardCnt: respBoard.length, 
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports.deleteBoardById = async (req, res, next) => {
    try {
        const { boardId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }

        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).json({
                message: "Board not found",
                success: false
            });
        }

        const deletedBoard = await Board.findByIdAndDelete(boardId);
        console.log(`deletedBoard ${deletedBoard}`);

        // Return board details in the response
        res.status(200).json({
            message: "Board deleted successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}