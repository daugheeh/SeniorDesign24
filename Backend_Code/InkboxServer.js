const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Example of a GET endpoint to fetch data
app.get('/api/data', async (req, res) => {
    const data = await fetchDataFromMongoDB();
    res.json(data);
  });
  
  // Example of a POST endpoint to store data
  app.post('/api/users', async (req, res) => {
    const userData = req.body;
    await saveDataToMongoDB(userData);
    res.status(201).send('User data stored');
  });
  