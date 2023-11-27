import { useParams, useLocation } from 'react-router-dom';
import { useState } from "react";

const CommentItem = ({comment}) => {
    return (
        <>
            <li>{comment.text}</li>
        </>
    );
}

export default CommentItem;