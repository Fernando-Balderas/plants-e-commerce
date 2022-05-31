import express from 'express'

import userController from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', userController.findAll)
router.get('/:userId', userController.findById)
router.put('/:userId/profile', userController.updateProfile)
router.put('/:userId/status', userController.updateStatus)
router.put('/:userId/password', userController.updatePassword)
// router.put('/password-reset', userController.resetPassword)
router.delete('/:userId', userController._delete)
router.post('/signup', userController.create)
router.post('/login', userController.findByEmailAndPassword)

export default router
