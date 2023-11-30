import { useNavigate } from 'react-router-dom'
import '../../Pages/CommunityListPage/index.css'

const CommunityCard = ({ community }) => {
    const navigate = useNavigate();

    function _handleCommunityClick(communityId){
        navigate(`communities/${communityId}`);
    };

    return (
        <div>
            <div className="card" onClick={() => _handleCommunityClick(community._id)}>
                <img src={ community.coverPhoto } />
                <div className='card-texts'>
                    <h2>{ community.name }</h2>
                    <p className='card-description'>{ community.description }</p>
                </div>
            </div>
        </div>
    );
}

export default CommunityCard;