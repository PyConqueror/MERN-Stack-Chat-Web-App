import { useLocation } from 'react-router-dom';
// import { testPosts } from '../../data'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import PostList from '../../components/Post/PostList';
import * as communityService from '../../utilities/community-api'

const CommunityDetailPage = () => {
    const [community, setCommunity] = useState([])
    const { state } = useLocation();
    const navigate = useNavigate()
    const communityId = state?.community;
    const [posts, setPosts] = useState([]);

    useEffect(function(){
        async function fetchGroup(){
            const community = communityService.getOneGroup
            setCommunity(community)
        }
        fetchGroup()
        
    }, [])

    function _handleClick(){
        navigate('/community/new')
    }

    return (
        <div>
            <h1>{community.name}</h1>
            <button onClick={_handleClick}>Edit Community</button>
            <CreatePost />
            <PostList posts={posts}/>
        </div>
    );
}

export default CommunityDetailPage;