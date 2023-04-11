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
      console.log(`current cards in cards.json`);
      console.log(cards);
      const newCard = req.body;
      console.log(`new cards added is`);
      console.log(newCard);
      cards["cards"].push(newCard);
      console.log(`updated card list now`);
      console.log(cards);
      fs.writeFile(
        "./Cards/targetCardsData.json",
        JSON.stringify(cards),
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating cards data");
          } else {
            res.status(201).json(cards);
          }
        }
      );
    }
  });
});

app.delete("/api/cards/:id", (req, res) => {
  fs.readFile("./Cards/targetCardsData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating cards data");
    } else {
      const cards = JSON.parse(data);
      console.log(`current cards in cards.json`);
      console.log(cards);
      const cardIndexSelected = parseInt(req.params.id);
      console.log(`in delete server.js function, this is index:`);
      console.log(cardIndexSelected);
      console.log(cards["cards"][cardIndexSelected]);
      cards["cards"].splice(cardIndexSelected, 1);
      // res.status(200).send("Card deleted successfully");
      console.log(cards);
      // const newCard = req.body;
      // console.log(`new cards added is`);
      // console.log(newCard);
      // cards["cards"].push(newCard);
      // console.log(`updated card list now`);
      // console.log(cards);
      fs.writeFile(
        "./Cards/targetCardsData.json",
        JSON.stringify(cards),
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating cards data");
          } else {
            res.status(201).json(cards);
          }
        }
      );
    }
  });
});

// Define a route to handle put requests for updating a specific card
app.put("/api/cards/:id", (req, res) => {
  fs.readFile("./Cards/targetCardsData.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating cards data");
    } else {
      const cards = JSON.parse(data);
      console.log(`current cards in cards.json`);
      console.log(cards);
      const cardIndexSelected = parseInt(req.params.id);
      console.log(`in PUT server.js function, this is index:`);
      console.log(cardIndexSelected);
      console.log(cards["cards"][cardIndexSelected]);
      cards["cards"][cardIndexSelected]["value"] = req.body.value;
      console.log(cards);

      fs.writeFile(
        "./Cards/targetCardsData.json",
        JSON.stringify(cards),
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error updating cards data");
          } else {
            res.status(201).json(cards);
          }
        }
      );
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
