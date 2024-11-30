import express from 'express'
import axios from 'axios'
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import { PropertyRegistration } from './models/FlatRegistrationModel.js';


const app = express()
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true                
  }));

app.use(express.json());

// connecting mongoDB to the App

const mongoDbUrl = 'mongodb+srv://aadi678a:K4YtqMTuaBUsEevt@searchengine.7p1op.mongodb.net/?retryWrites=true&w=majority&appName=SearchEngine'
mongoose
.connect(mongoDbUrl)
.then(() => {
    console.log("database is connected to the App")
    app.listen(port, () =>{
        console.log(`server is up and listen on port ${port}`)
    })
})
.catch((error) => console.log(error));

app.post("/flatregistration", async (req, res) => {
    try {
      const { flatType, rent, location, parking, utilities, houseName, deposit, carpetArea } = req.body;
      const newProperty = new PropertyRegistration({
        flatType,
        rent,
        location,
        parking,
        utilities,
        houseName,
        deposit,
        carpetArea,
      });
      await newProperty.save();
      res.status(200).send("Property information saved successfully");
    } catch (error) {
      console.error(error);
      res.status(400).send("Error saving property information");
    }
  });

  app.post("/search", async (req, res) => {
    try {
      const { location, flatType, rent } = req.body;
  
      const query = {};
      if (location) query.location = location; 
      if (flatType) query.flatType = flatType; 
     
      if (rent) {
        if (rent === '10k-20k') {
          query.rent = { $gte: 10000, $lte: 20000 }; 
        } else if (rent === '20k-30k') {
          query.rent = { $gte: 20000, $lte: 30000 }; 
        } else if (rent === 'Above 30k') {
          query.rent = { $gte: 30000 }; 
        }
      }
  
     
      const properties = await PropertyRegistration.find(query);
  
   
      if (properties.length === 0) {
        return res.status(404).json({ message: "No properties found matching the criteria." });
      }
  
      
      res.status(200).json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).send("Error fetching properties data");
    }
  });
  