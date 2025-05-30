const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author:{type:mongoose.Schema.Types.ObjectId , ref:"user"}
},{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model("blog", blogSchema);
