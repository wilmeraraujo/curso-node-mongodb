const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;


const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql" //mysql postgres
    }
);

const dbConnectMySql = async() => {
    try {
        await sequelize.authenticate();
        console.log('MySql Conexion correcta');
    } catch (error) {
        console.log('MySql error de conexion', error)
    }
}

module.exports = {sequelize, dbConnectMySql}