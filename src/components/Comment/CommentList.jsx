import CommentItem from "./CommentItem"

const CommentList = ({comments}) => {
    return (
        <ul>
            {comments.map((c, index) => <CommentItem comment={c} key={index} />)}
        </ul>
    );
}

export default CommentList;