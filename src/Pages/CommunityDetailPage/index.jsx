import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import * as communityService from '../../utilities/community-api'

const CommunityDetailPage = ({ user }) => {
    const { communityId } = useParams();
    const [community, setCommunity] = useState([])
    const navigate = useNavigate()

    useEffect(function(){
        async function fetchComminity(){
            const community = await communityService.getOneCommunity(communityId);
            setCommunity(community);
            let admin = community.admins[0] 
            let userId = user._id
            if(admin == userId){
                console.log("true")
            }
        }
        fetchComminity()
    }, [])

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
            <h1>{ community.name }</h1>
            <img src={community.coverPhoto} style={{width: '50vmin'}}/>
            <h2>{ community.description }</h2>
            { community.admins[0] == user._id ? (<button onClick={_handleClick}>Edit Community</button> ) : null}
            <CreatePost user={ user } community={ community }/>
        </div>
    );
}

export default CommunityDetailPage;