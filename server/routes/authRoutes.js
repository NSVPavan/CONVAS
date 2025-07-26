const { SignUp, SignIn, resetPasswordForUser} = require("../controllers/authController")

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - username
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         username:
 *           type: string
 *           description: The user's username
 *         role:
 *           type: string
 *           description: The user's role
 *       example:
 *         email: veet3@gmail.com
 *         password: 12345678
 *         firstName: Veet3
 *         lastName: Moradiya
 *         username: Veet23153
 *         role: USER
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User registration API.
 *     description: REST API for user registration.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: A successful user registration
 *       '400':
 *         description: Invalid request parameters / payload
 *       '409':
 *         description: Conflict / User already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/signup', SignUp);

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: neha.kapoor@gmail.com
 *         password: 12345678
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       400:
 *         description: Bad request - missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       409:
 *         description: Conflict - user already logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already logged in
 */
router.post('/login', SignIn)

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetPassword:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           description: The user's current password
 *         newPassword:
 *           type: string
 *           description: The user's new password
 *       example:
 *         currentPassword: 123456789
 *         newPassword: 12345678
 */

/**
 * @swagger
 * /reset-password/{userId}:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully
 *       400:
 *         description: Bad request - invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid current password
 *       409:
 *         description: Conflict - password could not be reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Conflict in resetting password
 */
router.post('/reset-password/:userId', resetPasswordForUser)

module.exports = router;