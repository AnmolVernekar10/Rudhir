const bodyparser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const { MongoClient } = require('mongodb'); // Import mongodb module
const app = express();
const port = 3000; // Change this to your desired port number

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyparser.urlencoded({ extended: true }));

const uri = "mongodb+srv://comderboi:eFLLmT9ApNBzyF1l@project.pfdefey.mongodb.net/Rudhir";

const dbName = 'Rudhir';
const collectionName = 'bloodbanks';

async function myFunction(adminbbid,updateqty,Bloodgrp) 
{
    try 
    {
        const client = new MongoClient(uri);
                
        await client.connect();
                
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
                
        const filter = { BloodBank_ID: adminbbid };
                
        const update = 
        {
            $inc: 
            {
                    [`BloodType.${Bloodgrp}`]: -updateqty,
                    Quantity: -updateqty
            },
        };
                        
        const result = await collection.updateOne(filter, update);
                        
        if (result.modifiedCount === 1) 
        {
            console.log('1 updated');
        } 
        else 
        {
            console.log('not updated');
        }
    } catch (err) 
    {
        console.log('error:', err);
    }
}
                        
                        // Start your server
            app.listen(5986, function () {
                console.log('Server is running on port 5996');
            });
                        
            module.exports = myFunction;
