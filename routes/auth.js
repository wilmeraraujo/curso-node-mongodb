const express = require("express");
const {registerCtrl,loginCtrl} = require("../controllers/auth");
const router = express.Router();
const {validatorRegister,validatorLogin}= require("../validators/auth");

//TODO http://localhost:3000/api/auth GET, POST, DELETE, PUT
//TODO http://localhost:3000/api/auth/login
//TODO http://localhost:3000/api/auth/register
/**
 * crear un registro
 */
router.post("/register",validatorRegister,registerCtrl)
router.post("/login",validatorLogin,loginCtrl)

module.exports = router