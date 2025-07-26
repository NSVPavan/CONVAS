const { doesBoardExist, getBoardContentById, createNewBoard } = require("../handler/boardDataHandler");

const userSessions = new Map();
const userBoards = new Map();
const boardUserMapping = new Map();
const boards = new Map();

const addUserSession = (userId, boardId, socketId) => {
    console.log(`addUserSession called with userId: ${userId} and socketId: ${socketId}`);
    userSessions.set(userId, socketId);
    userBoards.set(userId, boardId);
    console.log(userSessions);
};

const mapUserToBoard = (userId, boardId) => {
    console.log(`mapUserToBoard called with userId: ${userId} and boardId: ${boardId}`);
    if (!boardUserMapping.has(boardId)) {
        boardUserMapping.set(boardId, [userId]);
    } else {
        let boardMappedUsers = boardUserMapping.get(boardId);
        if (!boardMappedUsers.includes(userId)) {
            boardMappedUsers.push(userId);
            boardUserMapping.set(boardId, boardMappedUsers);
        }
    }
    console.log(boardUserMapping);
};

const getBoardElementDataElseIfRequireCreateNewBoard = async (boardId) => {
    console.log(`getBoardElementDataAndUpdateIfRequire called with ${boardId}`);
    if (boards.has(boardId)) {
        console.log(`boardId exists in cache`);
        console.log(boards);
        return boards.get(boardId);
    } else {
        console.log(`boardId not there in cache`);
        let boardContent = [];
        if (await doesBoardExist(boardId)) {
            console.log(`boardId available in database`);
            boardContent = await getBoardContentById(boardId);
            console.log(boardContent);
        } else {
            console.log(`boardId not available in database`);
            boardContent = await createNewBoard(boardId, []);
        }
        boards.set(boardId, boardContent['boardElements']);
        console.log(boards);
        return boards.get(boardId);
    }
};

const removeUserDisconnectData = (socketId, userId, boardId) => {
    console.log(`removeUserDisconnectData called with socketID: ${socketId}, userId: ${userId}, boardId: ${boardId}`);
    if (userId !== null) {
        let boardMappedUsers = boardUserMapping.get(boardId);
        console.log(`boardMappedUsers for boardID : ${boardMappedUsers}`);
        if (boardMappedUsers.includes(userId)) {
            let _boardMappedUsers = boardMappedUsers.filter((user_id) => user_id !== userId);
            console.log(`_boardMappedUsers : ${_boardMappedUsers}`);
            boardUserMapping.set(boardId, _boardMappedUsers);
        }

        userBoards.delete(userId);
        userSessions.delete(userId);
    }
};

const getBoardIdAndUserIdForSocketId = async (socketId) => {
    let userId = null;
    for (let [key, value] of userSessions.entries()) {
        if (value === socketId) {
            userId = key;
            break;
        }
    }
    console.log(`userID found : ${userId}`);
    return [userBoards.get(userId), userId];
};

const getBoardElementByBoardId = async (boardId) => {
    if(boards.has(boardId)){
        return boards.get(boardId);
    }else{
        console.log(`board with boardId: ${boardId} not exists in cache`);
        return null;
    }
}

const updateBoardElementWithBoardId = async (boardId, boardElements) => {
    boards.set(boardId, boardElements);
}

const setWhiteBoardClearWithBoardId = async (boardId) => {
    boards.set(boardId, []);

    // need to see to update in database in future
}

const getSocketIdFromUserId = (userId) => {
    return userSessions.get(userId);
}

const getCachedBoardContents = () => {
    return boards;
}

module.exports = {
    addUserSession,
    mapUserToBoard,
    getBoardElementDataElseIfRequireCreateNewBoard,
    removeUserDisconnectData,
    getBoardIdAndUserIdForSocketId,
    getBoardElementByBoardId,
    updateBoardElementWithBoardId,
    setWhiteBoardClearWithBoardId,
    getSocketIdFromUserId,
    getCachedBoardContents
};
