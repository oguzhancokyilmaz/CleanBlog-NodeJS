const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort([['dateCreated', -1]]); // son girilen post ilk sergilenir.
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.editPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  console.log('Post Name: ', post.name);
  console.log('Post Context : ', post.context);
  console.log(req.body.context);
  post.name = req.body.name;
  post.context = req.body.context;
  post.save();
  res.redirect(`/listPosts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect(`/`);
};
