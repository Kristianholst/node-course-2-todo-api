
const {MongoClient,ObjectId}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
    return console.log('unable to connect');
}

console.log('connected to db');
const db = client.db('Todoapp');

db.collection('Users').findOneAndUpdate(
    {_id: new ObjectId("5b955686e64b5911d02a6f10")
},{
     $set: {name:"Ronny"
    },
    $inc:{ age: +1} 
    
    },{
        returnOriginal:false
    })
 .then((result)=>{
    console.log('Updated');
    console.log(result.value);
},(err)=>{
    console.log('unable to delete',err)
});


//client.close();
});