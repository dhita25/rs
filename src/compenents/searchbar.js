import { useState } from "react";

function SearchBar(props) {
    const {onSearch} = props;

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearch(search);
        }
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" value={search} onChange={handleSearch} onKeyPress={handleKeyPress} />
        </div>
    )

}
  
export default SearchBar;