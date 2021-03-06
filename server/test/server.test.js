const expect=require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./../server');
const {Todo}=require('./../models/todo');

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



beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
    });

describe('POST/todos',()=>{
    it('should create a new todo',(done)=>{
        var text='Test toto text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });

    it('should not create todo with invalid data', (done)=>{
        request(app)
        .post('/todos')
        .send()
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
    })
});

describe('Get/todos', ()=>{
it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=> {
        expect(res.body.todos.length).toBe(2);
    })
    .end(done);
    });
});


describe('Get/todos/:_id', ()=>{
    it('should get todos by id',(done)=>{
        var hexId = todos[0]._id.toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=> {
            expect(res.body.todo._id).toBe( hexId);
        })
        .end(done);
        });

    it('should not accept wrong input', (done)=>{
        request(app)
        .get('/todos/5b997672a77535242a124a795')
        .expect(404)
        .end(done);
    })
    it('should return not found', (done)=>{
        request(app)
        .get('/todos/5b997672a77535242a124a78')
        .expect(404)
        .end(done);
    })

    });


    describe('DELETE /todos/:id', () => {
        it('should remove a todo', (done) => {
          var hexId = todos[1]._id.toHexString();
      
          request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
              expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
      
              Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
              }).catch((e) => done(e));
            });
        });
        it('should return 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
        
            request(app)
              .delete(`/todos/${hexId}`)
              .expect(404)
              .end(done);
          });
        
          it('should return 404 if object id is invalid', (done) => {
            request(app)
              .delete('/todos/123abc')
              .expect(404)
              .end(done);
          });   
    });

    describe('PATCH /todos/:id', () => {
        it('should UPDATE THE TODOS', (done) => {
          var hexId = todos[0]._id.toHexString();
          var text='new text';
          console.log(hexId);
          request(app)
            .patch(`/todos/${hexId}`)
            .send({
                complete:true,
                text
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.todo.text).toBe(text);
              expect(res.body.todo.complete).toBe(true);
              expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
        });
    });
    