
const {ObjectID}=require('mongodb');

const {User}=require('./../../models/user');
const {Todo}=require('./../../models/todo');


const users=[{
    _id:new ObjectID(),
    email:'Krs@mail.no',
    password:"pass",
    tokens:[
        
    ]
}]
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    complete:false
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    complete:false,
    completedAt:123
  }];



const populateTodos=(done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
    };
