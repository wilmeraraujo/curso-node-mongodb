const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")//libreria para borrado logico
const TracksScheme = new mongoose.Schema(
    {
        name: {
            type:String,
        },
        album:{
            type:String,
        },
        cover:{
            type:String,
            validate:{
                validator:(req) => {
                    return true;
                },
                message:"ERROR_URL",
            },
        },
        artist:{
            name:{
                type:String,
            },
            nickname:{
                type:String,
            },
            nationality:{
                type:String,
            },
        },
        duration:{
            start:{
                type:Number,
            },
            end:{
                type:Number,
            },
        },
        mediaId:{
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps:true, //createdAt, updatedAt
        versionkey:false,
    }
);

/**
 * implementar metodo propio con relacion a storage
 */
TracksScheme.statics.findAllData =  function (name) {
    const joinData = this.aggregate([//TODO: Tracks
        {
            $lookup:{
                from:"storages", //TODO: Tracks --> storages
                localField:"mediaId", //TODO: Tracks.mediaId
                foreignField:"_id",//TODO: Storages._id --> storages
                as:"audio",//TODO Alias!
            },
        },
        {
            $unwind:"$audio"
        }
    ])
    return joinData;
}


TracksScheme.statics.findOneData =  function (id) {
    const joinData = this.aggregate([//TODO: Tracks
        {
            $match:{
                _id:mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup:{
                from:"storages", //TODO: Tracks --> storages
                localField:"mediaId", //TODO: Tracks.mediaId
                foreignField:"_id",//TODO: Storages._id --> storages
                as:"audio",//TODO Alias!
            },
        },
        {
            $unwind:"$audio"
        }        
    ])
    return joinData;
}

//sobreescribe los metodos que vienen nativos por default
//el mongooseDelete => se lo utiliza para relaizar un borrado logico y no fisico
TracksScheme.plugin(mongooseDelete, {overrideMethods:'all'}) 
module.exports = mongoose.model("tracks", TracksScheme)