const EditCommunityPage = () => {
    
    const _handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return (
        <div className='content-container'>
            <h1>Edit community</h1>
            <form onSubmit={_handleSubmit}>
                <label>Community name:
                    <input type="text" />
                </label>

                <label >Description:
                    <textarea name="description"></textarea>
                </label>

                <label>Choose a category:
                    <select name="category">
                        <option value="Technology">Technology</option>
                        <option value="Books">Books</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Travel">Travel</option>
                        <option value="Art">Art</option>
                        <option value="Language Exchange">Language Exchange</option>
                        <option value="Environment">Environment</option>
                        <option value="Career Development">Career Development</option>
                        <option value="Food">Food</option>
                        <option value="Gaming">Gaming</option>
                    </select>
                </label>
                
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditCommunityPage;