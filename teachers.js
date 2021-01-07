const fs = require('fs')
const data = require('./data.json')
// Vamos IMPORTAR nossas FUNÇÔES de FORMATAÇÃO DE DADOS do arquivo "teachers.js"
const { age, graduation, date } = require('./utils')

exports.index = function(req,res){
  // Vamos mandar todos os DADOS DOS PROFESSORES para o INDEX(tabela que vai exibir os dados)
  return res.render('teachers/index', { teachers: data.teachers })
}

exports.post = function(req, res) {
  // Vamos pegar todas as CHAVES (chave e valor)
  const keys = Object.keys(req.body) //Estamos pegando as CHAVES do req.body(formulário)

  // Vamos percorrer o ARRAY(keys)
  for(key of keys) { //Para CADA chave de todas as CHAVES, ou seja um CHAVE DE CADA VEZ
    if(req.body[key] == "") {
      return res.send("Preencha todos os campos por favor!")
    }
  }

  //Vamos desestruturar o OBJETO, para depois podermos formata-los...
  let { avatar_url, name, birth, education, class_type, services } = req.body

  // Aqui no POST iremos FORMATAR ALGUNS DADOS: id, created_at, birth...
  birth = Date.parse(birth)
  const id = data.teachers.length + 1
  const created_at = Date.now()

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    education,
    class_type,
    services,
    created_at
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write Error!")

    return res.redirect("/teachers")
  })
}

//SHOW
exports.show = function(req, res) {
  //REQ.PARAMS
  const { id } = req.params
   
  //Vamos conferir se o ID que está no REQ.PARAMS é o mesmo de ALGUM PROFESSOR do arquivo "data.json"
  const foundTeacher = data.teachers.find(function(teacher) {
    //Para cada PROFESSOR se algum deles tem o "id" igual a do REQ.PARAMS
    return teacher.id == id
  })
   
  if(!foundTeacher) return res.send("Teacher not found!")


  const teacher = {
    ...foundTeacher, //SPREAD(espalhamento dos objetos), e em baixo FORMATANDO alguns OBJETOS
  //Encontramos o professor com o ID certo, vamos FORMATAR os dados dele para exibir no FRONT-END
  age: age(foundTeacher.birth), // Idade FORMATADO
  education: graduation(foundTeacher.education), // Grau de escolaridade formatado
  services: foundTeacher.services.split(","), //Vamos CORTAR A STRING quando virmos uma VIRGULA
  created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at) //Formatamos o created_at
  //para pt-BR
  }

  return res.render("teachers/show", { teacher }) 
}

//EDIT
exports.edit = function(req, res) {
  const { id } = req.params
  const foundTeacher = data.teachers.find(function(teacher) {
    return teacher.id == id
  })

  if(!foundTeacher) return res.send("Teacher not found!")

  //OBS: não vamos mandar a IDADE, e sim o ANO/MÊS/DIA do aniversário
  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return res.render("teachers/edit", { teacher })
}

//PUT
exports.put = function(req, res) {
  const { id } = req.body
  let index = 0

  const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
    if(teacher.id == id) {
      index = foundIndex // ex: id = 3, então index = 3
      return true
    }
  })

  if(!foundTeacher) return res.send("Teacher not found!")

  const teacher = {
    ...foundTeacher, //Dados Antigos
    ...req.body, //Dados Atualizados
    id: Number(id),
    birth: Date.parse(req.body.birth)
  }

  data.teachers[index] = teacher // Inserindo no id ex: id = 2, os dados ATUALIZADOS

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write Error!")

    return res.redirect(`/teachers/${id}`)
  })
}

//DELETE
exports.delete = function(req, res) {
  const { id } = req.body

  const teacherFiltered = data.teachers.filter(function(teacher) {
    // Vamos guardar todos os professores no ARRAY menos o que tiver ID igual a do "req.params"
    return teacher.id != id

  })

  data.teachers = teacherFiltered //Guardando todos os PROFESSORES devolta no ARRAY(TEACHERS)

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write Error!")

    return res.redirect("/teachers")
  })
}
