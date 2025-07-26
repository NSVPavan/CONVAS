const BoardContent = require('./../models/boardContentModel');

/*
    function to check if board exists with given boardId
*/
const doesBoardExist = async (boardId) => {
    try {
        const board = await BoardContent.findOne({ boardId });
        return !!board; // Convert the board object to a boolean value
    } catch (error) {
        throw new Error('Error checking if board exists: ' + error.message);
    }
};


/*
    function to create new board with empty content
*/
const createNewBoard = async (boardId, boardElements) => {
    try {
        const newBoardContent = new BoardContent({ boardId, boardElements });
        const savedBoardContent = await newBoardContent.save();
        return savedBoardContent;
    } catch (error) {
        throw new Error('Error creating board content: ' + error.message);
    }
};

/*
  function to get board content by boardId
*/
const getBoardContentById = async (boardId) => {
    try {
        const boardContent = await BoardContent.findOne({ boardId });
        return boardContent;
    } catch (error) {
        throw new Error('Error getting board content by ID: ' + error.message);
    }
};

module.exports = {
    createNewBoard,
    getBoardContentById,
    doesBoardExist
};
