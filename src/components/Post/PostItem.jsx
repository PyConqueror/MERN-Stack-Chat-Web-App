import { useState, useEffect } from "react";
import CommentList from "../Comment/CommentList"
import CreateComment from "../Comment/CreateComment"
import * as communityService from '../../utilities/community-api'
import '../../Pages/CommunityListPage/index.css'
import io from 'socket.io-client';
const socket = io()

const PostItem = ({ post, user, community}) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    
    const _handleToggle = () => {
        setShowComments(!showComments)
    }
    
    async function getComments() {
        const currentComments = await communityService.getComments(post._id);
        setComments(currentComments);
    }

    useEffect(() => {
        getComments();
        socket.on('refreshComment', (comment) => {
            if(comment.comment.post === post._id){
                setComments((comments) => [...comments, comment.comment]);
            }
        });
        return () => {
            socket.off('refreshComment');
        };
    }, [post._id]);

    return (
        <div className="post-card">
            <p>{post.content}</p>
            <img src={post.images}/>
            <CreateComment user={user} post={post._id} community={community} getComments={getComments} />
            <button onClick={_handleToggle} className="show-comments-button">
                {showComments ? 'Hide comments' : 'Show comments'}
            </button>
            {showComments && <CommentList comments={comments} />}
        </div>
    );

}

export default PostItem;