require('dotenv').config();
require('./config/database.cjs');

const Chat = require('../../models/chat')
const Message = require('../../models/message')
const Community = require('../../models/community')
const Post = require('../../models/post')
const Comment = require('../../models/comment')
const User = require("../../models/user");

