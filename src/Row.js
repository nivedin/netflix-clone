import axios from './axios';
import React, { useEffect, useState } from 'react'
import './row.css';
import HoverMovie from './HoverMovie';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


function Row({title,fetchUrl,isLargeRow=false}) {

    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        
        fetchData()
    }, [fetchUrl])

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            //dfdfdf
            autoplay:1,

        },
    };

    const handleClick = (movie) => {
         if(trailerUrl){
             setTrailerUrl("");
         }else{
             movieTrailer(movie?.name || movie?.title || "")
             .then(url => {
                 const urlParams = new URLSearchParams(new URL(url).search);
                 setTrailerUrl(urlParams.get('v'));

             }).catch(error => console.log(error))
         }
      
    }

    const handleMouseEnter = (e) => {
        let Elem = e?.currentTarget
        let childElem = Elem.querySelector('.hoverMovie')
        childElem.style.opacity = 1;
        //console.log(childElem);
    }
    const handleMouseLeave = (e) => {
        let Elem = e?.currentTarget
        let childElem = Elem.querySelector('.hoverMovie')
        childElem.style.opacity = 0;
        //console.log(childElem);
    }

    //console.log(movies);
    return (
        <div className="row">
            <h2>{title} </h2>
            <div className="row__posters">
            {movies.map((movie,i) => (
               ((isLargeRow && movie.poster_path) || 
                (!isLargeRow && movie.backdrop_path)) && (
                    <div key={i} className={`moviePosterContainer ${isLargeRow && "moviePosterContainer__large"}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img onClick={() => handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}/${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} alt={movie.name} />
                    <HoverMovie movie={movie} />
                    </div>
                
                )
            ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
