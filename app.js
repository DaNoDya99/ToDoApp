const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const tasks = [];
const workList = [];
const day = date.getDate();

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


app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
