const mongoose = require("mongoose");

const Chat=require("./models/chat.js");
async function connectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
 console.log("connection successful");
}

// let chats=[
//     {
// from: "Pranav",
// to : "mohit",
// msg:"Hi bro",
// date: new Date(),
//     },
//         {
// from: "Pranav",
// to : "mohit",
// msg:"Hi bro",
// date: new Date(),
//     },

//         {
// from: "rana",
// to : "Wasim",
// msg:"KAAA",
// date: new Date(),
//     },
//         {
// from: "anav",
// to : "rohit",
// msg:"S M D",
// date: new Date(),
//     },

// ];

// Chat.insertMany(chats);



connectDB();

module.exports = connectDB;