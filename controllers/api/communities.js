const Group = require('../../models/community')
const Post = require('../../models/post')
const Comment = require('../../models/comment')

module.exports = {
    showGroups,
    showPosts,
    showComments,
    createGroup,
    createPost,
    addComments
};

async function showGroups(req,res) {
    const groups = await Group.find({})
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
      const { content, images } = req.body;
      const groupID = req.params.id;
      const newPost = new Post({
        author: req.user._id,
        group: groupID,
        content,
        images,
        comments:[]
      });
      await newPost.save();
      await Group.findByIdAndUpdate(groupID, { $push: { posts: newPost._id } });
      res.json(newPost);
}

async function addComments(req, res) {
      const postID = req.params.id;
      const { content } = req.body;
      const newComment = new Comment({
        author: req.user._id,
        post: postID,
        content
      });
      await newComment.save();
      await Post.findByIdAndUpdate(postID, { $push: { comments: newComment._id } });
      res.status(201).json(newComment);
  }