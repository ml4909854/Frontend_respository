const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const userRouter = require("./controller/userRouter.js");
const isAuthenticated = require("./middleware/auth.js");
const checkAcess = require("./middleware/checkAcess.js");
const blackList = require("./blackList.js");
const jwt = require("jsonwebtoken")
app.use(express.json());

app.use("/user", userRouter);

// private route

app.get("/privateData", isAuthenticated, (req, res) => {
  res.send("private data");
});

app.get("/logout", (rea, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    blackList.add(token);
  }
  res.send("logout successfully!");
});

app.post("/genrateNewToken", (req, res) => {
  const refreshToken = req.body.token
  if(refreshToken){
        jwt.verify(refreshToken , "masaiRefresh" , (err , decode)=>{
           if(err){
            res.send(err)
           }
         const acessToken =    jwt.sign({name:decode.name , email:decode.email , role:decode.role} , "masai" ,{expiresIn:"15s"})
         res.status(200).json({acesstoken:acessToken})
        })
  }
});

app.get("/admin/data", isAuthenticated, checkAcess("admin"), (req, res) => {
  res.send("Hey admin!");
});

app.get("/health", (req, res) => {
  res.status(200).send("connected!");
});

app.listen(3000, async () => {
  await connectDB();
  console.log("server is running");
});
