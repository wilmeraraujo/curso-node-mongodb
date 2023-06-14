const  ENGINE_DB = process.env.ENGINE_DB;

const pathModels = (ENGINE_DB === 'nosql') ? './nosql' : './mysql';
//console.log(pathModels);
const models = {
    usersModel : require(`${pathModels}/users`),
    tracksModel : require(`${pathModels}/tracks`),
    storageModel : require(`${pathModels}/storage`)
}
//console.log(models.usersModel)
module.exports = models