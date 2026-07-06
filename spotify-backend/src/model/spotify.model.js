const mongoose=require("mongoose")

const spotifySchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
       
    },
    role:{
        type:String,
        enum: ["user", "artist"],
        default: "user",
    },
    
})


const spotifyModel=mongoose.model("User",spotifySchema)

module.exports=spotifyModel