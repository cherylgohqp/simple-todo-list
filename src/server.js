//SERVER SIDE CODE
//Note that the actual server is on another repo.
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "../server/db/conn.js";

//initialise instance of the 'express' server
const app = express();
const PORT = 5000;

//Add middleware to parse incoming requests as Json:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

// Endpoint to get the cards data
app.get("/api/cards", async (req, res) => {
  let collection = await db.collection("cards-data");
  let results = await collection.find({}).limit(50).toArray();

  // results[0] gives {
  //   _id: new ObjectId('66cade194bdc9953cdd3c60f'),
  //   cards: [
  //     { header: 'Construction Time', value: '145200 hours' },
  //     { header: 'Apartment Type Distribution', value: '123454353' }
  //   ]
  // }
  //results[0]['cards'] gives [
  //   { header: 'Construction Time', value: '145200 hours' },
  //   { header: 'Apartment Type Distribution', value: '123454353' }
  // ]
  res.send(results).status(200);
});

// Endpoint to post new card data
app.post("/api/cards", async (req, res) => {
  try {
    let collection = await db.collection("cards-data");
    let newDocument = req.body;
    // Update the document by pushing the new card to the "cards" array
    let result = await collection.updateOne(
      {}, // Filter to match the document. You may want to specify a filter if there are multiple documents.
      { $push: { cards: newDocument } } // Push the new card into the "cards" array
    );
    // Send the result back to the client
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating cards data");
  }
});

//yet to fix delete
app.delete("/api/cards/:id", async (req, res) => {
  try {
    const collection = await db.collection("cards-data");
    const cardIndex = parseInt(req.params.id);

    // First, unset the card at the specified index
    const unsetResult = await collection.updateOne(
      {}, // Match the document
      { $unset: { [`cards.${cardIndex}`]: 1 } } // Unset the specific index in the cards array
    );

    if (unsetResult.modifiedCount === 0) {
      return res.status(404).send("Card not found");
    }

    // Then, remove the null value created by the unset operation
    await collection.updateOne(
      {},
      { $pull: { cards: null } } // Pull out any null values from the array
    );

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting card");
  }
});

// Define a route to handle put requests for updating a specific card
app.put("/api/cards/:id", async (req, res) => {
  try {
    const collection = await db.collection("cards-data");
    const cardIndex = parseInt(req.params.id);
    const { header, value } = req.body; // Extracting both header and value from request body
    // Update the card's value at the specified index
    const result = await collection.updateOne(
      {}, // Match the document
      {
        // Set the new value at the specified index
        $set: {
          [`cards.${cardIndex}.header`]: header, // Set the new header
          [`cards.${cardIndex}.value`]: value, // Set the new value
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Card not found or value unchanged");
    }

    res.status(200).json({ message: "Card updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating card");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports = app;
export default app;
