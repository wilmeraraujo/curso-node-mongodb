const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req,res) => {
    //const data = ["hola","mundo"]
    //  res.send({data})
    try {
        const user = req.user;
        const data = await tracksModel.findAllData({});//find
        res.send({data,user});
    } catch (e) {
        handleHttpError(res,'ERROR_GET_ITEMS')
    }    
};
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req,res) => {
    try {
        req = matchedData(req);// matchedData(req)=> limpia la data => quita los campos basura 
        const {id} = req;
        const data = await tracksModel.findOneData(id);//findById
        res.send({data});
    } catch (error) {
        handleHttpError(res,"ERROR_GET_ITEM")
    }
};
/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req,res) => {
    try {
        const body = matchedData(req) // matchedData(req)=> limpia la data => quita los campos basura 
        //req = matchedData(req)
        //const { body } = req
        //console.log(body);
        const data = await tracksModel.create(body)
        //res.send({algo:1})
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_CREATE_ITEMS')
    }    
};
/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req,res) => {
    try {
        //creamos de un objeto dos objetos uno el id y otro con el restante del body {id, ...body}
        const {id, ...body} = matchedData(req); // matchedData(req)=> limpia la data => quita los campos basura 
        const data = await tracksModel.findOneAndUpdate(id,body);
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_UPDATE_ITEMS')
    } 
};
/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req,res) => {
    try {
        req = matchedData(req);// matchedData(req)=> limpia la data => quita los campos basura 
        const {id} = req;
        //const data = await tracksModel.deleteOne({_id:id});//deleteOne=> se lo utiliza para realizar un borrado fisico
        const data = await tracksModel.delete({_id:id});//delete => borrado logico
        res.send({data});
    } catch (error) {
        handleHttpError(res,"ERROR_DELETE_ITEM")
    }
};

module.exports = {getItems,getItem,createItem,updateItem,deleteItem};