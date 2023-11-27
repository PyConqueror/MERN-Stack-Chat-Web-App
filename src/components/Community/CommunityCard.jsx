import { useNavigate } from 'react-router-dom'

const CommunityCard = ({community}) => {
    const navigate = useNavigate();

    const _HandleCommunityClick = () => {
        navigate(`/community/${encodeURIComponent(community.title)}`, { state: { community } });
    };
    return (
        <div>
            <div 
            className="card"
            onClick={_HandleCommunityClick}
            >   
                <h2>{community.title}</h2>
                <p>{community.description}</p>
            </div>
        </div>
    );
}

export default CommunityCard;