import React, { useReducer, useEffect } from "react";
import Loader from "../components/Loader";
import MovieDetail from "../components/MovieDeatil";

const initialState = {
	isLoading: true,
	movie: [],
	suggestMovie: [],
	errorMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "DETAIL_MOVIES_REQUEST":
			return {
				...state,
				isLoading: true,
				errorMessage: null,
			};
		case "DETAIL_MOVIES_SUCCESS":
			return {
				...state,
				isLoading: false,
				movie: action.payload,
			};
		case "DETAIL_MOVIES_SUGGEST_SUCCESS":
			return {
				...state,
				isLoading: false,
				suggestMovie: action.payload,
			};
		case "DETAIL_MOVIES_FAILURE":
			return {
				...state,
				isLoading: false,
				errorMessage: action.error,
			};
		default:
			return state;
	}
};

const Detail = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const { location, history } = props;
		if (location.state === undefined) {
			history.push("/");
		} else {
			fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${location.state.id}&with_images=true&with_cast=true`)
				.then((response) => response.json())
				.then((jsonResponse) => {
					dispatch({
						type: "DETAIL_MOVIES_SUCCESS",
						payload: jsonResponse.data.movie,
					});
				});
			fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${location.state.id}`)
				.then((response) => response.json())
				.then((jsonResponse) => {
					dispatch({
						type: "DETAIL_MOVIES_SUGGEST_SUCCESS",
						payload: jsonResponse.data.movies,
					});
				});
		}
	}, [props.match.params.name]);

	const { movie, errorMessage, isLoading, suggestMovie } = state;
	return (
		<div className="movie_detail_wrap">
			{isLoading && !errorMessage ? (
				<Loader />
			) : errorMessage ? (
				<div className="errorMessage">{errorMessage}</div>
			) : (
				<MovieDetail
					key={movie.id}
					title={movie.title}
					background={movie.large_screenshot_image2}
					poster={movie.large_cover_image}
					year={movie.year}
					genres={movie.genres}
					summary={movie.description_full}
					rating={movie.rating}
					runtime={movie.runtime}
					language={movie.language}
					casts={movie.cast}
					suggestMovie={suggestMovie}
				/>
			)}
		</div>
	);
};

export default Detail;
