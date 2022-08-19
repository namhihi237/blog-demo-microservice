// @ts-nocheck
const express = require('express');
const cors = require('cors');
const axios = require('axios');
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

  handleEvents(type, data);

  res.send({ status: 'success' });
});

const handleEvents = (type, data) => {
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
}

app.listen(4002, async () => {
  console.log("Listening on http://localhost:4002");
  try {
    const res = await axios.get('http://localhost:4005/events');
    for (let event of res.data) {
      console.log("Processing event: " + event.type);
      handleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});