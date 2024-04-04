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
  let dbInbase = client.db("InbaseData");
  let InbaseData = dbInbase.collection("New Data");
  filters = [];
  let Query = "";
  let sort = ""
  if (false) {

  }
  else {
    if (query.rarity != "None") {
      filters.push(`{"RARITY": "${query.rarity}"}`);
    }
    if (query.set != "None") {
      filters.push(`{"SET": "${query.set}"}`);
    }
    if (query.inkCost != "") {
      filters.push(`{"COST": ${query.inkCost}}`);
    }
    if (query.cardText != "") {
      filters.push(`{"ABILITY": "/${query.cardText}/"}`);
    }

    if (Array.isArray(query.colors)) {
      let multiColor = '{"$or": [';
      query.colors.forEach((element, index) => {
        multiColor += `{"INK": "${element}"}`;
        if (index != query.colors.length - 1) {
          multiColor += ", ";
        }
      })
      multiColor += "]}"
      filters.push(multiColor);
    }
    else if (typeof query.colors == 'string') {

      if (query.colors != "") {
        filters.push(`{"INK": "${query.colors}"}`);
      }
    }
  }

  Query += '{"$and": [';
  filters.forEach((element, index) => {
    Query += element;
    if (index != filters.length - 1) {
      Query += ", "
    }
  });
  Query += "]}";
  console.log(Query);
  sort += `{ "${query.sortBY}": 1 }`;
  let result = InbaseData.find(JSON.parse(Query)).sort(JSON.parse(sort)).toArray();
  return result;
}

app.get('/api/data', async (req, res) => {
  //console.log(req.query);
  res.set('Access-Control-Allow-Origin', '*');
  console.log(await fetchDataFromMongoDB(req.query));
  //const data = await fetchDataFromMongoDB(req.query);
  //const data = await fetchDataFromMongoDB("Goofy - Musketeer");
  // res.json(data);
});

// Example of a POST endpoint to store data
//app.post('/api/users', async (req, res) => {
// const userData = req.body;
//await saveDataToMongoDB(userData);
//res.status(201).send('User data stored');
//});