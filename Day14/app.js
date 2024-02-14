const express = require('express');
const { cachingMiddleware, cacheResponse } = require('./cachingMiddleware.js'); 

const app = express();

app.use(cachingMiddleware);

app.get('/example', (req, res) => {
  const responseData = { message: 'Hello Node.Js, This is a response from the server!'};
  cacheResponse(req.originalUrl, responseData, 60000);
  res.json(responseData);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
