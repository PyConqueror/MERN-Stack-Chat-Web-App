const Group = require('../../models/community')
const Post = require('../../models/post')
const Comment = require('../../models/comment')
const User = require('../../models/user')

module.exports = {
    showOneGroup,
    showAllGroups,
    showPosts,
    showComments,
    createPost,
    createComment,
    createGroup
};

async function showOneGroup(req, res) {
  const group = await Group.findById(req.body.content)
  res.json(group)
}

async function showAllGroups(req,res) {
    const groups = await Group.find()
    res.json(groups)
}

async function showPosts(req, res) {
    const groupID = req.params.id
    const posts = await Post.find({ group:groupID }).populate("comments")
    res.json(posts)
}

async function showComments(req, res) {
    const postID = req.params.id;
    const comments = await Comment.find({ post: postID }).populate('author', 'name avatar');
    res.json(comments);
}

async function createPost(req, res) {
    const newPost = new Post(req.body)
    await newPost.save()
    const groupID = req.body.group
    await Group.findByIdAndUpdate(groupID, { $push: { posts: newPost._id } });
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, {$push: { posts: newPost._id }})
    res.json(newPost);
}

async function createComment(req, res) {
    const newComment = new Comment(req.body)
    await newComment.save()
    const postID = req.body.post
    await Post.findByIdAndUpdate(postID, { $push: { comments: newComment._id } });
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, {$push: { comments: newComment._id }})
    res.json(newComment);
}

  async function createGroup(req, res) {
    const newGroup = new Group(req.body)
    await newGroup.save()
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, {$push: { communitiesCreated: newGroup._id }})
    res.json(newGroup)
}