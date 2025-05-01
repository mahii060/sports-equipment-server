import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();


const app = express()
const port = 5000;


// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Sports equipment server is running')
})

app.listen(port, () => {
    console.log(`Sports equipment server is running on port: ${port}`);
})