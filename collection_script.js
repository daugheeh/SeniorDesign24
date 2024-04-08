document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.dynamic-img');

    images.forEach(function(img) {
        var baseSrc = img.getAttribute('data-src');
        // You can replace 'mobile-card-id' and 'desktop-card-id' with actual logic to determine the correct image ID
        if (window.innerWidth <= 480) { // For mobile devices
            img.src = baseSrc.replace('{id}', 'mobile-card-id');
        } else {
            img.src = baseSrc.replace('{id}', 'desktop-card-id');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var img = entry.target;
                var baseSrc = img.getAttribute('data-src');
                img.src = baseSrc.replace('{id}', 'appropriate-card-id');
                observer.unobserve(img);
            }
        });
    });

    var images = document.querySelectorAll('.dynamic-img');
    images.forEach(img => observer.observe(img));
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filterButton').addEventListener('click', function() {
        window.location.href = 'filter.html';
    });
});

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
  console.log("get has started")
  await client.connect();
  let dbInbase = client.db("InbaseData");
  let InbaseData = dbInbase.collection("NewData2");
  filters = [];
  let baseQuery = "";
  //console.log(query.cardName);
  if (false) {
    let queryNameObject = [];
    if (!queryNameObject["$and"]) {
      queryNameObject["$and"] = [];
    }
    queryNameObject["$and"].push({ "NAME": new RegExp(query.cardText) });

    const sortSearch = query.name;
    const sortSearchCriteria = { [sortSearch]: 1 };
    let searchResult = await InbaseData.find(queryNameObject).sort(sortSearchCriteria).toArray();
    return searchResult;
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

  baseQuery += '{"$and": [';
  filters.forEach((element, index) => {
    baseQuery += element;
    if (index != filters.length - 1) {
      baseQuery += ", "
    }
  });
  baseQuery += "]}";
  let queryObject = JSON.parse(baseQuery);
  if (query.cardText !== "") {
    if (!queryObject["$and"]) {
      queryObject["$and"] = [];
    }
    queryObject["$and"].push({ "ABILITY": new RegExp(query.cardText) });
  }
  console.log("query has been parsed");
  //console.log(queryObject);
  const sortField = query.sortBy;
  const sort = { [sortField]: 1 };
  let result = InbaseData.find(queryObject);
  result = await result.sort(sort).toArray();
  console.log("result formmated")
  return result;
}

app.get('/api/data', async (req, res) => {
  console.log("inside the get")
  res.set('Access-Control-Allow-Origin', '*');
  answer = await fetchDataFromMongoDB(req.query);
  console.log("get has been got")
  console.log(answer);
  res.json(answer);
  return res;
});