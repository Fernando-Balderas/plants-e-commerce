import express from 'express'

import userController from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', userController.findAll)
router.get('/:userId', userController.findById)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)
router.post('/signup', userController.createUser)
router.post('/login', userController.findByEmailAndPassword)

export default router
