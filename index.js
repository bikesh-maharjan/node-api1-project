const express = require("express");
const server = express();

server.use(express.json());

let users = [
  {
    id: "1", // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Data Science", // String, required
  },
  {
    id: "2",
    name: "Biku Ma", // String, required
    bio: "Web Developer", // String, required
  },
  {
    id: "2",
    name: "Jane Good", // String, required
    bio: "Backend Developer", // String, required
  },
];

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Node 33 Project" });
});

server.get("/api/");

server.post("/api/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(400).json({ data: users });
});

const port = 3001;
server.listen(port, () => console.log("server is up...."));
