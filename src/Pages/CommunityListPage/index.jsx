import CommunityCard from "../../components/Community/CommunityCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as communityService from '../../utilities/community-api'

function CommunityListPage() {
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
        <div>
            <h1>Community List</h1>
            <div className="card-container">
                {communities.map((community, index) => <CommunityCard community={community} key={index}/>)}
                <button onClick={_handleClick}>Create new community</button>
            </div>
        </div>
    )
}

export default CommunityListPage;
