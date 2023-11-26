import { useParams, useLocation } from 'react-router-dom';
import Post from "../../components/Community/Post";

const CommunityDetailPage = () => {
    const { state } = useLocation();
    const community = state.community;

    return (
        <div>
            <h1>{community.title}</h1>
            <Post />
        </div>
    );
}

export default CommunityDetailPage;