// @ts-nocheck
const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  if (!req.body.title) {
    return res.send("error: missing title");
  }
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title: req.body.title,
  }

  try {
    axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: posts[id],
    });

  } catch (error) {
    console.log("err===", error);
  }
  res.send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received events', req.body.type);
  res.send("ok")
});

app.listen(4000, () => console.log('listening on http://localhost:4000'));