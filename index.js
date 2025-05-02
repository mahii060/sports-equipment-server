import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb"

const app = express()
const port = process.env.PORT || 5000;

// CmLZ8cgpjJj8aOYu
//sports-equipment  

// middleware
app.use(cors())
app.use(express.json())



const uri = process.env.URI;
console.log(uri);

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
        const database = client.db("sportsEquipmentDB");
        const users = database.collection("users")

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await users.insertOne(user)
            res.send(result)
        })

        // app.get('/users/:email', async (req, res) => {
        //     const email = req.params.email;
        //     console.log(email);
        //     const query = { email: email }
        //     const result = await users.findOne(query);
        //     res.send(result)
        // })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Sports equipment server is running')
})

app.listen(port, () => {
    console.log(`Sports equipment server is running on port: ${port}`);
})