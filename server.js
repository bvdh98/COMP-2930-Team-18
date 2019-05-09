//Reference to fake database
//const recipes = require('./core/data')

var cors = require('cors');

// Require Firebase admin for server commands
var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("C:/Users/spenc/Desktop/Firebase key/comp2930-3639b-6bb1ffc05441.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://comp2930-3639b.firebaseio.com/"
});



//Require express
const express = require('express');

//Body parser
const bodyParser = require('body-parser');

//Reference to express
const app = express();
app.options('*', cors()) // include before other routes 
app.use(cors())

//Require file server
const fs = require("fs");

//Listen to browser request
app.listen(8000, function(){
    console.log('listening to port 8000');
});

//Send html document to server
//Browser sends http://localhost:3000/
//Last '/' is the domain
app.get('/', function(req, res){
    let doc = fs.readFileSync('landingpage.html', "utf8");
    res.send(doc);
});

app.get('/searchPage.html', function(req, res){
    let doc = fs.readFileSync("searchPage.html", "utf-8");
    res.send(doc);
});

app.get('/profile.html', function(req, res){
    let doc = fs.readFileSync("profile.html", "utf-8");
    res.send(doc);
});

app.get("/helppage.html", function(req, res) {
    let doc = fs.readFileSync("helppage.html", "utf-8");
    res.send(doc);
});

let rowInfo = {row1: "", row2: "", row3: "", row4: "", score: ""}

app.get("/cornflakes", function(req, res){
    admin.database().ref("Products/Cornflakes/1").on('value', function(snapshot){
        rowInfo.row1 = snapshot.val();
    });
    admin.database().ref("Products/Cornflakes/2").on('value', function(snapshot){
        rowInfo.row2 = snapshot.val();
    });
    admin.database().ref("Products/Cornflakes/3").on('value', function(snapshot){
        rowInfo.row3 = snapshot.val();
    });
    admin.database().ref("Products/Cornflakes/4").on('value', function(snapshot){
        rowInfo.row4 = snapshot.val();
    });
    admin.database().ref("Products/Cornflakes/score").on('value', function(snapshot){
        rowInfo.score = snapshot.val();
    });
    res.send(rowInfo);
});

app.get("/crispyrice", function(req, res){
    admin.database().ref("Products/Crispy Rice/1").on('value', function(snapshot){
        rowInfo.row1 = snapshot.val();
    });
    admin.database().ref("Products/Crispy Rice/2").on('value', function(snapshot){
        rowInfo.row2 = snapshot.val();
    });
    admin.database().ref("Products/Crispy Rice/3").on('value', function(snapshot){
        rowInfo.row3 = snapshot.val();
    });
    admin.database().ref("Products/Crispy Rice/4").on('value', function(snapshot){
        rowInfo.row4 = snapshot.val();
    });
    admin.database().ref("Products/Crispy Rice/score").on('value', function(snapshot){
        rowInfo.score = snapshot.val();
    });
    res.send(rowInfo);
});

//Handle all recipes in list form
app.get('/recipe-list', function(req, res){
    let formatOfResponse = req.query['format'];
    let dataList = null;
    
    if(formatOfResponse == 'html-list'){
        res.setHeader('Content-Type', 'text/html');
        dataList = recipes.getHTML();
        res.send(dataList);
    }else if(formatOfResponse == 'json-list'){
        res.setHeader('Content-Type', 'application/json');
        dataList = recipes.getJSON();
        res.send(dataList);
    }
})

//Handle recipe step objects in JSON/HTML
app.get('/recipe-steps', function(req, res){
    let formatOfResponse = req.query['format'];
    let dataList = null;
    
    if(formatOfResponse == 'html-list'){
        res.setHeader('Content-Type', 'text/html');
        dataList = recipes.getHTML();
        res.send(dataList);
    }else if(formatOfResponse == 'json-list'){
        res.setHeader('Content-Type', 'application/json');
        dataList = recipes.getJSON2();
        const allRecipes = Object.keys(dataList);
        console.log(allRecipes);
        res.send(allRecipes);
    }
})

//Handle steps for specific recipe
app.get('/recipe-steps/:recipeid', function(req, res){
    const recipeToFind = req.params.recipeid;
    let dataList = recipes.getJSON2();
    const val = dataList[recipeToFind];
    console.log(recipeToFind, '->', val);
    if(val){
        res.send(val);
    }else{
        //Empty obj
        res.send({});
    }
})

//Static files (images, css, js);
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/Pictures', express.static('Pictures'));

//Tracks data from form element and adds to body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/post-form', function(req, res){
    res.setHeader('Content-Type', 'application/json')
    console.log(req.body);
    res.send(["You sent me:", req.body]);
});