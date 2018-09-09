
const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
    return console.log('unable to connect');
}

console.log('connected to db');
const db = client.db('Todoapp');

db.collection('Users').find( {
    name: "Kristian"
}).toArray().then((docs)=>{
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
    console.log('unable to fetch todos',err)
});


//client.close();
});