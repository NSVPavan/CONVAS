const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    boardTitle: {
        type: String,
        required: [true, "board title is required"],
    },
    boardDescription: {
        type: String,
        required: [true, "board description is required"],
    },
    members: [{
        memberId: mongoose.Schema.Types.ObjectId,
        memberRole: {
            type: String,
            enum: ['OWNER', 'EDITOR', 'VIEWER']
        },
        lastAccessedAt: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Board", boardSchema);