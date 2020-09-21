//carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const mongoose = require('mongoose')
    const app = express()
    const admin = require('./routes/admin')
    const path = require("path")
//configurações
    //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //handlebars
    app.engine('handlebars', handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')
    //mongoose
    mongoose.connect("mongodb://localhost/blogapp", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log('conectado ao mongo')
    }).catch((err)=>{
        console.log('Erro ao conectar'+err)
    })
    
    //public
    //falando pro express que a pasta dos arquivos estáticos é a pasta public
    app.use(express.static('public'))


    //rotas
    app.use('/admin', admin)

    app.get('/', (req, res)=>{
        res.redirect('/admin')
    })

//outros
    app.listen(8081, ()=>{
        console.log('Servidor rodando porta 8081')
    })