const express =require("express");
const path = require("path");
const Chat = require("./models/chat");
const connectDB=require("./init.js");
const methodoverride=require("method-override");
    
const app=express();


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));


app.get("/",(req,res)=>{
  res.redirect("/chats");

});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find({});
  res.render("index.ejs", { chats });
});



app.get("/chats/new",(req,res)=>{
  
res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
let {from,to,msg}=req.body;
let newChat=new Chat({
  from: from,
  to: to,
  msg: msg,
  created_at : new Date()
})
newChat.save().then(() => {
  console.log("chat was saved");
  res.redirect("/chats");
}).catch(err => {
  console.log("Error saving chat:", err);
  res.status(500).send("Failed to save chat");
});

});


//Edit Route
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
res.render("edit.ejs",{chat});
});


//UPDATE ROUTE
app.put("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let{msg:newMsg}=req.body;
  let updateChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
  console.log(updateChat);
res.redirect("/chats");
});


//DELETE ROUTE
app.delete("/chats/:id",async(req,res)=>{
let {id}=req.params;
let DeletedChat=await Chat.findByIdAndDelete(id);
console.log(DeletedChat);
res.redirect("/chats");
});

connectDB().then(() => {
 console.log("Database connected successfully");
});
 app.listen(8080, () => {
    console.log("server is running on localhost:8080");
  });