import { useLocation } from 'react-router-dom';
import { testPosts } from '../../data'
import { useState } from "react";
import CreatePost from "../../components/Post/CreatePost";
import PostList from '../../components/Post/PostList';



const CommunityDetailPage = () => {
    const { state } = useLocation();
    const community = state.community;
    const [posts, setPosts] = useState(testPosts);

    const addPost = (post) => {
        setPosts([...posts, post]);
    }

    return (
        <div>
            <h1>{community.title}</h1>
            <CreatePost addPost={addPost}/>
            <PostList posts={posts}/>
        </div>
    );
}

export default CommunityDetailPage;