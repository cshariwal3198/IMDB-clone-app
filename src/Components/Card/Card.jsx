import React, { useEffect, useState } from 'react'
import Skeleton , {SkeletonTheme} from "react-loading-skeleton"
import './Card.css'
import {Link} from 'react-router-dom'

function Card({movie}) 
{
    let [isloading, setIsloading]=useState(true)

    useEffect(() => {
        setTimeout(()=>
        {
            setIsloading(false)
        },1500)
    }, [])

  return (
    <>
      {
        isloading?<div className='cards'>
            <SkeletonTheme color="#202020" highlightColor='#444'>
                <Skeleton height={300} duration={2}/>
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className='cards'>
                <img className='cards_img' src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`}/>
                <div className='cards_overlay'>
                    <div className='cards_title'>{movie?movie.original_title:""}</div>
                    <div className='cards-runtime'>
                        {movie?movie.release_date:""}
                        <span className='cards_rating'>{movie?movie.vote_average:""}</span>
                    </div>
                    <div className='cards_dscription'>{movie?movie.overview.slice(0,100)+"....":""}</div>
                </div>
            </div>
        </Link>
      }  
    </>
  )
}

export default Card