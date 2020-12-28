import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/Movie.css";

function Movie({ id, title, poster, genres, year }) {
	const pathnameTitle = title.replace(/ /gi, "");
	return (
		<Link
			to={{
				pathname: `/movie-detail/${pathnameTitle}`,
				state: {
					id,
					title,
				},
			}}
			className="movie_item"
		>
			<div className="movie_poster">
				<img src={poster} alt={title} title={title} />
			</div>
			<h3 className="movie_title">{title}</h3>
			<p className="movie_year">{year}</p>
		</Link>
	);
}

Movie.prototype = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	poster: PropTypes.string.isRequired,
	genres: PropTypes.array.isRequired,
};

export default Movie;
