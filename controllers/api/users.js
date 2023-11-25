const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Chat = require("../../models/chat")

module.exports = {
    create,
    login,
    checkToken,
    searchUsers,
    getFriends,
    getChatList
  };

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req,res){
  try {
    const email = req.body.email
    const user = await User.findOne({email: email})
    if (!user) throw new Error(); 
    const match = await bcrypt.compare(req.body.password, user.password); 
    if (!match) throw new Error(); 
    const token = createJWT(user)
    res.json(token);
  } catch (err) {
    res.status(400).json(err)
  }
}

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

async function searchUsers(req, res){
  const query = req.query.query;
  let regex = new RegExp(query, 'i')
  try {
    const user = await User.find({name: regex})
    res.json(user)
  } catch (err){
    console.log(err)
  }
}

async function getFriends(req,res){
  const UserID = req.user._id
  const UserFriends = await User.findById(UserID).populate('friends', 'name avatar')
  if(!UserFriends){
    res.json([]) //if no friends, return with empty array
  }
  res.json(UserFriends.friends) //respond only with the friends array
}


async function getChatList(req, res) {
  const currentUserId = req.user._id;
  const chats = await Chat.find({ participants: currentUserId })
    .populate({ 
      path: 'participants', 
      match: { '_id': { $ne: currentUserId } },
      select: 'name avatar' 
    });
  const transformedChats = chats.map(chat => { // transform the chats to include either the group name or the other participant's details
    if (chat.isGroup) {
      return {         // For group chats, return the group name
        _id: chat._id,
        name: chat.GroupName,
        avatar: null, // Add a group avatar if available
        isGroup: true
      };
    } else {
      const chatPartner = chat.participants.find(participant => participant._id.toString() !== currentUserId);
      return {
        _id: chat._id,
        name:chatPartner.name,
        avatar:chatPartner.avatar,
        isGroup: false
      };
    }
  });
  res.json(transformedChats);
}