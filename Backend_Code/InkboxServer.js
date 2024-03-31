const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://daugherty704:8Ac9nAVcO0y0kWo3@inkbase.mc8fboc.mongodb.net/";
const client = new MongoClient(uri);

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

async function fetchDataFromMongoDB(query){
  await client.connect();
  const dbInbase = client.db("InbaseData");
  const InbaseData = dbInbase.collection("Data");
  const cardName = {"NAME": query};
  const result = InbaseData.findOne(cardName);
  return result;
}

// Example of a GET endpoint to fetch data
app.get('/api/data', async (req, res) => {
    //const data = await fetchDataFromMongoDB(req.query.cardName);
    const data = await fetchDataFromMongoDB("Goofy - Musketeer");
    res.json(data);
  });
  
  // Example of a POST endpoint to store data
app.post('/api/users', async (req, res) => {
    const userData = req.body;
    await saveDataToMongoDB(userData);
    res.status(201).send('User data stored');
});
  