const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./firebase/key.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/cadastrar", function(req, res){
    var result = db.collection('agendamentos').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log('Added document');
        res.redirect('/')
    })
})

app.get("/consulta", function(req, res){
    db.collection('agendamentos').get()
        .then((snapshot) => {
            const agendamentos = [];
            snapshot.forEach((doc) => {
                agendamentos.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            res.render("consulta", { agendamentos: agendamentos });
        })
        .catch((error) => {
            console.log("Erro ao recuperar dados:", error);
            res.status(500).send("Erro ao recuperar dados");
        });
});

app.listen(8081, function(){
    console.log("Servidor ativo!")
})