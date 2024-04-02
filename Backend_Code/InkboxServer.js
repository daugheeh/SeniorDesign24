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

async function fetchDataFromMongoDB(query) {
  await client.connect();
  const dbInbase = client.db("InbaseData");
  const InbaseData = dbInbase.collection("New Data");
  const cardName = { "NAME": query };
  const cardColor = {"INK": query}
  filters = []

// TODO: Add filters for the other cases.

if (typeof req.query.colors == 'array') {
    filters.push(req.query.colors)
} else if (typeof req.query.colors == 'string') {

    filters.push({'color':req.query.colors})
} else {
    // No color filter
}

// TODO (add more filters for the other form fields)

query = {
    $and: filters
    // + other properties, such as order-by
}

await collection.find(query);
  const result = InbaseData.findOne(cardName);
  return result;
}

// Example of a GET endpoint to fetch data
app.get('/api/data', async (req, res) => {
  res.set('Access-Control-Allow-Origin','*');
  const data = await fetchDataFromMongoDB(req.query);
  console.log(req.query);
  //const data = await fetchDataFromMongoDB("Goofy - Musketeer");
  res.json(data);
});

// Example of a POST endpoint to store data
//app.post('/api/users', async (req, res) => {
 // const userData = req.body;
  //await saveDataToMongoDB(userData);
  //res.status(201).send('User data stored');
//});