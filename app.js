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

app.get("/trabalho", async (request, response)=>{
    const itens = await ModelItem.find({tipo: "trabalho"})
    response.render("index", {
        titulo: "Trabalho",
        itens: itens
    })
})

app.post("/trabalho", async (request, response)=>{
    item = request.body.novoItem
    const add = await ModelItem.insertOne({item})
    response.redirect("/trabalho")
})

app.get("/faculdade", async (request, response)=>{
    const itens = await ModelItem.find({tipo: "faculdade"})
    response.render("index", {
        titulo: "Faculdade",
        itens: itens
    })
})

app.post("/faculdade", async (request, response)=>{
    let itemTexto = request.body.novoItem
    try{
        const add = await ModelItem.insertOne({texto: itemTexto, tipo: "faculdade"})
    }catch(rerro){
        console.log("Aconteceu algum erro!")
    }
    let item = request.body.novoItem
    response.redirect("/faculdade")

})



app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})