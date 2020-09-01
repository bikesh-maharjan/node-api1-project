const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());

let users = [
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Data Science", // String, required
  },
  {
    id: shortid.generate(),
    name: "Biku Ma", // String, required
    bio: "Web Developer", // String, required
  },
  {
    id: shortid.generate(),
    name: "Jane Good", // String, required
    bio: "Backend Developer", // String, required
  },
];

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Node 33 Project" });
});

// GET REQUESTS//
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json({ data: users });
  } else {
    res
      .status(500)
      .json({ message: "the users information could not be retrieved" });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  if (users.find((user) => user.id === id)) {
    const newUser = users.filter((user) => user.id === id);

    res.status(200).json(newUser);
  } else if (!users.find((user) => user.id === id)) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "the user information could not be retreived" });
  }
});

//POST REQUEST//

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.bio && user.name) {
    users.push({ id: shortid.generate(), ...user });
    res.status(201).json({ data: users });
  } else {
    res
      .status(400)
      .json({ errorMessage: "please provide name and bior for the user" });
  }
});

// PUT REQUEST//

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const editUser = req.body;
  let user = users.find((userToEdit) => userToEdit.id === id);
  if (!editUser.bio || !editUser.name) {
    res
      .status(400)
      .json({ errorMessage: "please provde name and bio for the user" });
  } else if (user.id === id) {
    Object.assign(user, userEdit);
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: "the user with the specidfed Id does not exist" });
  }
});

//DELTE REQUEST//

server.delete("api/user/:id", (req, res) => {
  const id = req.params.id;
  if (users.find((user) => user.id === id)) {
    const newUsers = users.filter((user) => user.id !== id);
    res.status(200).json(newUsers);
  } else if (!users.find((user) => user.id === id)) {
    res
      .status(404)
      .json({ message: "the user with the specified ID does not exist" });
  } else {
    res.status(500).json({ errorMessage: "thes user could not be removed" });
  }
});

const port = 3001;
server.listen(port, () => console.log("server is up...."));
