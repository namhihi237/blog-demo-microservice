const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    let { id, title } = data;
    posts[id] = { id, title, comments: [] };

  } else if (type === 'CommentCreated') {
    let { id, content, status, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === 'CommentUpdated') {
    let { id, content, status, postId } = data;
    const post = posts[postId];
    let comment = post.comments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content;
  }

  res.send({ status: 'success' });
});

app.listen(4002, () => console.log("Listening on http://localhost:4002"));