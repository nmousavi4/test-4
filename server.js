/*************************************************************************
* BTI325– Test 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source.
* (including 3rd party web sites) or distributed to other students.
*
* Name: Nahal Mousavi Student ID: 133828178 Date: 09/12/2022
*
* Your app’s URL: https://alive-button-yak.cyclic.app/
*
*************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();
app.use(express.static("public"));
var f = require('./final.js');
const port = process.env.PORT || 8080;
function onHttpStart(){
  console.log("Express http server listening on port",+ HTTP_PORT);
}

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, '/finalViews/home.html'));
});
app.get("/register", function(req,res){
  res.sendFile(path.join(__dirname, '/finalViews/register.html'));
});


app.get("/signIn", function(req,res){
  res.sendFile(path.join(__dirname, '/finalViews/signIn.html'));
});

app.post("/register",(req, res) => {
  f.registerUser(req.body).then(() =>{
   res.send(data.email + 'registered successfully. <br> <a href ="/home">Go home</a>');
  }).catch((err) => {

    res.send("Error: email or password cannot be empty.")
   });

});

app.post("/signIn",(req, res) => {
  f.signIn().then(() =>{
    res.send(data.email + 'signed in successfully. <br> <a href ="/home">Go home</a>');

  }).catch((err) => {

   res.send("Cannot find the user:" + data.email)
  });

})
  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });

  f.startDB()
  .then(f.startDB)
  .then(function () {
    app.listen(HTTP_PORT, onHttpStart);
   })
   .catch(function (err) {
     console.log('Failed to start!' + err);
   });

   