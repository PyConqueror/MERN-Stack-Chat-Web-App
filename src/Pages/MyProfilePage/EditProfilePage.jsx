import * as profileAPI from '../../utilities/my-profile-api'

function EditProfilePage({ user }){
    const bio = user.biography
    const location = user.location

    return(
        <>
            <p>{user.name}</p>
            <div className="profile-image" style={user.avatar.startsWith('hsl') 
            ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
                {user.name.charAt(0)}
            </div>
            <button>Upload new profile picture</button>
            <p>Current biography:</p>
            <p>{ bio.length === 0 ? "No Biography" : bio}</p>
            <textarea></textarea>
            <button >Edit Biography</button>
            <p>Current location:</p>
            <p>{ location.length === 0 ? "No Location" : bio}</p>
            <input type="text"></input>
            <button>Edit Location</button>
        </>
    )
}

export default EditProfilePage