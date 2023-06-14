const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null,pathStorage)
    },
    filename:function(req,file,cb){
        //TODO: mi-cv.pdf mi-foto.png mi-video.mp4
        const ext = file.originalname.split(".").pop(); //TODO: ["name","png"]  => pop = toma el ultimo valor del array
        const filename = `file-${Date.now()}.${ext}`; //TODO: file-123123123.mp4
        cb(null,filename)
    },
});

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;