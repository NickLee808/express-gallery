const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {User} = db;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  
});

app.get('/gallery/:id', (req, res) => {
  
});

app.get('/gallery/:new', (req, res) => {
  
});

app.post('/gallery', (req, res) => {

});

app.get('/gallery/:id/edit', (req, res) => {

});

app.put('/gallery/:id', (req, res) => {

});

app.delete('/gallery/:id', (req, res) => {

});

app.listen(3000, () => {

});