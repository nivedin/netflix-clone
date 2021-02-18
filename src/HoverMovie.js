import React from 'react';
import './hoverMovie.css';


function HoverMovie({movie}) {
    //console.log(movie);
    return (
        <div className="hoverMovie">
            {movie.title || movie.name}
        </div>
    )
}

export default HoverMovie
