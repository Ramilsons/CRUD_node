var verifica_erros = function(value){
    let numero_erros = []

if(!value.nome || typeof value.nome == undefined || value.nome == null){
    numero_erros.push({
        texto: "Nome Inválido"
    })
}
if(value.nome.length <= 2){
    numero_erros.push({
        texto: "Nome muito curto"
    })
}
if(!value.slug || typeof value.slug == undefined || value.slug == null){
    numero_erros.push({
        texto: "Slug Inválido"
    })
}
return numero_erros;
}

module.exports =  verifica_erros
