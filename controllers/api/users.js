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
    getChatList,
    addFriend,
  };

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    user.avatar = createUserIcon();
    await user.save()
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

function createUserIcon(){
  function generateHSLNumber(min, max){
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference)
    rand = rand + min
    return rand
  }

  let hValue = generateHSLNumber(0, 360)
  let sValue = generateHSLNumber(50, 75)
  let lValue = generateHSLNumber(25, 60)

  function HSLtoString(h, s, l){
      return `hsl(${h}, ${s}%, ${l}%)`
  }

  return HSLtoString(hValue, sValue, lValue)

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
        avatar: createUserIcon(), // Add a group avatar if available
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

async function addFriend(req, res) {
  const userID = req.user._id;
  const friendID = req.params.id;
  const user = await User.findById(userID); //if friend id already in the user list
  const friend = await User.findById(friendID)
  if (user.friends.includes(friendID)) { // do nothing
    return res.status(400)
  } else { //if friend id not in the array, add the friend id in the friends array
    user.friends.push(friendID)
    await user.save()
    return res.status(200)
  }
}
