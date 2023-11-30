const User = require("../../models/user")
const jwt = require('jsonwebtoken');


module.exports = {
    updateProfileImage,
    updateBio,
    updateLocation,
    getFriend
}

async function getFriend(req, res){
    const friend = await User.findById(req.body.content)
    res.json(friend) //return friend list belong to the user
}

async function updateProfileImage(req, res){
    try{ //update user profile picture
        const user = await User.findById(req.user._id)
        const profileImageURL = req.body.content
        user.avatar = profileImageURL
        await user.save()
        const token = createJWT(user);
        res.json(token);
    } catch (err){
        console.log(err)
    }
}

async function updateBio(req, res){
    try { //update user bio
        const user = await User.findById(req.user._id)
        const updateBioText = req.body.content
        user.biography = updateBioText
        await user.save()
        const token = createJWT(user)
        res.json(token);
    } catch (err) {
        console.log(err)
    }
}

async function updateLocation(req, res){
    try { //update user location
        const user = await User.findById(req.user._id)
        const updateLocationText = req.body.content
        user.location = updateLocationText
        await user.save()
        const token = createJWT(user)
        res.json(token);
    } catch (err) {
        console.log(err)
    }
}

function createJWT(user) {
    return jwt.sign(
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
}
