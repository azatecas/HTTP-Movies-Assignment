import React,{ useState, useEffect } from "react";
import axios from "axios";
import MovieCard from './MovieCard';
import { useParams, useHistory } from 'react-router-dom';


const Form = (props) => {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: 0,
        stars: [],
        id: Date.now()
    });

    const { id } = useParams();
    const history = useHistory();

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const selectMovie = props.movieList.find(item => item.id === id);
        if(selectMovie) {
            setMovie(selectMovie);
        }       
    }, [props.movieList]);

    const handleSubmit = (e) => {
        e.preventDefault();        
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then( res => {
                console.log('put',res);
                props.getMovieList();
                history.push('/')
            })
            .catch(err => {
                console.log('error handlesubmit', err);
            })
         } 



    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                name='title' 
                value={movie.title} placeholder='title'
                onChange={handleChange}
            />
            <input 
                type='text' 
                name='director' 
                value={movie.director} placeholder='director'
                onChange={handleChange}
            />
            <input 
                type='number' 
                name='metascore' 
                value={movie.metascore} placeholder='metascore'
                onChange={handleChange}
            />
            <button type="submit">Update</button>
        </form>
    )
}
export default Form;