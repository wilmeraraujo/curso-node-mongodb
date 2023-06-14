const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const { validatorCreateItem,validatorGetItem } = require("../validators/tracks");
const {getItems,getItem,createItem,updateItem,deleteItem} = require("../controllers/tracks");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");


//TODO http://localhost:3000/api/tracks GET, POST, DELETE, PUT

/**
 * lista los items
 */
router.get("/", authMiddleware, getItems);
/**
 * obtener detalle de items
 * router.get("/:id/:var1/:var2", getItem);
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);
/**
 * crear un registro
 */
router.post("/", authMiddleware, checkRol(["admin","user"]), validatorCreateItem, customHeader, createItem);
/**
 * actualizar un registro
 */
 router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
/**
 * eliminar un registro
 */
 router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

 module.exports = router