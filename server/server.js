require('./config/config.js');


const _ =require('lodash');
var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose.js');
var{Todo}=require('./models/todo');
var{User}=require('./models/user');
var{authenticate}=require('./middleware/authenticate');

var app=express();
const port=process.env.PORT;

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




app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body =_.pick(req.body,['text','complete']);

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    if (_.isBoolean(body.complete) && body.complete){
        body.completedAt= new Date().getTime();

    } else {
        body.complete=false;
        body.completedAt=null;
    }
    
    
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    
    }).catch((e)=>{
        res.status(400).send();
    })




});

app.post('/user',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user= new User(body);
    user.save().then((user)=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    })
        .catch((e)=>{
        res.status(400).send(e);
    })
});


app.get('/users/me',authenticate,(req,res)=>{
    var token=req.header('x-auth');

    User.findByToken(token).then((user)=>{
        if(!user){

        }
        res.send(user);
    }).catch((e)=>{
        res.status(401).send();
    })
});

module.exports={app};