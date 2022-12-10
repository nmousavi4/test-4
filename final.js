var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
var uri = "mongodb+srv://nmousavi4:Violinlove19!@senecaweb.qbtc5ui.mongodb.net/?retryWrites=true&w=majority";
var finalUserSchema = new Schema({
    "email":  {
      type: String,
      unique: true
    },
    "password": String
  });
  
  let finalUser;
  
  exports.startDB = function(){
      return new Promise(function(resolve, reject){
          let db = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
              if(error) {
                  console.log("Cannot connect to DB.");
                  reject(error)
              }else{
                  finalUser = db.model("finalUser", finalUserSchema)
                  console.log("DB connection successfully");
                  resolve()
              }
          }); 
  
          db.on('error', (err)=>{
              console.log("db error!");
          });
            
          db.once('open', ()=>{
              console.log("db success!");
          });
      })
  }
  
  exports.register = function(Data){
      return new Promise(function(resolve, reject){
          if(!Data.email || Data.email == " " || Data.password === 0 || Data.password == " "){
              reject("Error: email or password cannot be empty or only white spaces!")
          }
          let newFinalUser = new finalUser({
              email: Data.email,
              password: Data.password
          })
  
    
          bcrypt.hash(newFinalUser.password, 10, function(err, hash) {
              if(err){
                  reject(err)
              }else{
                  newFinalUser.password = hash
  
                  newFinalUser.save().then(function(){
                      resolve(newFinalUser)
                  }).catch(function(err){
                      if(err){
                          console.log(err.code)
                          if(err.code == 11000){
                              reject(newFinalUser.email + " already exists")
                          }else{
                              reject("Error: cannot create the user: " + err)
                          }
                      }
                  })
              }
          })
      })
  }
  
  exports.signIn = function(Data){
      return new Promise(function(resolve, reject){
          finalUser.findOne({email: Data.email}).exec().then(function(foundUser){
              if(foundUser){
  
                  // Compare userdata.password with hasded foundUser.password
                  bcrypt.compare(Data.password, foundUser.password).then((res) => {
  
                      // res === true if it matches and res === false if it does not match
                      if(res === true){
                          resolve(foundUser)
                      }else{
                          reject("Incorrect password for user: " + Data.email)
                      }
                  });
              }else{
                  reject("Cannot find the user: " + Data.email)
              }
          }).catch(function(err){
              reject("Cannot find the user: " + Data.email)
          })
      })
  }