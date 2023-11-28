import { useLocation } from 'react-router-dom';
import { testPosts } from '../../data'
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import PostList from '../../components/Post/PostList';

const CommunityDetailPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const community = state.community;
    const [posts, setPosts] = useState(testPosts);

    function _handleClick(){
        navigate('/community/new')
    }

    const addPost = (post) => {
        setPosts([...posts, post]);
    }

    return (
        <div>
            <h1>{community.title}</h1>
            <button onClick={_handleClick}>Edit Community</button>
            <CreatePost addPost={addPost}/>
            <PostList posts={posts}/>
        </div>
    );
}

export default CommunityDetailPage;