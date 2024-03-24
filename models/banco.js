const Sequelize = require("sequelize")
const sequelize = new Sequelize("bd_handlebars", "root", "",{
    host: "localhost",
    dialect: "mysql"
})
 
sequelize.authenticate().then(function(){
    console.log("Servidor ativo!")
}).catch(function(erro){
    console.log("Falha de conexão" + erro)
})

const agendamentos = sequelize.define("agendamentos",{
    nome:{
        type: Sequelize.STRING
    },
    endereco:{
        type: Sequelize.STRING
    },
    bairro:{
        type: Sequelize.STRING
    },
    cep:{
        type: Sequelize.INTEGER
    },
    cidade:{
        type: Sequelize.STRING
    },
    estado:{
        type: Sequelize.STRING
    },
    observacao:{
        type: Sequelize.TEXT
    }
})