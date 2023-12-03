const Community = require('../../models/community')
const Post = require('../../models/post')
const Comment = require('../../models/comment')
const User = require('../../models/user')

module.exports = {
    showOneCommunity,
    showAllCommunities,
    showPosts,
    showComments,
    createPost,
    createComment,
    createCommunity,
    updateCommunity,
    createPostFromSocket,
    createCommentFromSocket
};

async function showOneCommunity(req, res) {
    const community = await Community.findById(req.params.id)
    res.json(community)
}

async function showAllCommunities(req,res) {
    try {
        const communities = await Community.find()
        res.json(communities)
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Server error'})
    }
}

async function showPosts(req, res) {
    const communityID = req.params.id
    const posts = await Post.find({ group: communityID }).populate('comments')
    res.json(posts)
}

async function showComments(req, res) {
    const postID = req.params.id;
    const comments = await Comment.find({ post: postID }).populate('author', 'name avatar');
    res.json(comments);
}

async function createPost(req, res) {
    const {author,community, content, images} = req.body
    const newPost = new Post({
        author:author,
        group:community,
        content:content,
        images:images
    })
    await newPost.save()
    const communityID = req.body.community
    await Community.findByIdAndUpdate(communityID, { $push: { posts: newPost._id } });
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, {$push: { posts: newPost._id }})
    await Post.findByIdAndUpdate(newPost._id, {}) 
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

async function createCommunity(req, res) {
    const newCommunity = new Community(req.body)
    await newCommunity.save()
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, {$push: { communitiesCreated: newCommunity._id }})
    res.json(newCommunity)
}

async function updateCommunity(req, res){
    const community = await Community.findById(req.body._id)
    community.name = req.body.name;
    community.description = req.body.description;
    community.coverPhoto = req.body.coverPhoto;
    community.category.pop() 
    community.category.push(req.body.category);
    await community.save()
    res.status(200).json({ message: "sucess"})
}

async function createPostFromSocket(newPost) {
    const {author,community, content, images} = newPost
    const NewPost = new Post({
        author:author,
        group:community,
        content:content,
        images:images
    })
    await NewPost.save()
    const communityID = NewPost.community
    await Community.findByIdAndUpdate(communityID, { $push: { posts: NewPost._id } });
    const userId = author
    await User.findByIdAndUpdate(userId, {$push: { posts: NewPost._id }})
    return NewPost
}

async function createCommentFromSocket(newComment){
    const NewComment = new Comment(newComment)
    await NewComment.save()
    const postID = newComment.post
    await Post.findByIdAndUpdate(postID, { $push: { comments: NewComment._id } });
    const userId = newComment.author
    await User.findByIdAndUpdate(userId, {$push: { comments: NewComment._id }})
    return NewComment
}