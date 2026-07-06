const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRoutes=require("./routes/auth.routes")
const MusicRoutes=require("./routes/music.routes")
const AlbumRoutes=require("./routes/album.routes")

const app = express();
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth",AuthRoutes)
app.use("/api/music",MusicRoutes)
app.use("/api/album",AlbumRoutes)


module.exports = app;