import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css'
import CustomPagination from "../../components/Pagination/CustomPagination";


const Trending = () =>{

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/week?api_key=9d226837169e45a79056a5040bd49c77&page=${page}`
        )
        const data = await response.json();
        console.log(data)
        setContent(data.results);
    };

    useEffect(()=>{
        fetchTrending();
    },[page])

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {
                    content && content.map((c)=>(
                        <SingleContent key={c.id} c={c} media_type={c.media_type}/>
                        ))
                }
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending;