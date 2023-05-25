import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import HomeIcon from '@mui/icons-material/Home';

import "./MainNav.css";
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
   const [value, setValue] = React.useState(0);
   const navigate = useNavigate();
    React.useEffect(() => {
        if(value === 0){
            navigate("/");
            window.scroll(0, 0);
        } 
        else if(value === 1) {
            navigate("/trending");
            window.scroll(0, 0);
        }
        else if(value === 2) {
            navigate("/movies");
            window.scroll(0, 0);
        }
        else if(value === 3) {
            navigate("/series");
            window.scroll(0, 0);
        }
        /* else if(value === 4) {
            navigate("/search");
        } */
    },[value])

    return (
        <Box sx={{ width: 500 }}>
        <BottomNavigation className='bottomnav'
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction 
                style={{color:"white"}} 
                label="Home" 
                icon={<HomeIcon />} 
            />
            <BottomNavigationAction 
                style={{color:"white"}} 
                label="Trending" 
                icon={<WhatshotIcon />} 
            />
            <BottomNavigationAction 
                style={{color:"white"}} 
                label="Movies" 
                icon={<MovieIcon />} 
            />
                <BottomNavigationAction 
                style={{color:"white"}} 
                label="TV Series" 
                icon={<TvIcon />} 
            />
            {/* <BottomNavigationAction 
                style={{color:"white"}} 
                label="Search" 
                icon={<SearchIcon />} 
            /> */}
        </BottomNavigation>
        </Box>
  );
}