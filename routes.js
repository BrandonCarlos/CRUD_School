const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req,res) {
    return res.redirect('/teachers')
})

routes.get('/teachers', teachers.index)

routes.get('/students', function(req,res){
    return res.send('alunos')
})

//ROTA DE CRIAÇÃO DO PROFESSOR
routes.get('/teachers/create', function(req, res) {
    return res.render('teachers/create')
})

//SHOW
routes.get('/teachers/:id', teachers.show)

//EDIT
routes.get('/teachers/:id/edit', teachers.edit)

//POST
routes.post('/teachers', teachers.post)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)


module.exports = routes