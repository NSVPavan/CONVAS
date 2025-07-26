const { getCachedBoardContents } = require("./userSocketDataStore");
const BoardContent = require("./../models/boardContentModel");
const mongoose = require('mongoose');

module.exports.processCacheToDBStoreForBoardElements = async () => {
    console.log(`processCacheToDBStoreForBoardElements called at : ` + new Date().toLocaleString());

    // read boards from cache 
    const boards = getCachedBoardContents();
    console.log(`boards in cache : ${boards.size}`);

    // iterate through boards and store it in mongo database
    for(let [boardId, boardElements] of boards.entries()){
        const boardContent = await BoardContent.findOne({ boardId: new mongoose.Types.ObjectId(boardId) });
        boardContent.boardElements = boardElements;
        const updatedBoardContent = await boardContent.save();
    }
}
