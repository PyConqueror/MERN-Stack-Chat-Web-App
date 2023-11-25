import CommunityCard from "../../components/Community/CommunityCard"
import { Link } from "react-router-dom"

function CommunityPage() {
    return(
        <div>
            <h1>COMMUNITY PAGE</h1>
            <CommunityCard />
            {/* Add link to CommunityShow */}
        </div>
        
        
    )
}

export default CommunityPage


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