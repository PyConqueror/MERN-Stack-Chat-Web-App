const User = require("../../models/user")
const jwt = require('jsonwebtoken');


module.exports = {
    index,
    updateProfileImage,
    updateBio,
    updateLocation
}

async function index(req, res){
    const user = await User.findById(req.user._id)
    console.log(user)
    res.json(user)
}

async function updateProfileImage(req, res){
    const user = await User.findById(req.user._id)
    const profileImageURL = req.body.content
    user.avatar = profileImageURL
    await user.save()
    const token = createJWT(user);
    res.json(token);
    // res.json(user)
    console.log("user data is: ", user)
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

function createJWT(user) {
    return jwt.sign(
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
}
