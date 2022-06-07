import express from 'express'
import passport from 'passport'
import verifyAuth from '../middlewares/verifyAuth'

import verifyPermission from '../middlewares/verifyPermission'
import userController from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', userController.findAll)
router.get('/:userId', userController.findById)
// TODO: Add auth verification to findAll and findById paths
router.put('/:userId/profile', verifyAuth, userController.updateProfile)
router.put('/:userId/password', verifyAuth, userController.updatePassword)
router.put(
  '/:userId/status',
  verifyAuth,
  verifyPermission,
  userController.updateStatus
)
router.put('/password-reset', userController.resetPassword)
router.delete('/:userId', verifyAuth, verifyPermission, userController._delete)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  userController.googleLogin
)
router.post('/login', userController.findByEmailAndPassword)
router.post('/signup', userController.create)

export default router
