import { useParams, useLocation } from 'react-router-dom';
import { useState } from "react";

const CommentItem = ({comment}) => {
    return (
        <>
            <div>
                <p>{comment.content}</p>
                <p>{comment.author.name}</p>
            </div>
        </>
    );
}

export default CommentItem;