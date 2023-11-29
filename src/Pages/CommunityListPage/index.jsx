import CommunityCard from "../../components/Community/CommunityCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as communityService from '../../utilities/community-api'

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
            <h1>Community List</h1>
            <div className="card-container">
                <button onClick={_handleClick}>Create new community</button>
                {communities.map((community, index) => <CommunityCard community={community} key={index} user={ user }/>)}
            </div>
        </div>
    )
}

export default CommunityListPage;
