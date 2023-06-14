const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {validatorGetItem} = require("../validators/storage");
const { getItems, getItem, createItem, updateItem, deleteItem }= require("../controllers/storage")
//TODO http://localhost:3000/storge

/*router.post("/",uploadMiddleware.single("myfile"), (req,res) => {
    res.send({a:1})
})*/

/**
 * lista de items
 */
router.get("/",getItems);
/**
 * detalle item
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * eliminar item
 */
router.delete("/:id", validatorGetItem, deleteItem);
/**
 * crear item
 */
router.post("/",uploadMiddleware.single("myfile"),createItem);


module.exports = router;