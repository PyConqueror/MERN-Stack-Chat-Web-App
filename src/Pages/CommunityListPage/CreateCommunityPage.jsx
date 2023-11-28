import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as communityService from '../../utilities/community-api'

function CreateCommunityPage() {
    const navigate = useNavigate();
    const categories = [
        "Technology", "Books", "Fitness", "Travel",
        "Art", "Language Exchange", "Environment",
        "Career Development", "Food", "Gaming",
        "Music", "Film & Television", "Fashion",
        "Health & Wellness", "Sports", "Education",
        "Business", "Photography", "Science",
        "DIY & Crafts"
      ];
    const [newCommunity, setNewCommunity] = useState({
        name: '',
        description: '',
        coverPhoto: '',
        category: 'Technology',
    });

    function _handleChange(event) {
        const { name, value } = event.target;
        setNewCommunity({ ...newCommunity, [name]: value });
    };

    async function _handleSubmit(event) {
        await communityService.createGroup(newCommunity)
        // console.log(newCommunity)
        setTimeout(() => {
            navigate('/community');
        }, 500);
    }

    return (
        <>
            <h1>Create new community form</h1>
            <form>
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
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
                </select>   
                </label>
                
                <button onClick={_handleSubmit}>Save</button>
            </form>
        </>
    );
}

export default CreateCommunityPage;