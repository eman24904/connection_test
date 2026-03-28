const express = require('express');
const app = express();

const port = 3000;
app.get('/home', (req, res) => {
  res.send('Home Page Batool 🏠');
}); 

app.post('/created', (req, res) => {
  res.send('Created!');
}); 

app.get('/', (req, res) => {
  res.send('Project🤭🤭');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});