const jwt = require("jsonwebtoken")

async function authArtist(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_TOKEN)


        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You Dont have access"
            })

            req.user = decoded;

            next()
        }

    } catch (err) {

        console.log(err)

        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}


async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_TOKEN)

        if (decoded.role !== "user" || decoded.role !== "artist") {

            return res.status(403).json({
                message: "Unauthorized"
            })

        }
        req.user = decoded

        next()

    }
    catch (err) {
        console.log(err)

        return res.status(401).json({
            message: "You Don't have Access"
        })
    }

}

module.exports = { authArtist,authUser }