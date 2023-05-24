import Badge from '@mui/material/Badge';
import { img_300, unavailable } from "../../config/config";
import './SingleContent.css'
import ContentModal from '../ContentModal/ContentModal';


const SingleContent = ({c, media_type}) => {
    return (
        <ContentModal id={c.id} media_type={media_type} c={c}>
            <Badge badgeContent={(c.vote_average).toFixed(1)} color={c.vote_average > 6 ? "primary":"secondary"}/>
            <img className="poster"
                src={c.poster_path  ? `${img_300}/${c.poster_path}` : unavailable}
                alt={c.title} 
            />
           <b className="title">
                {media_type === "tv" ? `${c.name}` : `${c.title}`}
            </b> 
           <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">
                    {c.release_date || c.first_air_date}
                </span>
           </span>
        </ContentModal>
    )
}

export default SingleContent;