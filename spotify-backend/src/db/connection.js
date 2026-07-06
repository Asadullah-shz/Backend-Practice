require("dotenv").config();
const mongoose = require("mongoose");

async function connectSpotifyDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to Spotify DB");
    return connect;
    
  } catch (error) {

    console.error("Error in connecting to Spotify DB", error);

    throw error;
  }
}

module.exports = connectSpotifyDB;