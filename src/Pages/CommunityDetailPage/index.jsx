import { useParams, useLocation } from 'react-router-dom';
import CreatePost from "../../components/Post/CreatePost";
import { useState } from "react";

const testPosts = [
    {text: 'Keep Calm and be a farmer'},
    {text: 'Have Fun'},
    {text: 'I was stung by a bee'},
    {text: 'Learn the MERN-Stack'}
  ];

const CommunityDetailPage = () => {
    const { state } = useLocation();
    const community = state.community;
    const [posts, setPosts] = useState(testPost);

    const addPost = (post) => {
        setPosts([...posts, post]);
    }
    
    return (
        <div>
            <h1>{community.title}</h1>
            <CreatePost addPost={addPost} />
        </div>
    );
}

export default CommunityDetailPage;