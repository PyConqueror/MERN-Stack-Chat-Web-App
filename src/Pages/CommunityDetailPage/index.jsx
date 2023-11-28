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
    const communityId = state?.communityId;
    const [posts, setPosts] = useState([]);

    useEffect(function(){
        async function fetchGroup(){
            console.log(communityId)
            const community = await communityService.getOneGroup(communityId)
            setCommunity(community)
            console.log(community)
        }
        fetchGroup()
        
    }, [])

    function _handleClick(){
        navigate('/community/new')
    }

    if(!community.name){
        return(
            <p>Loading...</p>
        )
    }

    return (
        <div>
            <h1>{ community.name }</h1>
            <img src={community.coverPhoto} style={{width: '50vmin'}}/>
            <h2>{ community.description }</h2>
            <button onClick={_handleClick}>Edit Community</button>
            <CreatePost />
            <PostList posts={posts}/>
        </div>
    );
}

export default CommunityDetailPage;