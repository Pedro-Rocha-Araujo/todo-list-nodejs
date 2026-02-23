const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")
mongoose.connect("mongodb://127.0.0.1:27017/todolistDb")





const schemaItem = new mongoose.Schema({
    texto: {type: String, required: true, maxLength: 200},
    tipo: {type: String, required: true}
})

const ModelItem = mongoose.model("Item", schemaItem)






app.get("/", async (request, response)=>{
    try{
        const itens = await ModelItem.find({tipo: "home"})
        response.render("index", {
            titulo: "Home",
            itens: itens
        })
    }catch(erro){
        console.log("Algo deu errado!")
    }
    
})

app.post("/", async (request, response)=>{
    let itemTexto = request.body.novoItem
    switch (request.body.botao) {
        case "Home":
            try{
                const add = await ModelItem.insertOne({texto: itemTexto, tipo: "home"})
            }catch(erro){
                console.log("Aconteceu algum erro!")
            } 
            response.redirect("/")
            break

         case "Trabalho":
            try{
                const add = await ModelItem.insertOne({texto: itemTexto, tipo: "trabalho"})
            }catch(erro){
                console.log("Aconteceu algum erro!")
            }
            response.redirect("/trabalho")
            break;

         case "Faculdade":
            try{
                const add = await ModelItem.insertOne({texto: itemTexto, tipo: "faculdade"})
            }catch(erro){
                console.log("Aconteceu algum erro!")
            }
            response.redirect("/faculdade")
            break

        default:
            break;
    }
})

app.post("/deletar/:dinamica", async (request, response)=>{
    let idDeletado = request.body.btndeletar
    try{
        const deletar = await ModelItem.deleteOne({_id: idDeletado})
        response.redirect("/"+ request.params.dinamica)
    }catch(erro){
        console.log("Algum erro aconteceu!")
    }
})

app.get("/:dinamica", async (request, response)=>{
    let nomeRota = (request.params.dinamica).toLowerCase()
    const itens = await ModelItem.find({tipo: nomeRota})
    response.render("index", {
        titulo: nomeRota,
        itens: itens
    })
})

app.post("/:dinamica", async (request, response)=>{
    let nomeItem = request.body.novoItem
    let rota = (request.params.dinamica).toLowerCase()
    try{
        const query = await ModelItem.insertOne({texto: nomeItem, tipo: rota})
        response.redirect("/"+ rota)
    }catch{
        console.log("Erro")
    }
})


app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})