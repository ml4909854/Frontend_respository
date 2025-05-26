const express = require("express");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("health is good!");
});

app.get("/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ Error: "Error to reading a file" });
    }
    const users = JSON.parse(data).users;
    res.status(200).json({ users });
  });
});

app.post("/users", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      res.status(500).json({ Error: "Error to reading a file" });
    }
    const users = JSON.parse(data).users;
    // now here we want to add a some new data we have to create a new data now
    const newuser = { id: Date.now(), ...req.body };
    users.push(newuser);

    fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
      if (err) {
        res.status(500).json({ Error: "error to writting a file" });
      }
      res.json({ message: "Users added successfully", Users: users });
    });
  });
});

//  now here i want to update my code

app.put("/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ Error: "error to read file" });
    }
    const userId = parseInt(req.params.id);
    console.log(userId);
    const users = JSON.parse(data).users;
    const userIndex = users.findIndex((user) => user.id === userId);
    console.log(userIndex);

    if (userIndex === -1) {
      res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = {...users[userIndex] , ...req.body}

    fs.writeFile("db.json"  , JSON.stringify({users}) , (err)=>{
        if(err){
            res.status.json({Error:"error to writing code"})
        }
        res.status(200).json({message:"user updated successfully!" , users:users})
    })
  });
});

app.delete("/users/:id" , (req ,res)=>{
    fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading file" });
      return;
    }
    const users = JSON.parse(data).users;
    const filteredUsers = users.filter((user) => user.id != req.params.id);

    fs.writeFile(
      "db.json",
      JSON.stringify({ users: filteredUsers }),
      (err) => {
        if (err) {
          res.status(500).json({ message: "Error writing file" });
          return;
        }
        res.status(204).send();
      }
    );
  });
})


app.use((req, res) => {
  res.status(404).json({ message: `This page is not found ${req.url}` });
});
app.listen(3000, () => {
  console.log("server is running 3000");
});
