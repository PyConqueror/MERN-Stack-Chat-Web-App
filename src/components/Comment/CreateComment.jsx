import { useState } from "react";
import io from 'socket.io-client';
const socket = io()

const CreateComment = ({ user, post }) => {
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

    async function emitNewComment() {
        socket.emit('newComment', { newComment });
      }

    async function _handleAddComment(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        try {
            emitNewComment()
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