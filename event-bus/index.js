// @ts-nocheck
const express = require('express');

const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/events', async (req, res) => {
  const event = req.body;

  try {
    axios.post('http://localhost:4000/events', event).catch(err => {
      console.log(err);
    });
    axios.post('http://localhost:4001/events', event).catch(err => {
      console.log(err);
    });
    axios.post('http://localhost:4002/events', event).catch(err => {
      console.log(err);
    });
    axios.post('http://localhost:4003/events', event).catch(err => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  res.send({ status: 'OK' })
});


app.listen(4005, () => console.log("localhost listening on http://localhost:4005"));