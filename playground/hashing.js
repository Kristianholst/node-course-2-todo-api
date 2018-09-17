const {SHA256}=require('crypto-js');
const jwt =require('jsonwebtoken');
var data ={
    password:"1223"
};


//signing involves adding secret to id

var token=jwt.sign(data,'123abc'); 
console.log(token);


var decoded=jwt.verify(token,'123abc');
console.log(decoded);











// var message= "I am number three3";
// var hash=SHA256(message).toString();
// console.log(hash); 

// var data = { 
//     id:4
// };

// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// };

// var resultHash= SHA256(JSON.stringify(token.data)+'somesecret').toString();




// console.log(token);