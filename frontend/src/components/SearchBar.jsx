function SearchBar({

    search,
    setSearch,

    city,
    setCity,

    cities,

    rating,
    setRating,

    sortBy,
    setSortBy

}) {

    return (

        <div
            style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
                marginBottom: "25px",
                flexWrap: "wrap"
            }}
        >

            {/* Search */}

            <input
                type="text"
                placeholder="🔍 Search Hospital..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "300px",
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid gray"
                }}
            />

            {/* City */}

            <select
                value={city}
                onChange={(e) =>{

                setCity(e.target.value)}}
                style={{
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px"
                }}
            >

                {cities.map((item) => (

                    <option
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>

                ))}

            </select>

            {/* Rating */}

            <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px"
                }}
            >

                <option value="All">All Ratings</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="5">5 ⭐</option>

            </select>

            {/* Sorting */}

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                    padding: "12px",
                    fontSize: "16px",
                    borderRadius: "8px"
                }}
            >

                <option value="Default">Sort By</option>
                <option value="High">Highest Rating</option>
                <option value="Low">Lowest Rating</option>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>

            </select>

        </div>

    );

}

export default SearchBar;