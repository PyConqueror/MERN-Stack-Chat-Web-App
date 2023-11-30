import CommunityCard from "../../components/Community/CommunityCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as communityService from '../../utilities/community-api'
import './index.css'

function CommunityListPage({ user }) {
    const [communities, setCommunities] = useState(null)
    const navigate = useNavigate()

    useEffect(function(){
        async function fetchCommunities() {
            const data = await communityService.getAllCommunities()
            setCommunities(data)
        }
        fetchCommunities();

    }, []);

    function _handleClick(){
        navigate('/communities/new')
    }

    if (!communities || communities.length === 0){
        return(
            <div className="content-container">
                <h1>Communities</h1>
                <button onClick={_handleClick}>Create new community</button>
                <p>No communities exist </p>
            </div>
        )
    }

    return(
        <div className="content-container">
            <h1>Communities</h1>
            <button onClick={_handleClick}>Create new community</button>
            <div className="card-container">
                {communities.map((community, index) => <CommunityCard community={community} key={index} user={ user }/>)}
            </div>
        </div>
    )
}

export default CommunityListPage;
