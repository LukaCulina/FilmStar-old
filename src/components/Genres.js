import { useEffect } from "react";
import Chip from '@mui/material/Chip';
import './Genres.css'

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const handleAdd=(genre)=>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g)=>g.id!==genre.id))
        setPage(1);
    }

    const handleRemove=(genre)=>{
        setSelectedGenres(
            selectedGenres.filter((selected)=>selected.id!==genre.id))
        setGenres([...genres, genre]);
        setPage(1);
    }

        const fetchGenres = async() =>{
            const response = await fetch(
                `https://api.themoviedb.org/3/genre/${type}/list?api_key=9d226837169e45a79056a5040bd49c77&language=en-US`
            )
            const data = await response.json();
            setGenres(data.genres);
            }

            console.log(genres);

            useEffect(() => {
                fetchGenres();

                return ()=>{
                    setGenres({})
                };
            }, [])
        
        return(
            <div className="contain">
                {Array.isArray(selectedGenres) ? selectedGenres && selectedGenres.map((genre)=>(
                    <Chip label={genre.name}
                    style={{margin: 4, padding: 5, fontSize: 17, height:30}}
                    clickable
                    size="small"
                    color="primary"
                    key={genre.id}
                    onDelete={()=>handleRemove(genre)}
                    />
                )):null}
                {Array.isArray(genres) ? genres && genres.map((genre)=>(
                    <Chip label={genre.name}
                    style={{margin: 4, padding: 5, fontSize: 17, height:30}}
                    clickable
                    size="small"
                    key={genre.id}
                    onClick={()=>handleAdd(genre)}
                    />
                )):null}
            </div>
            
        )
}
 
export default Genres;