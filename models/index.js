const {DataTypes, Sequelize} = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

// look for an enviroment variable will be called NODE_ENV and read it's value
// enviroment variables are set for your whole computer (or for a server)
// any application running on this computer or server can read these enviroment variables
// at azure, we'll create an enviroment variable called NODE_ENV and set it to "production"
// if there is not NODE_ENV set, like on your computer, we'll use the value 'development'
const env = process.env.NODE_ENV || "development"

const config = configJson[env] // read the configuration object for 'development' or 'production'

const sequelize = new Sequelize(config)

const database = {  //this is required for sequelize to work
    sequelize: sequelize,
    Sequelize: Sequelize
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name // 'Student'
database[studentModelName] = studentModel

module.exports = database //Connects and sends data to database

