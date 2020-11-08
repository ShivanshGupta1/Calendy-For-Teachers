const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))


mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology:true})
    

       
 .then(client=>{
     console.log('Connected to database')
     const db = client.db("Teacher'sZoom")
     const title = db.collection('EventHandler')
     app.set('view engine','ejs')
     app.listen(3000,function(req,res){
        console.log('Your server is on!')
    })
    
    app.get('/', function(req,res){
        res.sendFile(__dirname+'/index.html')
    })
    app.get('/myevents',function(req,res){

      db.collection('EventHandler').find().toArray()
        .then(result=>{
            console.log(result)
            res.render('blogs.ejs', {Event:result})
        })
        .catch(error=>{
            console.error(error)
            
        })
     })
     app.get("/login", function(req,res){
         res.sendFile(__dirname+"/authenticate.html")

     })
     app.post("/auth", function(req,res){
        const firebase = require("firebase")
        var provider = new firebase.auth.GoogleAuthProvider();
        var firebaseConfig = {
            apiKey: "AIzaSyDjpa_5b0Sfa61UW_wLvENvTv7DQpS_PQw",
            authDomain: "calendy-for-teachers.firebaseapp.com",
            databaseURL: "https://calendy-for-teachers.firebaseio.com",
            projectId: "calendy-for-teachers",
            storageBucket: "calendy-for-teachers.appspot.com",
            messagingSenderId: "676299029717",
            appId: "1:676299029717:web:61500d80080b7e2694b65c"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
     })
    
    app.post('/myevents',function(req,res){
        console.log(req.body)
        title.insertOne(req.body)
        .then(result=>{ 
            res.redirect('/myevents')
        })

        .catch(error=>{
            console.error(error)
        })
    })
 })





