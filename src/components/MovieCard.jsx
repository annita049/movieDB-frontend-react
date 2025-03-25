import React from 'react'

const MovieCard = ({movie: {title, poster_path, vote_average, original_language, release_date}}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`:
        '/no-poster.png'} alt={title} />
        <div className="mt-4">
            <h2 className='text-white'>
                {title}
            </h2>
            <div className="content">
                <div className="rating">
                    <img src="./star.svg" alt="" />
                    <p>{vote_average? vote_average.toFixed(1): "N/A"}</p>
                </div>
                <span>•</span>
                <p class="lang">{original_language? original_language:'N/A'}</p>
                <span>•</span>
                <p class="year">{release_date? release_date.split('-')[0]: 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard