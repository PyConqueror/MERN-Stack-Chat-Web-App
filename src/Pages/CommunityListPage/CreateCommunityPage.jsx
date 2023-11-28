import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCommunityPage = ({communities, setCommunities}) => {
    const navigate = useNavigate();
    const [newCommunity, setNewCommunity] = useState({
        name: '',
        description: '',
        coverPhoto: '',
        category: 'Technology',
    });

    const _handleChange = (event) => {
        const { name, value } = event.target;
        setNewCommunity({ ...newCommunity, [name]: value });
    };

    const _handleSubmit = (event) => {
        event.preventDefault();
        setCommunities([...communities, newCommunity]);
        navigate('/community');

    }

    return (
        <>
            <h1>Create new community form</h1>
            <form onSubmit={_handleSubmit}>
                <label>Community name:
                    <input name="name" type="text" onChange={_handleChange}/>
                </label>

                <label >Description:
                    <textarea name="description" cols="30" rows="10" onChange={_handleChange}></textarea>
                </label>

                {/*<label >Cover photo:
                    <input type="file" name="coverPhoto" onChange={_handleChange} accept="image/*" />
    </label>*/}

                <label>Choose a category:
                    <select name="category" onChange={_handleChange}>
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
        </>
    );
}

export default CreateCommunityPage;