import React, { useState } from "react";
import Search from "../images/search.svg";

const SearchMovie = (props) => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchInputChanges = (e) => {
		setSearchValue(e.target.value);
	};

	const resetInputField = () => {
		setSearchValue("");
	};

	const callSearchFunction = (e) => {
		e.preventDefault();
		if (searchValue === "") {
			alert("검색어를 입력해주세요.");
		} else {
			props.search(searchValue);
		}

		resetInputField();
	};

	return (
		<form className="search">
			<input value={searchValue} onChange={handleSearchInputChanges} type="text" />
			<button onClick={callSearchFunction} type="submit">
				<img src={Search} alt={searchValue} />
			</button>
		</form>
	);
};

export default SearchMovie;
