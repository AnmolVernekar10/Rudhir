const bodyparser=require("body-parser");
const express=require("express");
const ejs = require('ejs');
const path = require('path');
const app=express();
const port = 3000; // Change this to your desired port number
const { MongoClient } = require('mongodb'); // Import mongodb module

app.set('view engine','ejs')

// const http=require('http').Server(app);
app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended:true}));    

const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://comderboi:eFLLmT9ApNBzyF1l@project.pfdefey.mongodb.net/Rudhir',{useNewUrlParser:true},{useUnifiedTopology:true});
const uri = "mongodb+srv://comderboi:eFLLmT9ApNBzyF1l@project.pfdefey.mongodb.net/Rudhir";


// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// For insertion of data for admin registration and user registration


// For Admin registration information
const AdminSchema=new mongoose.Schema({
    Name:String,
    BB_id:Number,
    Contact:Number,
    emailid:String,
    password:String,
    cpassword:String
})

// For User registration information
const UserSchema=new mongoose.Schema({
    Name:String,
    DOB:String,
    Contact:Number,
    emailid:String,
    password:String,
    cpassword:String,
    gender:String
})

// For Storing Blood banks info
const BloodbnkSchema=new mongoose.Schema({
    BloodBankName:String,
    BloodBank_ID:Number,
    Quantity:Number,
    BloodType:Object,
    Location:String
})

// For Storing
const BlooddonationSchema=new mongoose.Schema({
    BBName:String,
    BBID:Number,
    Name:String,
    DOB:String,
    Bloodgrp:String,
    Disease:String,
    Location:String,
})
const BloodrequestSchema=new mongoose.Schema({
    BBName:String,
    BBID:Number,
    Name:String,
    DOB:String,
    Bloodgrp:String,
    Quantity:Number,
    Requestdate:String
})

const User=mongoose.model("User",UserSchema); //required to create collection
const Admin=mongoose.model("Admin",AdminSchema); //required to create collection
const BloodBank=mongoose.model("BloodBank",BloodbnkSchema); //required to create collection

const Blooddonation=mongoose.model("BloodDonations",BlooddonationSchema); //required to create collection
const Bloodrequest=mongoose.model("BloodRequests",BloodrequestSchema); //required to create collection


// -----------------------------------------------------------------------------------------------------
            // Savin Admin registration info
app.post("/saveadmin",function(req,res){
    let newAdmin=new Admin({
        Name:req.body.fullname,
        BB_id:req.body.bbid,
        Contact:req.body.phoneno,
        emailid:req.body.emailid,
        password:req.body.password,
        cpassword:req.body.cpassword
    });
    newAdmin.save();
    res.redirect('Admin/admin-login.html');
})
            
app.get("/saveadmin",function(req,res){
    res.sendFile(__dirname+"/public/Admin-reg.html")
})
            // Savin User registration info
app.post("/saveuser",function(req,res){
    let newUser=new User({
        Name:req.body.fullname,
        DOB:req.body.dob,
        Contact:req.body.phoneno,
        emailid:req.body.emailid,
        password:req.body.password,
        cpassword:req.body.cpassword,
        gender:req.body.gender
    });
    newUser.save();
    res.redirect('User/patient-login.html');
})
app.get("/saveuser",function(req,res){
    res.sendFile(__dirname+"/public/pat-reg.html")
})

// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
                        // For user Blood Donation rendering list of Blood banks
app.get('/user_donate_blood.ejs', async (req, res) => {
    try {
      const bloodbanks = await BloodBank.find({}); // Fetch data from the "bloodbanks" collection
      res.render('user_donate_blood', { bloodbanks }); // Render to "user_donate_blood.ejs" view and pass the data
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });   

                        //  For user Blood Request rendering list of Blood Banks
app.get('/user_request_blood.ejs', async (req, res) => {
    try {
      const bloodbanks = await BloodBank.find({}); // Fetch data from the "bloodbanks" collection
      res.render('user_request_blood', { bloodbanks }); // Render to "user_request_blood.ejs" view and pass the data
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });  
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
//                             // For Finding Admin login entry in db

let bloodbankvar;
let adminbbid;

app.post("/adminlogin", async function(req,res){
    const emailid=req.body.emailid;
    const password=req.body.password;

    try{
        const admin=await Admin.findOne({emailid,password});
        if(admin)
        {
            adminbbid=admin.BB_id
            const BloodBank_ID=admin.BB_id

            bloodbankvar = await BloodBank.findOne({BloodBank_ID}); // Fetch data from the "bloodbanks" collectionbb
 
            res.redirect('/Admin/admin-home.html'); 
        }
        else{
            res.redirect('/Admin/admin-login.html?error=  Invalid email or password. Please try again.');
        }
    }catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
    }
});


// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
                    // For Finding User login entry in db

app.post("/userlogin", async function(req,res){
    const emailid=req.body.emailid;
    const password=req.body.password;

    try{
        const user=await User.findOne({emailid,password});
        if(user)
        {
            res.redirect('/User/user-home.html');
        }
        else{
            res.redirect('/User/patient-login.html?error=  Invalid email or password. Please try again.');
        }
    }catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request.");
      }
});

// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
                            // User Blood Donation Data
app.use(express.static("./"));
app.get('/user_donate_form.ejs', async (req, res) => {
    try {
      const bloodbankslist = await BloodBank.find({}); // Fetch data from the "bloodbanks" collection
      res.render('user_donate_form', { bloodbankslist }); // Render to "user_donate_blood.ejs" view and pass the data
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });  

// Info of User blood donation registration
const UserDonation=new mongoose.Schema({
    BBName:String,
    BBID:Number,
    Name:String,
    Age:Number,
    Bloodgrp:String,
    Quantity:Number,
    Disease:String,
    Donationdate:String,
    Status:String
})
const userdonation=mongoose.model("BloodDonation",UserDonation); //required to create collection

app.post("/saveuserdonation",function(req,res){
    const selectedOption = req.body.BBData;
  // Split the selected value into an array using the delimiter
    const [BloodBank_ID, BloodBankName] = selectedOption.split('|');
    let newuserdonatn=new userdonation({
        BBName:BloodBankName,
        BBID:BloodBank_ID,
        Name:req.body.Name,
        Age:req.body.Age,
        Bloodgrp:req.body.Bloodgrp,
        Quantity:req.body.Quantity,
        Disease:req.body.Disease,
        Donationdate:req.body.Donationdate,
        Status:"Pending"
    });
    newuserdonatn.save();
    res.redirect('User/user-home.html');
})
app.get("/saveuserdonation",function(req,res){
    res.sendFile(__dirname+"/public/User/user-home.html")
})
                            // User Blood Request Data

app.use(express.static("./"));
app.get('/user_request_form.ejs', async (req, res) => {
    try {
      const bloodbankslist = await BloodBank.find({}); // Fetch data from the "bloodbanks" collection
      res.render('user_request_form', { bloodbankslist }); // Render to "user_request_blood.ejs" view and pass the data
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Info of User blood request registration
const UserRequest=new mongoose.Schema({
    BBName:String,
    BBID:Number,
    Name:String,
    Age:Number,
    Bloodgrp:String,
    Quantity:Number,
    Requestdate:String,
    Status:String
})
const userrequest=mongoose.model("BloodRequest",UserRequest); //required to create collection

app.post("/saveuserrequest",function(req,res){
    const selectedOption = req.body.BBData;
  // Split the selected value into an array using the delimiter
    const [BloodBank_ID, BloodBankName] = selectedOption.split('|');
    let newuserrequest=new userrequest({
        BBName:BloodBankName,
        BBID:BloodBank_ID,
        Name:req.body.Name,
        Age:req.body.Age,
        Bloodgrp:req.body.Bloodgrp,
        Quantity:req.body.Quantity,
        Requestdate:req.body.Requestdate,
        Status:"Pending"
    });
    newuserrequest.save();
    res.redirect('User/user-home.html');
})
app.get("/saveuserrequest",function(req,res){
    res.sendFile(__dirname+"/public/User/user-home.html")
})
   

// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
//                                 Admin Donations Data

app.get('/Admin_donations.ejs', async (req, res) => {
    try 
    {
        let BBID=bloodbankvar.BloodBank_ID; 
        const blooddtn=await userdonation.find({BBID})

        res.render('Admin_donations', { blooddtn }); 
    } catch (error) 
    {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });   

// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// //                                 Admin Request Data

app.get('/Admin_requests.ejs', async (req, res) => {
    try 
    {
        let BBID=bloodbankvar.BloodBank_ID; 
        const bloodreqq=await userrequest.find({BBID})
        console.log(bloodreqq)
        res.render('Admin_requests', { bloodreqq }); 
    } catch (error) 
    {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });   

// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
                            // Updation to bloodbank with donation qty

app.use(bodyparser.json()); // Parse JSON request bodies

app.post('/accept',async  (req, res) => 
{
    const i = req.body.i;

    const donationentry= await userdonation.find({}).skip(i).limit(1);

    const BBName=donationentry[0].BBName
    const BBID=adminbbid
    const Name=donationentry[0].Name
    const Age=donationentry[0].Age
    const Bloodgrp=donationentry[0].Bloodgrp
    const Quantity=donationentry[0].Quantity
    const Disease=donationentry[0].Disease

    const myFunction = require('./UpdateAdminentry.js');
    myFunction(adminbbid,Quantity,Bloodgrp);  

    const deleteResult = await userdonation.deleteOne({BBName,BBID,Name,Age,Bloodgrp,Quantity,Disease});

        if (deleteResult.deletedCount === 1) {
            console.log('User donation entry deleted successfully');
        } else {
            console.log('User donation entry not found or not deleted');
        }

    res.status(200).json({ message: 'Data received successfully' });
});

app.post('/reject',async  (req, res) => 
{
    const i = req.body.i;

    const donationentry= await userdonation.find({}).skip(i).limit(1);

    const BBName=donationentry[0].BBName
    const BBID=adminbbid
    const Name=donationentry[0].Name
    const Age=donationentry[0].Age
    const Bloodgrp=donationentry[0].Bloodgrp
    const Quantity=donationentry[0].Quantity
    const Disease=donationentry[0].Disease

    const deleteResult = await userdonation.deleteOne({BBName,BBID,Name,Age,Bloodgrp,Quantity,Disease});

        if (deleteResult.deletedCount === 1) {
            console.log('User donation entry deleted successfully');
        } else {
            console.log('User donation entry not found or not deleted');
        }
                      
    res.status(200).json({ message: 'Data received successfully' });
});
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
                            // Updation to bloodbank with Request qty

app.use(bodyparser.json()); // Parse JSON request bodies

app.post('/requestaccept',async  (req, res) => 
{
    const i = req.body.i;

    const requestentry= await userrequest.find({}).skip(i).limit(1);
    const BBName=requestentry[0].BBName
    const BBID=adminbbid
    const Name=requestentry[0].Name
    const Age=requestentry[0].Age
    const Bloodgrp=requestentry[0].Bloodgrp
    const Quantity=requestentry[0].Quantity

    const myFunction = require('./UpdateAdminrequest.js');
    myFunction(adminbbid,Quantity,Bloodgrp);  

    const deleteResult = await userrequest.deleteOne({BBName,BBID,Name,Age,Bloodgrp,Quantity});

        if (deleteResult.deletedCount === 1) {
            console.log('User donation entry deleted successfully');
        } else {
            console.log('User donation entry not found or not deleted');
        }
                      
    res.status(200).json({ message: 'Data received successfully' });
});

app.post('/requestreject',async  (req, res) => 
{
    const i = req.body.i;

    const requestentry= await userrequest.find({}).skip(i).limit(1);
    const BBName=requestentry[0].BBName
    const BBID=adminbbid
    const Name=requestentry[0].Name
    const Age=requestentry[0].Age
    const Bloodgrp=requestentry[0].Bloodgrp
    const Quantity=requestentry[0].Quantity

    const deleteResult = await userrequest.deleteOne({BBName,BBID,Name,Age,Bloodgrp,Quantity});

        if (deleteResult.deletedCount === 1) {
            console.log('User donation entry deleted successfully');
        } else {
            console.log('User donation entry not found or not deleted');
        }
                      
    res.status(200).json({ message: 'Data received successfully' });
});
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
//                                 Admin Blood Stock Data

app.get('/Admin_homepage.ejs', async (req, res) => {
    try { 
    //   let BBID=bloodbankvar.BloodBank_ID;                       // Getting BB_ID for the Blood Bank from bloodbankvar, which has admin login info 
      let BBID=adminbbid                    // Getting BB_ID for the Blood Bank from bloodbankvar, which has admin login info 
      const blooddtn=await Blooddonation.find({BBID})             // Getting total donations for Blood Bank from blooddonation using BBID 
      const bloodreq=await Bloodrequest.find({BBID})              // Getting total requests for Blood Bank from bloodrequest using BBID
      
      const totalEntriesDonors = blooddtn.length;                 // Finding total donors
      const totalEntriesRequests = bloodreq.length;               // Finding total requests  
      
      const x=await BloodBank.findOne({BloodBank_ID:adminbbid});

      let sumAplus=x.BloodType["A+"];
      let sumAminus=x.BloodType["A-"];
      let sumBplus=x.BloodType["B+"];
      let sumBminus=x.BloodType["B-"];
      let sumOplus=x.BloodType["O+"];
      let sumOminus=x.BloodType["O-"];
      let sumABplus=x.BloodType["AB+"];
      let sumABminus=x.BloodType["AB-"];

      let total_units=sumAplus+sumBplus+sumOplus+sumABplus+sumAminus+sumBminus+sumABminus+sumOminus;
      res.render('Admin_homepage', { x, totalEntriesDonors, totalEntriesRequests, total_units }); // Render the "Admin_homepage.ejs" view and pass the data
    } catch (error) {
      console.error(error);e
      res.status(500).send('Internal Server Error');
    }
  });       




app.listen(3000, function()
{
    console.log("Hello")
})