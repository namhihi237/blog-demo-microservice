// @ts-nocheck
const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', async (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body
  if (!content) {
    return res.send("error: no content specified")
  }

  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  try {
    await axios.post(`http://localhost:4005/events`, {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId,
      }
    })
  } catch (error) {
    console.log(error);
  }

  res.status(200).send(comments)
});

app.post('/events', (req, res) => {
  console.log('Received events', req.body.type);
  res.send("ok")
});

app.listen(4001, () => console.log('listening on http://localhost:4001'));