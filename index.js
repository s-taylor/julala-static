//modules

var express = require('express');
var mongoose = require('mongoose');

//establish database connection

var db = mongoose.connection;

db.on('error', console.error);

mongoose.connect('mongodb://localhost/test');

//define schema and model

var postSchema = new mongoose.Schema({
  title: { type: String }, 
  content: String
});

var Post = mongoose.model('Post', postSchema);

// var test = new Post({title: 'Bavarian', content: 'Today I will be going to the Bavarian'});

// test.save(function(err, test) {
//   if (err) return console.error(err);
//   console.dir(test);
// });

//start web server

var app = express();

//HOME PAGE
app.get('/', function(request,response){
  response.sendfile('src/index.html');
});

//SERVE .css AND .js files
app.use('/static', express.static(__dirname + '/public'));


app.get('/posts', function(request,response) {

  //find all posts and send them back as the response
  Post.find(function(err, posts){
    if (err) {
      return console.error(err);
    } else {
      return response.send(posts);
    }
  });

});

app.post('/posts', function(request,response) {

  var newPost = new Post({
    title: request.headers.title,
    content: request.headers.content
  })

  newPost.save(function(err){
    if (!err) {
      return console.log('Saved: ', newPost);
    } else {
      return console.log('Error: ', err);
    }
  });

  return response.send(newPost);

});

//start server on port 3000
app.listen(process.env.PORT || 3000);
console.log("listening on port 3000");

// };