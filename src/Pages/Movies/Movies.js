import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";
import { Button } from "@mui/material";
import {useRef} from 'react';

const Movies = () =>{

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [broj, setBroj] = useState(1);
    const [searchText, setSearchText] = useState("");

    const genreforURL = useGenre(selectedGenres);
    

    const fetchMovies = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
        )
        console.log(response);
        const data = await response.json();
        const approved = data.results;
        if(broj == 1){
            setContent(approved);
        } else if(broj == 2){
            const dobar = approved.sort((a, b) => (b.vote_average) - (a.vote_average))
            console.log(dobar)
            setContent(dobar)
        } else if(broj == 3){
            const dobar = approved.sort((a, b) => (a.vote_average) - (b.vote_average))
            console.log(dobar)
            setContent(dobar)
        } else if(broj == 4){
            const bolji = approved.sort((a, b) => a.title.localeCompare(b.title))
            console.log(bolji)
            setContent(bolji)
        } else if(broj == 5){
            const bolji = approved.sort((a, b) => b.title.localeCompare(a.title))
            console.log(bolji)
            setContent(bolji)
        } else if(broj == 6){
            const najbolji = approved.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            
            setContent(najbolji)
        } else if(broj == 7){
            const najbolji = approved.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
            
            setContent(najbolji)
        }
        console.log(data)
        
        setnumOfPages(500);
        console.log(numOfPages)
    };  

    const setNumber=(broj)=>{
        if(broj == 1){
            setBroj(2)
        } else if(broj == 2){
            setBroj(3)
        } else{
            setBroj(1)
        }
    }

    const setNumber2=(broj)=>{
        if(broj == 1){
            setBroj(4)
        } else if(broj==4){
            setBroj(5)
        } else{
            setBroj(1)
        }
    }

     const setNumber3=(broj)=>{
        if(broj == 1){
            setBroj(6)
        } else if(broj == 6){
            setBroj(7)
        } else{
            setBroj(1)
        }
    }
 

    useEffect(()=>{
        fetchMovies();
    },[page, genreforURL, broj])

    const fetchSearch = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            )
        const data = await response.json();
        console.log(data)
        console.log(response)
        data.length !=0 ? setContent(data.results):setContent(0)
        setnumOfPages(data.total_pages);
    };  
    const ref = useRef(null);
    const EnterKeyPress = (event) => {
        if (event.key === "Enter") {
            fetchSearch(searchText);
            ref.current.value = '';
        }
      }; 

    return (
        <div>
            <span>
            <input 
                type="text" 
                ref={ref}
                placeholder="Search..." 
                className="search"
                onChange={(e)=> {
                    setSearchText(e.target.value);
                    }
                }
                onKeyDown={EnterKeyPress}
            /></span>
           
            <span className="pageTitle">Movies</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                genres={genres}
                setSelectedGenres={setSelectedGenres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <Button variant='contained' style={{margin:10}} onClick={()=>setNumber(broj)}>
                Order by rating
            </Button>
            <Button variant='contained' style={{margin:10}} onClick={()=>setNumber2(broj)}>
                Order alphabetically
            </Button>
            <Button variant='contained' style={{margin:10}} onClick={()=>setNumber3(broj)}>
                Order by date
            </Button>
            <div className="trending">
                
                    {content && content.map((c)=>(
                        <SingleContent key={c.id} c={c} media_type="movie"/>
                        ))
                }
            </div>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
            
        </div>
    )
}

export default Movies;