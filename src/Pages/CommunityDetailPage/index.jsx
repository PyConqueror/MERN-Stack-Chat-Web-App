import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import PostList from '../../components/Post/PostList';
import * as communityService from '../../utilities/community-api'
import '../CommunityListPage/index.css'
import io from 'socket.io-client';
const socket = io()

const CommunityDetailPage = ({ user }) => {
    const { communityId } = useParams();
    const [community, setCommunity] = useState([])
    const [posts, setPosts] = useState('');
    const navigate = useNavigate()

    useEffect(function(){
        async function fetchComminity(){
            const community = await communityService.getOneCommunity(communityId);
            setCommunity(community);
            let admin = community.admins[0] 
            let userId = user._id
        }
        async function getAllPosts(){
            const allPosts = await communityService.getPosts(communityId)
            setPosts(allPosts)
        }
        fetchComminity()
        getAllPosts()
        socket.on('refreshGroup', (Post) => {
            if(Post.post.group === communityId){
                setPosts((posts) => [...posts, Post.post])
            }
        });
        return () => {
            socket.off('refreshGroup');
        };
    }, [communityId])

    function _handleClick(){
        navigate(`/communities/${communityId}/edit`)
    }

    if(community === null || community.length === 0){
        return(
            <p>Loading...</p>
        )
    }

    return (
        <div className='content-container'>
            <img className='community-cover-image' src={community.coverPhoto}/>
            <div className='community-detail-body'>
                <div className='community-header'>
                    <h1>{ community.name }</h1>
                </div>
                <div className='posts-about-container'>
                    <div className='grid-item'>
                        <CreatePost user={ user } community={ community }/>
                        <PostList user={ user } community={ community } posts={posts} setPosts={setPosts}/>
                    </div>
                    <div className='grid-item'>
                        { community.admins[0] == user._id ? (<button onClick={_handleClick}>Edit community</button> ) : null}
                        <h3>About Community</h3>
                        <p>{ community.description }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetailPage;