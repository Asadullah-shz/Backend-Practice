const express = require("express")
const musicController = require("../controllers/music.controller")
const Authmiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/upload", upload.single("music"), Authmiddleware.authArtist, musicController.CreateMusic)


router.get("/",Authmiddleware.authUser,musicController.getallmusics)

module.exports = router