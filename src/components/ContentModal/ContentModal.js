import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import './ContentModal.css'
import Carousel from './Carousel/Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: '#39445a',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  color:'white',
};

export default function ContentModal({children, media_type, id, keyword}) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [video, setVideo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const fetchData = async() => {
    const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=9d226837169e45a79056a5040bd49c77&language=en-US`
    )
    const data = await response.json();
    setContent(data);
};

const fetchVideo = async() => {
    const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=9d226837169e45a79056a5040bd49c77&language=en-US`
    )
    const data = await response.json();
    console.log(data);
    setVideo(data.results[0]?.key);
};

React.useEffect(()=>{
    fetchData();
    fetchVideo();
},[])


  return (
    <>
      <div onClick={handleOpen} className={keyword == "da"? "homefilm" : "media"}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content &&(<div className='ContentModal'>
                <img className='ContentModal_portrait' 
                    alt={content.name || content.title}
                    src={content.poster_path
                        ? `${img_500}/${content.poster_path}` 
                        : unavailable} 
                />
                <img className='ContentModal_landscape' 
                    alt={content.name || content.title}
                    src={content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}` 
                        : unavailableLandscape} 
                />
                <div className='ContentModal_about'>
                    <span className='ContentModal_title'> 
                        {content.name || content.title} (
                            {(
                                content.first_air_date ||
                                content.release_date ||
                                "-----"
                            ).substring(0,4)}
                        )
                    </span>
                    {content.tagline && (
                        <i className='tagline'>{content.tagline}</i>
                    )}
                    <span className='ContentModal_description'> 
                        {content.overview}
                    </span>
                    <div>
                        <Carousel id={id} media_type={media_type}/>
                    </div>
                    <Button
                        variant="contained"
                        startIcon={<YouTubeIcon/>}
                        color='secondary'
                        target="_blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                    >
                        Watch the Trailer
                    </Button>
                </div>
            </div>)}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
