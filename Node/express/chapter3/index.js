// Now create a crud operation of these code

const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).josn({ Error: "Error to read a file" });
    }
    const users = JSON.parse(data).users;
    res.status(200).json({ message: "Get all users", users: users });
  });
});

// Post the user

app.post("/users", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "failed to read file!" });
    }

    const users = JSON.parse(data).users;
    const newusers = { id: Date.now(), ...req.body };
    users.push(newusers);
    fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
      if (err) {
        res.status(500).json({ error: "error to write a file" });
      }
      res.status(200).json({
        message: "Post the user sucessfull!",
        users: users,
        Newuser: newusers,
      });
    });
  });
});

//  Now edit the data

app.put("/users/:id", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ Error: "Error to read a file" });
    }
    const users = JSON.parse(data).users;
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).json({ message: "user not found" });
    }

    users[userIndex] = { ...users[userIndex], ...req.body };

    fs.writeFile("db.json", JSON.stringify({ users }), (err) => {
      if (err) {
        res.status(500).json({ Error: "Error to write a file" });
      }
      res.status(200).json({
        messsage: "User updated succesffuly",
        updatedUsers: users[userIndex],
      });
    });
  });
});


// Code for delete a user 

app.delete("/users/:id" , (req , res)=>{
  fs.readFile("db.json" , "utf-8" , (err , data)=>{
     if(err){
    res.status(500).json({error:"error to readfile!"})
   }

   const userId = parseInt(req.params.id)
   const users = JSON.parse(data).users

   const deleteUser = users.filter((user)=>user.id!==userId)

   fs.writeFile("db.json" , JSON.stringify({users:deleteUser}) , (err)=>{
    if(err){
      res.status(500).json({message:"Error to write a file"})
    }
    res.status(200).json({message:"User delelted succesffully!" , users:users , remaniningUser :deleteUser})
   })
  })

})










app.get("/", (req, res) => {
  res.status(200).json({ message: "Health is good" });
});

app.use((req, res) => {
  res.status(404).send("page not found!");
});

app.listen(3000, () => {
  console.log("server si running on port 300");
});
