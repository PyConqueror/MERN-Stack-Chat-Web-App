import { useState } from "react";
import * as communityServices from '../../utilities/community-api'

const CreateComment = ({ user, post, getComments}) => {
    const [newComment, setNewComment] = useState({
        author: user._id,
        post: post,
        content: ''
    });

    function _handleInputChange(event) {
        setNewComment({
            ...newComment,
            content: event.target.value
        });
    }

    async function _handleAddComment(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        try {
            await communityServices.createComment(newComment);
            setTimeout(async () => { //introduce timer for DB delay
                await getComments();   // Call getComments to update the comment list
            }, 1000);
  
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form onSubmit={_handleAddComment}>
                <textarea 
                    placeholder="Enter a comment"
                    value={newComment.content}
                    onChange={_handleInputChange}
                    required
                />
                <button type="submit">Submit comment</button>
            </form>
        </>
    );
}

export default CreateComment;