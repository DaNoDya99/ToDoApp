const express = require("express");
const bodyParser = require("body-parser");
const opencage = require('opencage-api-client');
const { json } = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const tasks = [];
const workList = [];
const day = date.getDate();
let locationAddress;
let location;


app.get("/", function (req, res) {
  res.render("index", { dayTitle: day, tasks: tasks });
});

app.get("/work",function(req,res){
  res.render("index",{dayTitle: "Work List", tasks: workList})
});

app.post("/", function (req, res) {
  const task = req.body.msg;
  
  if (req.body.list === "Work"){
    workList.push(task);
    res.redirect("/work");
  }else{
    tasks.push(task);
    res.redirect("/");
  }
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/weather",function(req,res){
  res.render("weather");
});

app.post("/weather",function(req,res){
  const longi = req.body.longitude;
  const lati = req.body.latitude;

  opencage.geocode({q: lati+','+longi, key:'46659b54d9f944a5a7f35b490671677b'}).then((data)=> {
    locationAddress = data.results[0].formatted;
    location = data.results[0].components.city;

    console.log(locationAddress+" "+location);
  });
});


app.listen(3000, function () {
  console.log("Server started on port 3000.");
});




// Api Key
// AIzaSyDyjhb8ZhlY7ZXGSKfzg6vbDF9hUxX3GzA