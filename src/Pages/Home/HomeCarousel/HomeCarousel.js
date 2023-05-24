import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../../config/config';
import { useEffect, useState } from "react";
import './HomeCarousel.css'
import ContentModal from '../../../components/ContentModal/ContentModal';

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = ({name, genre}) => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = async() => {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie/?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genre}`,
            {
                mode: 'no-cors'
           }
        )
        console.log(response)
        const data = await response.json();
        console.log(data)
        setContent(data.results);
    };  
        
    useEffect(()=>{
        fetchData();
    },[])

    const items = content?.map((c) =>(
        <ContentModal id={c.id} media_type="movie" keyword="da" c={c}>
            <div className='carouselItem'>
                <img 
                src={c.poster_path ? `${img_300}/${c.poster_path}`:noPicture} 
                alt={c?.name} 
                onDragStart={handleDragStart}
                className='carouselItem_img'
                />
                <b className='carouselItem_txt'>
                    {c?.title}
                </b>
            </div>
        </ContentModal>))

    const responsive ={
    0: {
        items:3,
    },
    512: {
        items:5,
    },
    1024: {
        items:7,
    },
    }

    return (
        <div className='tray'>
            <div className='genre'>
                {name}
            </div>
            <AliceCarousel  
                autoPlay
                animationDuration={2000}
                responsive={responsive} 
                infinite
                disableDotsControls
                disableButtonsControls
                mouseTracking 
                items={items}> 
            </AliceCarousel>
        </div>
    );
}
export default HomeCarousel;

