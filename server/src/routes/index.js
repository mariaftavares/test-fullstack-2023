const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const { createUser,updateUser,removeUser,getAllUsers,getUserById} = require('../controllers/users')
const authMiddleware = require("../middlewares/authentication")
const adminMiddleware = require("../middlewares/permission")
const {login, verifyToken} = require('../controllers/auth')

//Dashboard routes
router.get('/dashboard',authMiddleware,dashboardController)

// Users routes 
router.get('/users',authMiddleware,getAllUsers)
router.get('/users/:id',authMiddleware,getUserById)
router.post('/users',authMiddleware,adminMiddleware,createUser)
router.put('/users/:id',authMiddleware,adminMiddleware,updateUser)
router.delete('/users/:id',authMiddleware,adminMiddleware,removeUser)

//Authentication routes
router.post('/login',login)
router.get('/verifiyToken',authMiddleware,verifyToken)

module.exports=router