const mongoose = require('mongoose');
const BoardContent = require("./../models/boardContentModel");

module.exports.addElementsToBoard = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const { boardElements } = req.body;

        console.log(`addElementsToBoard called with ${boardId} and ${boardElements}`);

        const boardContent = await BoardContent.findOne({ boardId: new mongoose.Types.ObjectId(boardId) });

        if (!boardContent) {
            return res.status(404).json({ "error": "BoardContent not found" });
        }

        boardContent.boardElements = boardElements;
        const updatedBoardContent = await boardContent.save();

        return res.status(200).json({
            "message": "boardElements updated successfully!!",
            updatedBoardContent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Something went wrong!!!"
        });
    }
}
