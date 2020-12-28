import React, { useReducer, useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import SearchMovie from "../components/SearchMovie";
import Loader from "../components/Loader";
import "../css/Header.css";

const MOVIE_LIKE_API_URL = "https://yts.mx/api/v2/list_movies.json?sort_by=like_count&limit=10&with_rt_ratings=true";
const MOVIE_RECENT_API_URL = "https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=10&with_rt_ratings=true";

const initialState = {
	isLoading: true,
	likeMovies: [],
	recentMovies: [],
	searchMovies: [],
	errorMessage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "MOVIES_REQUEST":
			return {
				...state,
				isLoading: true,
				errorMessage: null,
			};
		case "MOVIE_LIKE_SUCCESS":
			return {
				...state,
				isLoading: false,
				likeMovies: action.payload,
			};
		case "MOVIE_RECENT_SUCCESS":
			return {
				...state,
				isLoading: false,
				recentMovies: action.payload,
			};
		case "MOVIE_FAILURE":
			return {
				...state,
				isLoading: false,
				errorMessage: action.error,
			};

		case "MOVIE_SEARCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				searchMovies: action.payload,
			};
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [mainTitle, setMainTitle] = useState("Movie List");
	useEffect(() => {
		fetch(MOVIE_LIKE_API_URL)
			.then((response) => response.json())
			.then((jsonResponse) => {
				dispatch({
					type: "MOVIE_LIKE_SUCCESS",
					payload: jsonResponse.data.movies,
				});
			});

		fetch(MOVIE_RECENT_API_URL)
			.then((response) => response.json())
			.then((jsonResponse) => {
				dispatch({
					type: "MOVIE_RECENT_SUCCESS",
					payload: jsonResponse.data.movies,
				});
			});
	}, []);

	const search = (searchValue) => {
		setMainTitle(searchValue);
		dispatch({
			type: "MOVIES_REQUEST",
		});

		fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=like_count&limit=10&query_term=${searchValue}`)
			.then((response) => response.json())
			.then((jsonResponse) => {
				if (jsonResponse) {
					dispatch({
						type: "MOVIE_SEARCH_SUCCESS",
						payload: jsonResponse.data.movies,
					});
				} else {
					dispatch({
						type: "MOVIE_SEARCH_FAILURE",
						error: jsonResponse.Error,
					});
				}
			});
	};

	const { likeMovies, recentMovies, errorMessage, isLoading, searchMovies } = state;

	return (
		<div className="container">
			<div className="header">
				<div className="gradient"></div>
				<div className="title">
					<span>lee pureum</span>
					<h1>{mainTitle}</h1>
				</div>
				<SearchMovie search={search} />
			</div>
			{isLoading && !errorMessage ? (
				<Loader />
			) : errorMessage ? (
				<div className="errorMessage">{errorMessage}</div>
			) : searchMovies === undefined ? (
				<div className="errorMessage">검색결과없습니다</div>
			) : searchMovies.length > 0 ? (
				<>
					<div className="movies_wrap">
						<MovieList title={"Search Movies"} itemList={searchMovies} />
					</div>
				</>
			) : (
				<>
					<div className="movies_wrap">
						<MovieList title={"Top Movies"} itemList={likeMovies} />
						<MovieList title={"Recent Movies"} itemList={recentMovies} />
					</div>
				</>
			)}
		</div>
	);
};
export default App;
