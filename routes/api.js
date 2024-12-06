const express = require('express')
const database = require('../models') // will require the index.js file from this directory
const student = require('../models/student')
const Student = database.Student // the student model

const router = express.Router()

router.get('/students', function(req, res, next) {
    // query database, get all rows from DB,
    // convert to JSON form
    // available in the then function
    Student.findAll( { order: ['name']}).then(students => {
        return res.json(students)
    })
})


//recieves and confirms students from POST requests
router.post('/students', function(req, res, next) {
    const newStudent = req.body
    console.log(newStudent)
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')
    }).catch( err => {
        //400 = bad request - client sends bad/invalid data
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        } else{
            // some other error?
            next(err)
        }
    })
})

router.patch('/students/:id', function(req, res, next) { //colon acts as placeholder
    // matches requests to /students/1
    // students/2
    // students/3
    // req.params stores the id value
    // stores any placeholders in the URL

    const studentID = req.params.id
    const updateStudent = req.body // updated data about this student
    console.log(updateStudent)
    Student.update( updateStudent, { where: { id: studentID} }).then( ( result ) => {

        const rowsModified = result[0]  //
        // if 1 row was changed, we found student and they were updated
        if (rowsModified === 1) {
            return res.send('OK')
        }
        // student id that doesnt exist
        else {
            // if 0 rows were updated, student was not found
            return res.status(404).send('Student not found')
        }

        res.send('ok')  // status is 200 by default
    }).catch( err => { // database error - can't connect

        // invalid data in the updateStudent - eg. no name
        //400 = bad request - client sends bad/invalid data
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        } else{
            // some other error?
            next(err)
        }
    })


    // what kind of errors could we see?

    // database problems - app can't connect to the database


})


router.delete('/students/:id', function(req, res, next) {
    // delete request to /api/students/4 will delete student with id 4
    const studentID = req.params.id
    Student.destroy( { where: { id: studentID } } ).then( (rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted')
        } else { // 0 rows deleted - the student with the id given is not in the database
            return res.status(404).send('Student not found')
        }
        return res.send('Student deleted')
    }).catch( err => {
        return next(err)
    })
})

module.exports = router