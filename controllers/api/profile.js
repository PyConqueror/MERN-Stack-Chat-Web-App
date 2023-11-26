const User = require("../../models/user")

module.exports = {
    updateBio
}

async function updateBio(req, res){
    try {
        const user = await User.findById(req.user._id)
        user.biography
    } catch (err) {
        console.log(err)
    }
}