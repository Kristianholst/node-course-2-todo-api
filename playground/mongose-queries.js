const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {ObjectID}=require('mongodb');

var id='5b197672a77535242a124a79';
ObjectID.isValid(id);


Todo.find({
    _id:id
}).then((todos)=>{
    console.log('Todos',todos);
},(e)=>{
    console.log('ID not found')
});
//commemt

Todo.findOne({
    _id:id
}).then((todos)=>{
    console.log('Todos',todos);
},(e)=>{
    console.log('ID not found')
});

Todo.findById(id).then((todos)=>{
    console.log('Todos',todos);
},(e)=>{
    console.log('ID not found')
});