//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
//initialise instance of the 'express' server
const app = express();
const PORT = 5000;

//Add middleware to parse incoming requests as Json:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Endpoint to get the cards data
app.get("/api/cards", (req, res) => {
  fs.readFile("./Cards/targetCardsData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving cards data");
    } else {
      const cards = JSON.parse(data);
      res.json(cards);
    }
  });
});

// Endpoint to post new card data
app.post("/api/cards", (req, res) => {
  fs.readFile("./Cards/targetCardsData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating cards data");
    } else {
      const cards = JSON.parse(data);
      const newCard = req.body;
      // newCard.id = Date.now();
      cards["cards"].push(newCard);
      fs.writeFile(
        "./Cards/targetCardsData.json",
        JSON.stringify(newCard),
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating cards data");
          } else {
            res.status(201).json(newCard[0]);
          }
        }
      );
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
