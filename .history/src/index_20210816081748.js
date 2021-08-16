const express = require('express');
const cors = require('cors');

 const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

 const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const {username} = request.headers;

  const user = users.find(user => user.username === username);

  if(!user){
    response.status(404).send('User not found');
  }

  request.user = user;

  return next();

}

app.post('/users', (request, response) => {
  // Complete aqui
  const {name, username} = request.body;
  
  const userCheck = users.some((user) => user.name===username);
  if(userCheck){
    response.status(400).send('User already exists');}

  const user = { 
    id: uuidv4(),
    name,
    username,
    todos: []}

    users.push(user);
    return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui

});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;