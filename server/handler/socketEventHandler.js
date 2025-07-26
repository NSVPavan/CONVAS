const { addUserSession, mapUserToBoard, getBoardElementDataElseIfRequireCreateNewBoard, removeUserDisconnectData, getBoardIdAndUserIdForSocketId, getBoardElementByBoardId, updateBoardElementWithBoardId, setWhiteBoardClearWithBoardId, getSocketIdFromUserId } = require("../utils/userSocketDataStore");
const User = require("./../models/userModel");

const userConnectHandler = async (io, socket, userId, boardId) => {
    console.log(`userConnectHandler called with ${userId}, ${boardId}`);
    
    // add socket_id with userId in userSessions map to maintain the data
    addUserSession(userId, boardId, socket.id)

    // add userId into room with boardId, if room not exists with boardId please create else join the same room
    socket.join(boardId)

    // update boardUserMapping map with boardId and userId to maintain the data
    mapUserToBoard(userId, boardId)

    // get boardElements from boards map if available else get elements data from DB and update boards map data and process with below notification
    let boardElements = await getBoardElementDataElseIfRequireCreateNewBoard(boardId);
    console.log(`board data: ${boardElements}`);

    // publish BOARD_ELEMENTS event with boardID and boardElements to connected user socket id - to provide initial board elements on the client
    io.to(socket.id).emit('BOARD_ELEMENTS', JSON.stringify(boardElements))

    // publish USER_BOARD_JOINED event with boardID and userId to the room with boardId - to provide user connected info to the other subscribed users.
    const user = await User.findById({_id: userId})
    io.to(boardId).except(socket.id).emit('USER_BOARD_JOINED', {boardId, user})
}

const userDisconnectHandler = async (io, socketId) => {
    console.log(`userDisconnectHandler called with ${socketId}`);

    let [boardId, userId] = await getBoardIdAndUserIdForSocketId(socketId);
    console.log(`boardID: ${boardId}, userId: ${userId} for socketId : ${socketId}`);

    // remove socket_id from userSessions map & update boardUserMapping to remove user from map users list
    removeUserDisconnectData(socketId, userId, boardId);

    // publish USER_BOARD_LEAVE event with boardID and userId to the room with boardId - to provide user disconnected info to the other subscribed users.
    const user = await User.findById({_id: userId})
    io.to(boardId).except(socketId).emit('USER_BOARD_LEAVE', {boardId, user})
}

const elementUpdateHandler = async (io, socket, eventData) => {
    // get boardId and boardElements from eventData
    const {boardId, boardElements } = eventData;
    // console.log(`elementUpdateHandler called with ${boardId} & ${boardElements}`);
    
    // get board elements from cache
    let boardElementsData = await getBoardElementByBoardId(boardId)
    // console.log(boardElementsData);

    // update element data on cache
    const index = boardElementsData.findIndex((element) => element.id === boardElements.id);
    if (index === -1) return boardElementsData.push(boardElements);

    boardElementsData[index] = boardElements;
    await updateBoardElementWithBoardId(boardId, boardElementsData);

    // emit ELEMENT-UPDATE to the room with boardId
    io.to(boardId).emit('ELEMENT-UPDATE', {boardId, boardElements})
}

const whiteboardClearHandler = async (io, boardId) => {
    console.log(`whiteboardClearHandler called with boardId: ${boardId}`);

    await setWhiteBoardClearWithBoardId(boardId);

    // trigger WHITEBOARD-CLEAR event for boardId room
    io.to(boardId).emit('WHITEBOARD-CLEAR')
}

const cursorPositionHandler = async (io, socket, eventData) => {
    console.log(`cursorPositionHandler called with ${eventData}`);

    const {x, y, userId, boardId, username} = eventData;

    // get the socket Id of user
    const socketId = getSocketIdFromUserId(userId);

    // publish event to the room with boardId except user's socketId
    io.to(boardId).except(socketId).emit("CURSOR-POSITION", {
        x,
        y,
        username,
        userId
    })
}

module.exports = {
    userConnectHandler, userDisconnectHandler, elementUpdateHandler, whiteboardClearHandler, cursorPositionHandler
};