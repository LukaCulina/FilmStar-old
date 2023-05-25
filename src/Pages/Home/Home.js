import * as React from 'react';
import { useEffect, useState } from "react";
import './Home.css'
import HomeCarousel from './HomeCarousel/HomeCarousel';

export default function Home() {
  const [genres, setGenres] = useState([]);
  
  const fetchGenres = async() =>{
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=9d226837169e45a79056a5040bd49c77&language=en-US`
    )
    const data = await response.json();
    setGenres(data.genres);
    }

    console.log(genres);

    useEffect(() => {
        fetchGenres();
    }, [])


  return (
    <>   
        <div>
        {
            genres && genres.map((genre)=>(
                <HomeCarousel name={genre.name} genre={genre.id}/>
                ))
        
        }
        </div>
    </>
  );
}
