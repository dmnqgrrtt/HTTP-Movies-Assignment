import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const UpdateMovie = props => {
    const { id } = useParams();
    const [updatedMovie, setUpdatedMovie] = useState({
        title: "",
        director: "",
        metascore: '',
        stars: []
    });

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

    return (
        <div>
            <h1>Update the Movie Information</h1>
            <form>
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
                <button type="submit">Enter</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
