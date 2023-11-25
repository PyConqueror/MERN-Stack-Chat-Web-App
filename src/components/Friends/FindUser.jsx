function FindUser() {
    return(
        <form>
        <label>Find users</label>
        <input 
            type="search" 
            placeholder="Search"
            onChange={_handleChange}></input>
        <button onClick={(event) => searchUsers(event, query)}>Search</button>
        </form>
    )
}
export default FindUser