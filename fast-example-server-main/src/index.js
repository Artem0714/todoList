const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { v4: uuid } = require("uuid");
const cors = require("cors");

const state = require("./state");
const fs = require("./fs");

const publicPath = path.resolve(__dirname, "./public");
const todoPath = path.resolve(__dirname, "./todo.json");
const port = 3001;
const server = express();

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use("/", express.static(publicPath));
server.use("/static", express.static(publicPath));

server.use((req, res, next) => {
  state.up();

  if (state.isError()) {
    res.status(503);
    res.end();
    return;
  }

  next();
});

server.get("/api/v1/todo", async (req, res) => {
  const data = await fs.readData(todoPath);
  const list = Object.entries(data).map(([id, item]) => ({ id, ...item }));

  res.end(JSON.stringify(list));
});

server.get("/api/v1/todo/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.end();
    return;
  }

  const data = await fs.readData(todoPath);

  if (!data[id]) {
    res.status(400);
    res.end();
    return;
  }

  res.end(JSON.stringify(data[id]));
});

server.post("/api/v1/todo", async (req, res) => {
  const { title, description, isDone = false } = req.body;

  if (!title || !description) {
    res.status(400);
    res.end();
    return;
  }

  const data = await fs.readData(todoPath);
  const id = uuid();

  data[id] = { title, description, isDone };
  await fs.writeData(todoPath, data);

  res.end();
});

server.put("/api/v1/todo/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id, req.body);

  if (!id) {
    res.status(400);
    res.end();
    return;
  }

  const data = await fs.readData(todoPath);

  if (!data[id]) {
    res.status(400);
    res.end();
    return;
  }

  const {
    title = data[id].title,
    description = data[id].description,
    isDone = data[id].isDone,
  } = req.body;

  data[id] = { title, description, isDone };
  await fs.writeData(todoPath, data);

  res.end();
});

server.delete("/api/v1/todo/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.end();
    return;
  }

  const data = await fs.readData(todoPath);

  if (!data[id]) {
    res.status(400);
    res.end();
    return;
  }

  delete data[id];
  await fs.writeData(todoPath, data);

  res.end();
});

server.listen(port, () => {
  console.log("Listen http://localhost:" + port);
});
