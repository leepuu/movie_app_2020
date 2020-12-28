import React from "react";
import Movie from "../components/Movie";

function MovieList({ itemList, title }) {
	return (
		<div className="movies">
			<h2 className="title">
				<span>{title}</span>
			</h2>
			<div className="movie_list">
				{itemList.map((item) => (
					<Movie key={item.id} id={item.id} title={item.title} genres={item.genres} poster={item.large_cover_image} year={item.year} />
				))}
			</div>
		</div>
	);
}

export default MovieList;
