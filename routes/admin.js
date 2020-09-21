const express = require('express')
const router = express.Router()

//função de validação de formulario
const validarFunc = require('../verifica_erros')

//usando um model(tabela) externo, passos: 
    //1)importa o mongoose
const mongoose = require('mongoose')

    //2)chama o arquivo que está o model
require('../models/Categoria')
    //3)executa essa função
const Categoria = mongoose.model('categorias')

router.get('/', (req, res)=>{
    res.render('admin/index')
})
router.get('/posts', (req, res)=>{
    res.send('Página de posts')
})
//listar
router.get('/categorias', (req, res)=>{
    Categoria.find().sort({date:'desc'}).lean().then((categorias)=>{
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err)=>{
        console.log("houve um erro ao listar"+err)
    })
    
})
router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategoria')
})
//editar
router.get('/categorias/edit/:id', (req, res)=>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render('admin/editarCategorias', {categoria:categoria})
    }).catch((err)=>{
        res.render('admin/warning', {mensagem: 'Essa categoria não existe. Você será redirecionado.'})
        
    })
})
//cadastrar
router.post('/categorias/nova', (req, res)=>{
    //validando formulário
    let erros = validarFunc(req.body)
    if(erros.length > 0){
        res.render("admin/addcategoria", {erros: erros})
    }else{
    const novaCategoria = {
        //req.body.name_de_acordo_com_o_form_html
        nome: req.body.nome,
        slug: req.body.slug,
    }

    new Categoria(novaCategoria).save().then(()=>{
        res.redirect("/admin/categorias")
    }).catch((err)=>{
        console.log('Erro ao salvar categoria'+err)
    })
}
})
//enviar update
router.post('/categorias/edit', (req, res)=>{
    let erros = validarFunc(req.body)
    if(erros.length > 0){
        res.send("erro, preencha corretamente")
    }else{
    Categoria.findOneAndUpdate({_id:req.body.id}, {nome : req.body.nome, slug: req.body.slug}).lean().then((categoria)=>{
        console.log('alterado com sucesso')
        res.redirect('/admin/categorias')
    }).catch((err)=>{
        console.log("erro na alteraçao"+err)
        res.render('admin/warning', {mensagem: 'erro na busca para alterar'})
   })
}})

router.post('/categorias/deletar', (req, res) =>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        res.redirect('/admin/categorias')
    }).catch((err)=>{
        res.send('Houve um erro ao tentar deletar a categoria '+err)
    })
})
//warning
router.get('/warning', (req, res)=>{
    res.render('admin/warning')
})

module.exports = router