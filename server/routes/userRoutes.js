const { getUsersOfSystem, getUserInfoById } = require("../controllers/userController");

const router = require("express").Router();


/**
 * @swagger
 * /user/getUsersOfSystem/{userId}:
 *   get:
 *     summary: Get users of the system by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users of system
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found with provided userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.get('/getUsersOfSystem/:userId', getUsersOfSystem);


/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user info by userId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User info retrieved successfully!!
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found with provided userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found with provided userId
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
router.get('/:userId', getUserInfoById);

module.exports = router;