import CommunityCard from "../../components/Community/CommunityCard"
import { useNavigate } from "react-router-dom"

const CommunityListPage = ({communities}) => {
    const navigate = useNavigate()

    function _handleClick(){
        navigate('/community/new')
    }

    return(
        <div>
            <h1>Community List</h1>
            <button onClick={_handleClick}>Create new community</button>

            <div className="card-container">
                {communities.map((c, index) => <CommunityCard community={c} key={index} />)}
            </div>
        </div>
    )
}

export default CommunityListPage;


//   Create state to hold list of groups and posts
//   Define function to fetch groups and posts from backend
//   Define function to submit a new post
//   Render community groups and posts
//     For each group, display group details and posts
//     Include function to add new posts
//     Include function to add comments to posts


//components to show list of available groups based on interest
//components to show post inside the groups 

//import css