const express = require('express');
const getUser = require('../controller/user/getUser');
const register = require('../controller/user/register');
const login = require('../controller/user/login');
const isAuth = require('../middleware/sessionCheck');
const logout = require('../controller/user/logout');
const forgotPassword = require('../controller/user/forgotPassword');
const updatePassword = require('../controller/user/updatePassword');
const addTask = require('../controller/tasks/addTask');
const getTasks = require('../controller/tasks/getTask');
const deleteTask = require('../controller/tasks/deleteTask');
const updateTask = require('../controller/tasks/updateTask');
const verifyOtp = require('../controller/user/verifyOtp');
const router = express.Router();

router.get('/userinfo',getUser);
router.post('/login',login);
router.get('/logout',logout);
router.get('/dashboard',isAuth,getUser);
router.post('/signup',register);
router.post('/forgotpassword',forgotPassword);
router.post('/updatepassword',updatePassword);
router.post('/verifyotp',verifyOtp);
router.get("/getTask",isAuth,getTasks);
router.post('/addtask',isAuth,addTask);
router.delete('/deletetask/:id',isAuth,deleteTask);
router.put('/updatetask/:id',isAuth,updateTask);

module.exports = router;