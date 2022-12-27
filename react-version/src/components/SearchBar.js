const SearchBar = () => {
    return (
        <>
            <div>
                <div>
                    <label for='area'>Area: </label>
                    <input 
                        id='area'
                        type='text'
                    />
                    <label for='city'>City: </label>
                    <input 
                        id='city'
                        type='text'
                    />
                </div>
                <button>Search</button>
            </div>
        </>
    )
};

export default SearchBar;