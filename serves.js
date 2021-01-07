const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

// OBS: temos que dizer para o EXPRESS LER O "req.body"
server.use(express.urlencoded({ extended: true }))
// Abaixo é para SOBREESCREVER o METHOD=POST para "PUT" OU "DELETE"
server.use(methodOverride("_method"))
server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(3000, function () {
    console.log('server is running on port 3000')
})