const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname,{
}))

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

