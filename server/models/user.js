const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _ = require('lodash');
const bcrypt=require('bcryptjs');

var UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique: true,
        validate: {
            validator: (value)=>{
                return validator.isEmail(value);
            },
            message:`(value) is not a valid email`
        }
    },
    password:{ 
        type:String,
        required:true,
        minlength:6

    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]

});

UserSchema.methods.generateAuthToken = function(){
    var user=this;
    var access='auth';
    var token = jwt.sign({_id:user._id.toHexString(),access },'abc123').toString();

    user.tokens=user.tokens.concat([{access,token}]);

   return user.save().then(()=>{
        return token;
    });
};


UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

//statics a object is a model method

UserSchema.statics.findByToken =function(token){
    var User=this; //this is the model
    var decoded;

    try{
        decoded=jwt.verify(token,'abc123')
    }catch (e){
        return new Promise((resolve,reject)=>{
            reject();
        });
        
    }
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};
//adding middleware to save;

UserSchema.pre('save',function(next){
    var user=this;

    if(user.isModified('password')){
       var password=user.password;
       bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
             user.password=hash;
             next();
        });
    });
    
    
    }else{
        next();
    }
})
var User=mongoose.model('User',UserSchema);

module.exports={User};