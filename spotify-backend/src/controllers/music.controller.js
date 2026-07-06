const MusicModel = require("../model/music.model")
const AlbumModel = require("../model/album.model")
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../services/storage.service")



async function CreateMusic(req, res) {


    const { title } = req.body
    const file = req.file


    const result = await uploadFile(file.buffer.toString("base64"))

    const music = await MusicModel.create({
        uri: result.url,
        title,
        artist: req.user.id

    })

    res.status(201).json({
        message: "Music Created Sucessfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })



}


async function CreateAlbum(req, res) {


    const { title, musics } = req.body

    const album = await AlbumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })

    res.status(201).json({
        message: "Album Created Sucessfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })

}


async function getallmusics(req, res) {


    const musics = await MusicModel.find().limit(3).populate("artist", "username email")


    res.status(200).json({
        message: "Musics Fetched Sucessfully",
        musics: musics
    })
}

async function getAllalbums(req, res) {

    const Albums = await AlbumModel.find().select("title artist ").populate("artist", "username email")


    res.status(200).json({
        message: "Albums Fetched Sucessfully",
        Albums: Albums
    })
}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId

    const Albums = await AlbumModel.findById(albumId).populate("artist", "username email")


    res.status(200).json({
        message: "Albums Fetched Sucessfully",
        Albums: Albums
    })

}




module.exports = { CreateMusic, CreateAlbum, getallmusics, getAllalbums, getAlbumById }