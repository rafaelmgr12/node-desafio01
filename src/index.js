const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    response.status(404).send("User not found");
  }

  request.user = user;

  return next();
}

app.post("/users", (request, response) => {
  // Complete aqui
  const { name, username } = request.body;

  const userCheck = users.some((user) => user.name === username);
  if (userCheck) {
    response.status(400).send("User already exists");
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);
  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {user} = request;

  return response.json(user.todos);

});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {user} = request;
  const {title,deadline} = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at : new Date()
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {id} = request.params;
  const {user} = request;
  const {title,deadline} = request.body;

  const todo = user.todos.find(todo => todo.id == id);
   
  if (!todo) {
    return response.status(404).send("Todo not found");
  }
  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).json(todo);

});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {id} = request.params;
  const {user} = request;

  const todo = user.todos.find(todo => todo.id == id);

  if (!todo) { 
    return response.status(404).send("Todo not found");
  }
  todo.done = true;

  return response.status(200).json(todo);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const {id} = request.params;
  const {user} = request;

  const todo = user.todos.find(todo => todo.id == id);

  if (!todo) {
    return response.status(404).send("Todo not found");
  }
  user.todo.splice(todo, 1);

  return response.status(200).json(todo);
});

module.exports = app;
