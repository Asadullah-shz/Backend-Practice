const spotifyModel = require("../model/spotify.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function register(req, res) {

    const { username, email, password, role = "user" } = req.body;

    const isalreadyexist = await spotifyModel.findOne({

        $or: [

            { username },
            { email }

        ]
    })

    if (isalreadyexist) {

        return res.status(409).json({
            message: "User Already Exist"

        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await spotifyModel.create({

        username,
        email,
        password: hash,
        role

    })

    const token = jwt.sign({

        id: user._id,
        role: user.role,

    }, process.env.JWT_TOKEN)



    res.cookie("token", token)



    res.status(201).json({

        message: "User is Sucessfully Created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role

        }
    })

}

async function loginUser(req, res) {

    const { username, email, password } = req.body

    const user = await spotifyModel.findOne({

        $or: [
            { username },
            { email }
        ]
    })

    if (!user || !password) {
        return res.status(401).json({
            message: "Invalid Credientals"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invaild Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role,

    }, process.env.JWT_TOKEN)


    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in Sucessfully",
        user: {

            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}


async function logout(req, res) {

    res.clearCookie("token")
    res.status(200).json({
        message: "User Sucessfully Logged Out"
    })
}

module.exports = { register, loginUser, logout }