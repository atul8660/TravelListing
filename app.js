const express=require("express");
const mongoose = require("mongoose");
const app=express();
const Listing =require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main().then((res)=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("I am root");
})

app.get("/listing",async (req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
})

app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
})

app.get("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

app.post("/listing",async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
})

app.get("/listing/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

app.put("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
})

app.delete("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})


// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// })

app.listen(8080,()=>{
    console.log("Listening on port 8080");
})