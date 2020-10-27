const express = require('express');
const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use(postsRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>New Server Working</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });

  module.exports = server;