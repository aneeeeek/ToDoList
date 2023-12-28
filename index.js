const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const dbURL = "mongodb://localhost:27017/tododb"
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
const Todo = require('./models/todo');


const port = 3000

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Получение всех данных
app.get("/", (request, response) => {
    Todo.find().then(result => {
        response.render("index.ejs", {data: result});
    })
})

// Создание новой таски
app.post("/", (request, response) => {
    const todo = new Todo({
        todo: request.body.todoValue,
        datetime: new Date(),
        check: false
    })
    todo.save()
    .then(result => {
        response.redirect("/")
    })
})

// Завершить таску по id
app.post("/complete/:id", (request, response) => {
    Todo.findByIdAndUpdate( {_id: request.params.id}, {check: request.body.isCheck})
    .then(result => {
        response.sendStatus(200)
    })
})

// Вернуть сначала новые
app.get("/filterByDate_new", (request, response) => {
    Todo.find({})
    .sort({ datetime: -1 })
    .then(result => {
        response.render("index.ejs", {data: result});
        response.render("index.ejs", {data: result});
    })
})

// Вернуть сначала старые
app.get("/filterByDate_old", (request, response) => {
    Todo.find({})
    .sort({ datetime: 1 })
    .then(result => {
        console.log(result);
        response.render("index.ejs", {data: result});
    })
})

// Вернуть только активные
app.get("/filter_active", (request, response) => {
    Todo.find({check: false})
    .then(result => {
        console.log(result);
        response.render("index.ejs", {data: result});
        
    })
})

// Вернуть только завершенные
app.get("/filter_completed", (request, response) => {
    Todo.find({check: true})
    .then(result => {
        console.log(result);
        response.render("index.ejs", {data: result});
    })
})

// Удалить таску
app.delete("/:id", (request, response) => {
    Todo.findByIdAndDelete(request.params.id)
    .then(result => {
        //console.log(result)
    })
})

app.listen(port, ()=> {
    console.log('server is running on port ' + port)
})