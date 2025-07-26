const { createBoard, assignUserToBoard, getBoardDetails, removeUserFromBoard, getBoardsForUser, deleteBoardById, createBoardWithMembers } = require("../controllers/boardController")
const { addElementsToBoard } = require('../controllers/boardElementController')

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       properties:
 *         boardTitle:
 *           type: string
 *           description: The title of the board
 *         boardDescription:
 *           type: string
 *           description: The description of the board
 */

/**
 * @swagger
 * /board/createBoard:
 *   post:
 *     summary: Create a new board
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Board'
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board created successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Requesting user is not a valid user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Requesting user is not a valid user
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/createBoard', createBoard);


/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         memberId:
 *           type: string
 *           description: The ID of the member
 *         role:
 *           type: string
 *           description: The role of the member
 *     BoardWithMembers:
 *       type: object
 *       properties:
 *         boardTitle:
 *           type: string
 *           description: The title of the board
 *         boardDescription:
 *           type: string
 *           description: The description of the board
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * /board/createBoardWithMembers:
 *   post:
 *     summary: Create a new board with members
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardWithMembers'
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board created successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/createBoardWithMembers', createBoardWithMembers);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAssignment:
 *       type: object
 *       required:
 *         - boardId
 *         - userId
 *         - role
 *       properties:
 *         boardId:
 *           type: string
 *           description: The ID of the board
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         role:
 *           type: string
 *           description: The role of the user on the board
 */

/**
 * @swagger
 * /board/assignuser:
 *   post:
 *     summary: Assign a user to a board with a specific role
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAssignment'
 *     responses:
 *       200:
 *         description: User mapped to board successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User mapped to board successfully
 *       202:
 *         description: User is already mapped with board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User is already mapped with board
 *       404:
 *         description: Passed boardID or userId is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Passed boardID or userId is invalid
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/assignUser', assignUserToBoard);

/**
 * @swagger
 * components:
 *   schemas:
 *     RemoveUser:
 *       type: object
 *       required:
 *         - boardId
 *         - userId
 *       properties:
 *         boardId:
 *           type: string
 *           description: The ID of the board
 *         userId:
 *           type: string
 *           description: The ID of the user
 */

/**
 * @swagger
 * /board/removeUser:
 *   post:
 *     summary: Remove a user from a board
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveUser'
 *     responses:
 *       200:
 *         description: User removed from board successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User removed from board successfully
 *       202:
 *         description: User is not mapped with board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User is not mapped with board
 *       404:
 *         description: Passed boardID or userId is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Passed boardID or userId is invalid
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/removeUser', removeUserFromBoard);


/**
 * @swagger
 * components:
 *   schemas:
 *     BoardDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the board
 *         boardTitle:
 *           type: string
 *           description: The title of the board
 *         boardDescription:
 *           type: string
 *           description: The description of the board
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: The ID of the member
 *               memberRole:
 *                 type: string
 *                 description: The role of the member
 *               lastAccessedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The last accessed time of the member
 *               _id:
 *                 type: string
 *                 description: The ID of the member entry
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation time of the board
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update time of the board
 *         __v:
 *           type: integer
 *           description: The version key
 */

/**
 * @swagger
 * /board/{boardId}:
 *   get:
 *     summary: Get details of a board by ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to retrieve
 *     responses:
 *       200:
 *         description: Board details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board details retrieved successfully
 *                 board:
 *                   $ref: '#/components/schemas/BoardDetails'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid boardId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid boardId
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/:boardId', getBoardDetails);

/**
 * @swagger
 * /board/{boardId}:
 *   delete:
 *     summary: Delete a board by ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to delete
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board deleted successfully
 *       400:
 *         description: Invalid boardId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid boardId
 *       404:
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete('/:boardId', deleteBoardById);

/**
 * @swagger
 * /board/getBoardsForUser/{userId}:
 *   post:
 *     summary: Get all boards for a user by user ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve boards for
 *     responses:
 *       200:
 *         description: Boards for user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: boards for user retrieved successfully
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the board
 *                       boardTitle:
 *                         type: string
 *                         description: The title of the board
 *                       boardDescription:
 *                         type: string
 *                         description: The description of the board
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             memberId:
 *                               type: string
 *                               description: The ID of the member
 *                             memberRole:
 *                               type: string
 *                               description: The role of the member
 *                             lastAccessedAt:
 *                               type: string
 *                               format: date-time
 *                               description: The last accessed time of the member
 *                             _id:
 *                               type: string
 *                               description: The ID of the member entry
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The creation time of the board
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The last update time of the board
 *                       __v:
 *                         type: integer
 *                         description: The version key
 *       404:
 *         description: Passed userId is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Passed userId is invalid
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/getBoardsForUser/:userId', getBoardsForUser);

// API for board element update via HTTP path with boardId
router.post('/addElementsToBoard/:boardId', addElementsToBoard);

// TODO: update board API - future once required

module.exports = router;