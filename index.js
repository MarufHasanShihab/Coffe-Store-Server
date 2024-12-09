const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.2iri9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeCollections = client.db("coffeDB").collection("coffeCollection");

    app.get("/coffes",async (req,res)=>{
        const cursor = coffeCollections.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get("/coffes/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await coffeCollections.findOne(query);
      res.send(result);
    })

    app.post("/coffes", async(req,res)=>{
        const newCoffe = req.body;
        const result = await coffeCollections.insertOne(newCoffe);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("Our Coffe Server Is Running")
})

app.listen(port,()=>{
    console.log(`Our Coffe Server Is Running On ${port}`)
})