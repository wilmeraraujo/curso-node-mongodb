const {matchedData} = require("express-validator");
const {encrypt,compare} = require("../utils/handlePassword");
const {tokenSign} = require("../utils/handleJwt");
const {usersModel} = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req,res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined,{strict:false});//para quitar el campo password en la respuesta
        
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser
        }
        res.send({data}); 
    } catch (error) {
        handleHttpError(res,"ERROR_REGISTER_USER")
    }
    
};

/**
 * este controlador es el encargado de logear una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req,res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email});//.select('password name role email'); => solo para mongo 
        if(!user){
            handleHttpError(res,"USER_NO_EXISTS",404);
            return
        }
        const hashPassword = user.get('password');
        const check = await compare(req.password,hashPassword)

        if(!check){
            handleHttpError(res,"PASSWORD_INVALID",401);
            return
        }
        user.set('password',undefined,{strict:false})
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({data})

    } catch (error) {
        handleHttpError(res,"ERROR_LOGIN_USER")
    }
};

module.exports = {registerCtrl,loginCtrl};