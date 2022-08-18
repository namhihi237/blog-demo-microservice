const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  if (!req.body.title) {
    return res.send("error: missing title");
  }
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title: req.body.title,
  }

  res.send(posts[id]);
});

app.listen(4000, () => console.log('listening on http://localhost:4000'));