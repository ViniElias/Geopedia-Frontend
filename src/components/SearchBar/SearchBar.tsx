import "./SearchBar.css";

interface SearchBarProps {
    placeholder: string;
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
    return (
        <input
            type="search" 
            className="searchBar" 
            placeholder={placeholder} 
            onChange={(e) => onSearch(e.target.value)} />
    )
}

export default SearchBar;