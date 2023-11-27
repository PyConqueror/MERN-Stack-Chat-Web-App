import { useState } from "react";
import { testPosts } from "../../data"
import CommentList from "../Comment/CommentList"
import CreateComment from "../Comment/CreateComment"

const PostItem = ({post}) => {
    const [comments, setComments] = useState(testPosts);
    const [showComments, setShowComments] = useState(false);
    
    const _handleToggle = () => {
        setShowComments(!showComments)
    }
    
    const addComment = (comment) => {
        setComments([...comments, comment]);
    }


    return (
        <div>
            <h3>{post.text}</h3>

            <CreateComment addComment={addComment}/>
            <button onClick={_handleToggle}>{showComments ? 'Hide comments' : 'Show comments'}</button>
            {showComments && <CommentList comments={comments}/>}
            <p>Show comments</p>

        </div>
    );
}

export default PostItem;