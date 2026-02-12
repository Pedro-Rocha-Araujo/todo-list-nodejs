const express = require("express")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

const itens = []
const itensTrabalho = []
const itensSobre = []

app.get("/", (request, response)=>{
    response.render("index", {
        titulo: "Todo-List",
        itens: itens
    })
})

app.post("/", (request, response)=>{
    let item = request.body.novoItem
    switch (request.body.botao) {
        case "Todo-List":
            if(item !== ""){
                itens.push(item)
            }
            response.redirect("/")
            break;
        case "Trabalho":
            if(item !== ""){
                itensTrabalho.push(item)
            }
            response.redirect("/trabalho")
            break;
        case "Faculdade":
            if(item !== ""){
                itensSobre.push(item)
            }
            response.redirect("/faculdade")
            break
        default:
            break;
    }
})

app.get("/trabalho", (request, response)=>{
    response.render("index", {
        titulo: "Trabalho",
        itens: itensTrabalho
    })
})

app.post("/trabalho", (request, response)=>{
    item = request.body.novoItem
    if(item !== ""){
        itensTrabalho.push(item)
        response.redirect("/trabalho")
    }
})

app.get("/faculdade", (request, response)=>{
    response.render("index", {
        titulo: "Faculdade",
        itens: itensSobre
    })
})

app.post("/faculdade", (request, response)=>{
    let item = request.body.novoItem
    itensSobre.push(item)
    response.redirect("/faculdade")

})



app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})