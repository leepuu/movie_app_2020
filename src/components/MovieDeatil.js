import React from "react";
import PropTypes from "prop-types";
import "../css/MovieDetail.css";
import Home from "../images/home.svg";
import { IoTime, IoToday, IoChatbubbles } from "react-icons/io5";
import { SiImdb } from "react-icons/si";
import { Link } from "react-router-dom";

function MovieDeatil({ background, poster, title, year, genres = [], summary, rating, runtime, language, casts = [], suggestMovie }) {
	return (
		<div className="movie_detail">
			<div className="movie_background">
				<img src={background} alt="title" />
				<div className="gradient"></div>
				<Link to="/" className="home_link">
					<img src={Home} alt="home" />
				</Link>
			</div>
			<div className="movie_container">
				<div className="movie_poster">
					<img src={poster} alt="title" />
				</div>
				<div className="movie_text">
					<h3 className="title">{title}</h3>
					<ul className="genres">
						{genres.slice(0, 3).map((item, index) => {
							return <li key={index}>{item}</li>;
						})}
					</ul>
					<ul className="info">
						<li>
							<span className="icon">
								<IoTime />
							</span>
							{runtime}min
						</li>
						<li>
							<span className="icon">
								<IoToday />
							</span>
							{year}
						</li>
						<li className="lang">
							<span className="icon">
								<IoChatbubbles />
							</span>
							{language}
						</li>
					</ul>
					<p className="desc">{summary}</p>

					<dl className="rating">
						<dt>
							<SiImdb />
						</dt>
						<dd> &nbsp;{rating}</dd>
					</dl>
					<ul className="cast">
						{casts.slice(0, 3).map((item, index) => {
							return (
								<li key={index}>
									<img src={item.url_small_image} alt={item.name} />
									<span className="character_name">{item.character_name}</span>
									<span className="name">{item.name}</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="movie_etc">
					<div className="movie_suggest">
						<h2>More Like this</h2>
						<ul>
							{suggestMovie.map((item, index) => {
								const title = item.title.replace(/ /gi, "");
								return (
									<li key={index}>
										<Link
											to={{
												pathname: `/movie-detail/${title}`,
												state: {
													id: item.id,
													title: item.title,
												},
											}}
										>
											<div className="suggest_poster">
												<img src={item.medium_cover_image} alt={item.title} />
											</div>
											<div className="suggest_text">
												<span className="title">{item.title}</span>
												<span className="rating">{item.rating}</span>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<div className=""></div>
				</div>
			</div>
		</div>
	);
}

MovieDeatil.prototype = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	poster: PropTypes.string.isRequired,
	genres: PropTypes.array.isRequired,
};

export default MovieDeatil;
