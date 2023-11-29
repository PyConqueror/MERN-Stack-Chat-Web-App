import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as communityServices from '../../utilities/community-api'

const CreateComment = ({ user, post}) => {
    const [newComment, setNewComment] = useState({
        author: user._id,
        post: post,
        content: ''
    })
    const navigate = useNavigate()

    function _handleInputChange(event){
        setNewComment({
            ...newComment,
            content: event.target.value
        })
    }

    async function _handleAddComment(){

        try {
            communityServices.createComment(newComment)
            navigate('/community');
        } catch (err){
            console.log(err)
        }
    }

    return (
        <>
            <form>
                <textarea 
                    placeholder="Enter a comment"
                    value={newComment.content}
                    onChange={_handleInputChange}
                    required
                />
                <button type="submit" onClick={_handleAddComment}>Submit comment</button>
            </form>
        </>
    );
}

export default CreateComment;