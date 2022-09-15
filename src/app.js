const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get("/mario", async(req, res)=>{   
    try{
        const marios = await marioModel.create({
            name : req.body.name,
            weight: req.body.weight
        });
        res.json ({
            status:200,
            marios
        })
    }catch(err){
        res.json({
           status:500,
           message: err.message
        })
    }
})

app.get("/mario/:id", async(req, res)=>{ 
    try{
        const ID = req.params.id;
        const marios = await marioModel.find({_id:ID})
        res.status(200)
        res.json ({
          marios
        })
    }catch(err){
        res.json({
           status:400,
           message: err.message
        })
    }
})

app.patch("/mario/:id", async(req, res)=>{
    
    try{
        const marios = await marioModel.findOneAndUpdate(req.params.id, req.body)
        res.status(200)
        res.json({
        marios,
        });
    }catch(err){
        res.json({
        status: 400,
       message: err.message
    }
    )}
    
})

app.post("/mario",async (req, res) => {   
    try{
        const data = req.body;
        const marios = await marioModel.create(data)
        console.log(data)
        res.status(201)
         res.json({
          marios,
         });
    }catch(err){
        res.json({
        status: 400,
       message: err.message
        })
    }
        
   
})

app.delete("/mario/:id",async (req, res) => {   
    try{
        const ID = req.params.id;
        const marios = await marioModel.findOneAndDelete({_id:ID})
        res.status(200)
        res.json({message: "character deleted"});
    }catch(err){
        res.json({
        status: 400,
       message: err.message
    }
    )}
   
})



module.exports = app;