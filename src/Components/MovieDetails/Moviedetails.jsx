import React, { useEffect, useState } from 'react'
import "./Moviedetails.css"
import { useParams } from "react-router-dom"
   

function Moviedetails() 
{
    const [currentMovieDetail, setCurrentMovieDetail] = useState()
    const { id } = useParams()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => 
    {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setCurrentMovieDetail(data))
    }

  return (
    <div className="movie">
    <div className="movie__intro">
        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
    </div>
    <div className="movie__detail">
        <div className="movie__detailLeft">
            <div className="movie__posterBox">
                <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
            </div>
        </div>
        <div className="movie__detailRight">
            <div className="movie__detailRightTop">
                <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                <div className="movie__rating">
                    {currentMovieDetail ? currentMovieDetail.vote_average: ""} 
                    <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                </div>  
                <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                <div className="movie__genres">
                    {
                        currentMovieDetail && currentMovieDetail.genres
                        ? 
                        currentMovieDetail.genres.map((genre) => 
                        {
                            <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                        }) 
                        : 
                        ""
                    }    
                </div>
            </div>
            <div className="movie__detailRightBottom">
                <div className="synopsisText">Description</div>
                <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div>  
        </div>
    </div>
    <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {
            currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><span className="movie__homeButton movie__Button">Homepage</span></a>
        }
        {
            currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><span className="movie__imdbButton movie__Button">IMDb</span></a>
        }
    </div>
</div>
  )
}

export default Moviedetails