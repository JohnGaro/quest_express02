require("dotenv").config();

const express = require("express");

const app = express();

const { hashPassword } = require("./auth");

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my users list");
};

app.get("/", welcome);

const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.put("/api/users/:id", userHandlers.updateUserById);
app.delete("/api/users/:id", userHandlers.deleteUserById);
app.post("/api/users", hashPassword, userHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
