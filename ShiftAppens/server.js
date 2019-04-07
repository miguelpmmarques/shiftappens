//  Modules imports
const http = require('http');
const mongo =require('mongodb');
const express=require('express');
const fs = require('fs');
const css =require('css');
const jsdom = require("jsdom");
const path=require("path");
const mongoose=require('mongoose');
const mocha = require('mocha');
const assert=require('assert');
//  class User
const User=require('./models/users');
const net = require('net');
const bodyParser = require('body-parser');

//  clients count
var count=0;

//  api for connection and client handling
const app = express();

//  ES6 Promises
mongoose.Promise = global.Promise;
console.log("BATEU");

//  MongoClient instance import
const MongoClient = require('mongodb').MongoClient;

mongoose.connect('mongodb://localhost/shift',{useNewUrlParser:true});
  /*'mongodb://paulo:lozalbwbmp14@db-klxwm.mongodb.net/test?retryWrites=true',{useNewUrlParser:true});*/
mongoose.connection.once('open',function(){
  console.log("successfully connected to database");
}).on('error',function(error){
  console.log('Connection error:',error);
});

/*var pess=new User({name:'Pessoa'});
console.log(pess);
pess.save((err)=>{
  if(err) {
    console.log(err);
    return hadleError(err);
  }
  console.log("BATEU");
});*/

//  create user
function create_user(u_name){
  User.create({name:u_name},(err,pess)=>{
    //  error handling function
    console.log(pess);
    if(err){
      console.log(err);
      return handleError(err);
    }
  });
}

//  redirect to Public folder
app.use('/static',express.static('public'));
//  inside Public folder get index.html
//  after this line he is connected to the site
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'index.html'));
});

//  Parse and interpret Client Post Message
app.use(bodyParser.urlencoded({extended:true}));
//  Create json file from Post Received
app.use(bodyParser.json());
//  Response to Client
app.post('/', function(req, res){
  //  req is the request sent from Client
  //  contains info from data struct in client
  //   req.body ==> name parameter
  console.log(count); //debug
  count++;
  create_user(String(count));   //add to Array list
  //  response to client
  res.send(String(count));
});

//  max clients to connect
app.listen(80);