
const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
    return console.log('unable to connect');
}

console.log('connected to db');
const db = client.db('Todoapp');

db.collection('Users').findOneAndDelete({_id: new ObjectID("5b95582e904ade2318d5c853")}).then((result)=>{
    console.log('Users');
    console.log(result.value);
},(err)=>{
    console.log('unable to delete',err)
});


//client.close();
});