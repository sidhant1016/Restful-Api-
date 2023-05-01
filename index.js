const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://sidhant:9cu0pFHpz56dD9OI@cluster0.cvzhshl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,  });
mongoose.set('strictQuery', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected database');
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});

const student = mongoose.model('Student', studentSchema);

app.get("/",function(req,res){
  res.send("hello world!")
});

app.get("/student",function(req,res){
  res.send("I am student!")
});

app.get('/students', (req, res) => {
  student.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/students', (req, res) => {
  const newStudent = new student(req.body);
  newStudent.save((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/students/:id', (req, res) => {
  student.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.delete('/students/:id', (req, res) => {
  student.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(5000,function(){
  console.log("server is running on port 5000");
});
