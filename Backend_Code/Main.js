import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://daugherty704:8Ac9nAVcO0y0kWo3@inkbase.mc8fboc.mongodb.net/";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // You can now interact with your MongoDB database here
  } catch (e) {
    console.error(e);
  }
}

main();

