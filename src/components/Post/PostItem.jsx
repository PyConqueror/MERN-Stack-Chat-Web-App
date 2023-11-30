import { useState, useEffect } from "react";
import CommentList from "../Comment/CommentList"
import CreateComment from "../Comment/CreateComment"
import * as communityService from '../../utilities/community-api'
import '../../pages/CommunityListPage/index.css'

const PostItem = ({ post, user}) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    
    const _handleToggle = () => {
        setShowComments(!showComments)
    }
    
    useEffect(function(){
        async function getComments(){
            const currentComments = await communityService.getComments(post._id)
            setComments(currentComments)
        }
        getComments()

    }, [])

    return (
        <div>
            <p>{post.content}</p>
            <img src={post.images} />
            <button onClick={_handleToggle} className="show-comments-button">{showComments ? 'Hide comments' : 'Show comments'}</button>
            {showComments && <CommentList comments={comments}/>}
            <CreateComment user={ user } post={ post._id }/>
        </div>
    );
}

export default PostItem;