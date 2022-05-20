import express from 'express'

import UserController from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', UserController.findAll)
router.get('/:userId', UserController.findById)
router.put('/:userId', UserController.updateUser)
router.delete('/:userId', UserController.deleteUser)
router.post('/', UserController.createUser)
router.post('/login', UserController.findByEmailAndPassword)

export default router
