require('dotenv').config();
require('./config/database');

const Chat = require('../../models/chat')
const Message = require('../../models/message')
const Group = require('../../models/group')
const Post = require('../../models/post')
const Comment = require('../../models/comment')
const User = require("../../models/user");

