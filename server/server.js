var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose.js');
var{Todo}=require('./models/todo');
var{User}=require('./models/user');

var app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo=new Todo({
        text:req.body.text,
        complete:req.body.complete
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});


app.get('/todos',(req,res)=>{
    

    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if (ObjectID.isValid(id)){

        Todo.findById(id).then((todo)=>{
        if (!todo){
            res.status(404).send("Not found")
        } else {
            res.send({todo})
        }
    },(e)=>{
        res.send('ID not found')})
    } else {
        res.status(404).send("invalid id");
    }});


 app.delete('/todos/:id',(req,res)=>{
        var id = req.params.id;
        if (ObjectID.isValid(id)){
    
            Todo.findByIdAndRemove(id).then((todo)=>{
            if (!todo){
                res.status(404).send("Not found")
            } else {
                res.send({todo})
            }
        },(e)=>{
            res.send('ID not found')})
        } else {
            res.status(404).send("invalid id");
        }});
        

module.exports={app};