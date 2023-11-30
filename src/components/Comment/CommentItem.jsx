import '../../Pages/CommunityListPage/index.css'

const CommentItem = ({comment}) => {
    return (
        <>
            <div>
                <p>{comment.author.name}</p>
                <p className='comment-item'>{comment.content}</p>
            </div>
        </>
    );
}

export default CommentItem;