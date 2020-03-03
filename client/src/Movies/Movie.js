import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => {
        console.log('delete res', res);
        getMovieList();
        history.push('/')
      })
      .catch(err => console.log('error deleting', err))
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <Link to={`/update-movie/${match.params.id}`} >Update</Link>

      <button onClick={deleteMovie}>Delete</button>


    </div>
  );
}

export default Movie;
