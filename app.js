const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Post');
const Post = require('./models/Post');
var moment = require('moment');

const app = express();

//connect db
mongoose.connect('mongodb://localhost/cleanBlog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //urldeki datayı okumamızı sağlar
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({}).sort([['dateCreated', -1]]) // son girilen post ilk sergilenir.
  res.render('index',{
    posts
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/listPosts/:id',async (req, res) => {
  const post = await Post.findById(req.params.id)
  
  res.render('post',{
    post
  });
});
app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
