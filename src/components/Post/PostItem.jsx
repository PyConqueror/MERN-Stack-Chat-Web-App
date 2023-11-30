import { useState, useEffect } from "react";
import CommentList from "../Comment/CommentList"
import CreateComment from "../Comment/CreateComment"
import * as communityService from '../../utilities/community-api'

const PostItem = ({ post, user, community}) => {
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
            <h3>{post.content}</h3>
            <img src={post.images} />
            <CreateComment user={ user } post={ post._id } community={ community }/>
            <button onClick={_handleToggle}>{showComments ? 'Hide comments' : 'Show comments'}</button>
            {showComments && <CommentList comments={comments}/>}
        </div>
    );
}

export default PostItem;