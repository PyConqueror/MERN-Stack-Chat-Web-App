import { useNavigate } from 'react-router-dom'

const CommunityCard = ({ community }) => {
    const navigate = useNavigate();

    function _handleCommunityClick(communityId){
        navigate(`/community/${encodeURIComponent(communityId)}`, { state: { communityId } });
    };

    return (
        <div>
            <div className="card" onClick={() => _handleCommunityClick(community._id)}>
                <img src={ community.coverPhoto } />   
                <h2>{ community.name }</h2>
                <p>{ community.description }</p>
            </div>

        </div>
    );
}

export default CommunityCard;