import {useEffect, useState} from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/movieCard';
import { useDebounce } from 'react-use';


const API_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = ()=> {
    
  const [searchString, setSearchString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchString, setDebouncedSearchString] = useState('');

  // debounce the search string by prevent making api requests for every single change in searchString

  useDebounce(()=> setDebouncedSearchString(searchString), 500,
  [searchString]);

  const fetchMovies = async(query = '')=> {

    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = query? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const movieData = await response.json();
      // console.log(response.ok);

      if(!response.ok){
        throw new Error('failed to :(');
      }

      console.log(movieData);
      // console.log(object);

      setMovieList(movieData.results || []);

    }
    catch(error){
      console.log(`Error Fetching Movies ${error}`);
      setErrorMessage('Error Fetching Movies. Try again.');
    }
    finally {
      // console.log(object);
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    fetchMovies(debouncedSearchString);
  }, [debouncedSearchString]);


  return (
    <main>

      <div className='pattern'/>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="" />
            <h1 className=""><span className='text-gradient'>Discover movies</span> you'll love — within few clicks!</h1>
            <Search searchString = {searchString} setSearchString = {setSearchString}/>
          </header>    
          <section className='all-movies'>
            <h2 className='my-4'>All movies</h2>
            {isLoading? (
              <Spinner/>
              // <p className='text-white'>Loading...</p>
            )
            : errorMessage?
            (
              <p className="text-red-500">{errorMessage}</p>
            ):
            (
              <ul>
                {movieList.map((movie)=>(
                  <MovieCard key={movie.id} movie={movie}/>
                  ))}
              </ul>
            )}

          </section>
        </div>
    </main>
  )
}

export default App;
