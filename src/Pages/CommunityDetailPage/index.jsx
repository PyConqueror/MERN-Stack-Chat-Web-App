import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import * as communityService from '../../utilities/community-api'
import '../CommunityListPage/index.css'

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
            <img className='community-cover-image' src={community.coverPhoto}/>
            <div className='community-detail-body'>
                <div className='community-header'>
                    <h1>{ community.name }</h1>
                    { community.admins[0] == user._id ? (<button onClick={_handleClick}>Edit</button> ) : null}
                </div>
                <div className='posts-about-container'>
                    <div className='grid-item'>
                        <CreatePost user={ user } community={ community }/>
                    </div>
                    <div className='grid-item'>
                        <h3>About Community</h3>
                        <p>{ community.description }</p>
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default CommunityDetailPage;