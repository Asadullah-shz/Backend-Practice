require("dotenv").config();
const app = require("./src/app");
const SpotifyDB=require("./src/db/connection")
const dns = require(`dns`)
dns.setServers(["1.1.1.1", "8.8.8.8"])

SpotifyDB()

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});