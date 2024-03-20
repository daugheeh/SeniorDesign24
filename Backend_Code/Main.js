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

function generateRandomNumbers(min, max, count) {
  let randomNumbers = [];

  for (let i = 0; i < count; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

main()
{
  const min = 1;
  const max = 612;
  const count = 9;

  const randomNumbers = generateRandomNumbers(min, max, count);
  do{
    
  }while(randomNumbers != null)

};

