import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"

const app = express()
const port = process.env.PORT || 5000;

// CmLZ8cgpjJj8aOYu
//sports-equipment  

// middleware
app.use(cors())
app.use(express.json())



const uri = process.env.URI;

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
        const users = database.collection("users");
        const equipments = database.collection("equipments")
        const usersEquipments = database.collection("usersEquipments")

        // // ✅ Add this line to create a compound unique index
        // await usersEquipments.createIndex(
        //     { email: 1, equipmentId: 1 },
        //     { unique: true }
        // );

        // Users
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await users.insertOne(user)
            res.send(result)
        })

        // Equipments
        app.post('/equipments', async (req, res) => {
            const equipment = req.body;
            const result = await equipments.insertOne(equipment)
            res.send(result)
        })

        app.get('/equipments/limited', async (req, res) => {
            const cursor = equipments.find().limit(6)
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/equipments', async (req, res) => {
            const cursor = equipments.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/equipments/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await equipments.findOne(query)
            res.send(result)
        })

        // Users equipments
        app.post('/usersEquipments', async (req, res) => {
            const userEquipment = req.body;
            const result = await usersEquipments.insertOne(userEquipment)
            res.send(result)
        })
        app.get('/usersEquipments', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email }
            const cursor = usersEquipments.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })


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