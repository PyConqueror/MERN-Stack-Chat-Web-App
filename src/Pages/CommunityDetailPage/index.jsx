import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import * as communityService from '../../utilities/community-api'
import '../CommunityListPage/index.css'

const CommunityDetailPage = ({ user }) => {
    const [community, setCommunity] = useState([])
    const { state } = useLocation();
    const navigate = useNavigate()
    const communityId = state?.communityId;
    let admin = community.admins;
    const userId = user._id

    useEffect(function(){
        async function fetchGroup(){
            const community = await communityService.getOneGroup(communityId)
            setCommunity(community)
        }
        fetchGroup()
    }, [])

    function _handleClick(){
        navigate(`/community/${communityId}/edit`)
    }

    if(!community.name){
        return(
            <p>Loading...</p>
        )
    }

    if(!community.admins){
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
                    { admin == userId ? (<button onClick={_handleClick}>Edit</button> ) : null}
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