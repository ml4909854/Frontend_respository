const express = require("express");
const connectDB = require("./config/database.js");
const userRouter = require("./controller/userRouter.js");
const profileRouter = require("./controller/profileRouter.js");
const app = express();
app.use(express.json());


app.use("/user", userRouter);
app.use("/profile" , profileRouter)

app.get("/health" , (req,res)=>{
    res.status(200).json({message:"connected!"})
})

app.listen(3000, async () => {
  await connectDB();
  console.log("server database is running");
});
