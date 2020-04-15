const express = require('express');
const app = require('./app');

const server = express();

server.use(app);

server.listen(3030, () => {
  console.log('🚀 Server is running...');
});
