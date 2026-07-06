const express = require("express")
const Authmiddleware = require("../middlewares/auth.middleware")
const musicController = require("../controllers/music.controller")

const router = express.Router()


router.post("/createalbum", Authmiddleware.authArtist, musicController.CreateAlbum)
router.get("/albums",Authmiddleware.authUser,musicController.getAllalbums)
router.get("album/:albumId",Authmiddleware.authUser,musicController.getAlbumById)
module.exports = router