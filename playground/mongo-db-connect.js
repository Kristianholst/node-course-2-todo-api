const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
    return console.log('unable to connect');
}
console.log('Connected to db');
const db= client.db('Todoapp')

// db.collection('ToDos').insertOne({
//     text: 'Something more',
//     completed: false
// },(err,result)=>{
//     if(err){
//         return console.log('Unable to insert',err);
//     }

//     console.log(JSON.stringify(result.ops,undefined,2));

// })

//insert new doc into users
db.collection('Users').insertOne({
    name: 'Kristian',
    age: 30,
    location: 'Norway'
},(err,result)=>{
    if(err){
        return console.log('Unable to insert',err);
    }

    console.log(JSON.stringify(result.ops[0]._id.getTimestamp() ,undefined,2));

})


client.close();
});