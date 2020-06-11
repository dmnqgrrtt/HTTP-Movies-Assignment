import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const UpdateMovie = ({movieList, setMovieList}) => {
    const initialState = {
        title: "",
        director: "",
        metascore: '',
        stars: []
    }
    const { id } = useParams();
    const { push } = useHistory();
    const [updatedMovie, setUpdatedMovie] = useState(initialState);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            console.log("update move useEffect", res);
            setUpdatedMovie(res.data)
        })
        .catch(err=>console.log(err))
    },[id])

    

    const handleChanges = (e) => {
        e.preventDefault();
        setUpdatedMovie({
            ...updatedMovie, 
            [e.target.name]: e.target.name === "stars" ? (updatedMovie.stars.map((star, index) => {
                if(index === Number(e.target.id)) {
                    return e.target.value;
                }
                return star;
            })) : e.target.value
        })
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then(res => {
            console.log("handle submit",res);
            setMovieList(movieList.map(movie => {
                if(movie.id === res.data.id) {
                    return res.data;
                }
                return movie;
            }))
            push(`/movies/${id}`);
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <h1>Update the Movie Information</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie Title:
                    <input 
                        type='text'
                        name='title'
                        placeholder="Enter the Movie Title"
                        value={updatedMovie.title}
                        onChange={handleChanges}
                    />
                </label>
                <label>
                    Movie Director:
                    <input 
                        type='text'
                        name='director'
                        placeholder="Enter the Movie Director"
                        value={updatedMovie.director}
                        onChange={handleChanges}
                    />
                </label>
                <label>
                    Movie Metascore:
                    <input 
                        type='number'
                        name='metascore'
                        placeholder="Enter the Movie Metascore"
                        value={updatedMovie.metascore}
                        onChange={handleChanges}
                    />
                </label>
                <label>
                    Movie Stars:
                    {updatedMovie.stars.map((star, index)=>(
                        <input key={index} type="text" id={index} name="stars" placeholder="Enter the Actor" value={star}  onChange={handleChanges}/>
                    ))}
                </label>
                <button type="submit">Update</button>
                <button onClick={(e)=>{
                    e.preventDefault();
                    push(`/movies/${id}`)}}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
