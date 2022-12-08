import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './Home.css'
import MovieList from '../Movielist/MovieList';

function Home()
{
    let [popularmovies, setPopularmovies]=useState([])

    useEffect(() => {
       fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US") 
       .then((res)=>res.json()).then((data)=>{setPopularmovies(data.results)})
    }, [])

  return (
    <>
      <div className='poster'>
        <Carousel showThumbs={false} autoPlay="true" autoFocus="true" transitionTime={3} infiniteLoop={true} showStatus={false}>
            {
                popularmovies.map((movie)=>
                {
                    return <Link to={`/movie/${movie.id}`} style={{textDecoration:"none" , color:"white"}}>
                    <div className='posterImage'>
                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt=""/>
                    </div>
                <div className='posterImage_overlay'>
                    <div className='posterImage_title'>{movie? movie.original_title:""}</div>
                    <div className='posterImage_runtime'>{movie? movie.release_date:""}
                    <span className='posterImage_rating'>{movie?movie.vote_average:""}</span>
                </div>
                <div className='posterImage_description'> {movie ? movie.overview:""}</div>
                </div>
                </Link>
                })
            }
        </Carousel>
        <MovieList/>
      </div>
    </>
  )
}

export default Home