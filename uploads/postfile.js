const multer = require("multer");

//to upload code
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './images/post')
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

//filter -only accepting valid file -png, jpg, gif
const filter = function(req, file, cb){
    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg' || file.mimetype=="application/octet-stream"){
        cb(null,true)
    }
    else{
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    fileFilter : filter
})
module.exports = upload;