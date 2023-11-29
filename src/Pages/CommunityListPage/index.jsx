import CommunityCard from "../../components/Community/CommunityCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as communityService from '../../utilities/community-api'
import './index.css'

function CommunityListPage({ user }) {
    const [communities, setCommunities] = useState('')
    const navigate = useNavigate()

    async function fetchGroups() {
        const data = await communityService.getAllGroups()
        setCommunities(data)
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    function _handleClick(){
        navigate('/community/new')
    }

    if(!communities){
        return(
            <p>Loading...</p>
        )
    }

    return(
        <div className="content-container">
            <h1>List of Communities</h1>
            <button onClick={_handleClick}>Create new community</button>
            <div className="card-container">
                {communities.map((community, index) => <CommunityCard community={community} key={index} user={ user }/>)}
            </div>
        </div>
    )
}

export default CommunityListPage;
