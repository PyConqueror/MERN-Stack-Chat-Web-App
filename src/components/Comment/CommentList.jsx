import CommentItem from "./CommentItem"

const CommentList = ({comments}) => {

    if(!comments){
        return(
            <p>No comments</p>
        )
    }

    return (
        <>
            {comments.map((c, index) => <CommentItem comment={c} key={index} />)}
        </>
    );
}

export default CommentList;