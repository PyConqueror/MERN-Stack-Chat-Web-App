import CommunityCard from "../../components/Community/CommunityCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as communityService from '../../utilities/community-api'

function CommunityListPage() {
    const [communities, setCommunities] = useState('')
    const navigate = useNavigate()

    async function fetchGroups() {
        const data = await communityService.getGroups()
        setCommunities(data)
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    function _handleClick(){
        navigate('/community/new')
    }

    return(
        <div>
            <h1>Community List</h1>
            <button onClick={_handleClick}>Create new community</button>

            <div className="card-container">
                {/* {communities.map((c, index) => <CommunityCard community={c} key={index} />)} */}
            </div>
        </div>
    )
}

export default CommunityListPage;
