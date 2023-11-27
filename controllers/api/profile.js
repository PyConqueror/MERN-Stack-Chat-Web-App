const User = require("../../models/user")

module.exports = {
    updateProfileImage,
    updateBio,
    updateLocation
}

async function updateProfileImage(req, res){
    const user = await User.findById(req.user._id)
    const profileImageURL = req.body.content
    user.avatar = profileImageURL
    user.save()
    res.json(user.avatar)
    console.log("data is: ", req.body.content)
}

async function updateBio(req, res){
    try {
        const user = await User.findById(req.user._id)
        user.biography
    } catch (err) {
        console.log(err)
    }
}

async function updateLocation(req, res){

}

