import { useState } from "react";

const CreateComment = ({addComment}) => {
    const [newComment, setNewComment] = useState("")

    const _handleAddComment = (event) => {
        event.preventDefault();
        addComment({ text: newComment });
        setNewComment("");
    }

    return (
        <>
            <form onSubmit={_handleAddComment}>
                <textarea 
                    placeholder="Enter a comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    required
                />
                <button type="submit">SUBMIT COMMENT</button>
            </form>
        </>
    );
}

export default CreateComment;