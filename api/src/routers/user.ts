import express from 'express'

import userController from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - name
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * parameters:
 *   userId:
 *     name: userId
 *     description: User's id.
 *     in: formData
 *     required: true
 *     type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * /v1/users/:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', userController.findAll)

/**
 * @swagger
 * /v1/users/:userId:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/:userId', userController.findById)

/**
 * @swagger
 * /v1/users/:userId:
 *   put:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.put('/:userId', userController.update)

/**
 * @swagger
 * /v1/users/:userId:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.delete('/:userId', userController._delete)

/**
 * @swagger
 * /v1/users/signup:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 */
router.post('/signup', userController.create)

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/Login"
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/login', userController.findByEmailAndPassword)

export default router
