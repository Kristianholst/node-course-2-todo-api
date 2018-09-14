const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {ObjectID}=require('mongodb');


// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

Todo.findByIdAndRemove('5b9c044e247f8327cce81d8a').then((todo)=>{
    console.log(todo);
});