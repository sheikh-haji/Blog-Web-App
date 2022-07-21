//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sheikhhaji18:18shakila@cluster0.2akiep0.mongodb.net/blog",{useNewUrlParser:true});
const list={title:String,content:String};
const collection=new mongoose.model("content",list);
const homeStartingContent = "This blog website for technical content and for budding coder and for writing my personal experiences with coding";
const aboutContent = "Hi i am Sheikh Haji,currently studying IT and interested in web development";
const contactContent = "contact at sheikhhaji18@gmail.com";

const app = express();
// let posts=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
     collection.find({},function(err,foundlist){
        if(err){
          console.log(err);
        }else{
           res.render("home",{content:homeStartingContent,array1:foundlist,var2:""});
        }
     });

});

app.get("/about",function(req,res){
  res.render("about",{temp1:aboutContent});
})
app.get("/contact",function(req,res){
  res.render("contact",{temp2:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
   const post={title:_.lowerCase(req.body.haji1),content:req.body.haji2};
   collection.create(post,function(err){
     if(err){
       console.log(err);
     }else{
       console.log("inserted successfully");
       res.redirect("/");
     }
   });
   // posts.push(post);

});

app.get("/post/:hi",function(req,res){
     // console.log(req.params.hi);
     var temp=_.lowerCase(req.params.hi);
     // posts.forEach(function(item){
     //   if(item.title===temp){
     //     res.render("temp",{item:item,var2:""});
     //   }
     //   else{
     //     console.log("no");
     //   }
     // });
     collection.findOne({title:temp},function(err,foundlist){
          if(err){
            console.log(err);
          }
          else{
             res.render("temp",{item:foundlist,var2:""});
          }
     });

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
