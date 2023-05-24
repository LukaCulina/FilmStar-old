import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../App.css'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Box from '@mui/material/Box';

const Search = () =>{
const [type, setType] = useState(0);
const [page, setPage] = useState(1);
const [searchText, setSearchText] = useState("")
const [content, setContent] = useState()
const [numOfPages, setnumOfPages] = useState();

const darkTheme=createTheme({
    palette:{
        mode:"dark",
        primary:{
            main: "#fff",
        },
    },  
})

const fetchSearch = async() => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=9d226837169e45a79056a5040bd49c77&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        )
    const data = await response.json();
    console.log(data)
    console.log(response)
    console.log("hi")
    data.length !=0 ? setContent(data.results):setContent(0)
    /* setContent(data.results); */
    setnumOfPages(data.total_pages);
};  

const EnterKeyPress = (event) => {
    if (event.key === "Enter") {
        fetchSearch(searchText);
    }
  };  
  const isMounted = useRef(false);

    useEffect(()=>{
        if (isMounted.current == true) {
            window.scroll(0,0);
            fetchSearch();
        } else {
            isMounted.current = true;
        } 
    },[type, page])

    return (
        <div className='container'>
            <ThemeProvider theme={darkTheme}>
                 <div style={{display:"flex", margin:"15px 0"}}>
                    <TextField
                        style={{flex: 1}}
                        className='searchBox'
                        label="Search"
                        variant="outlined"
                        onChange={(e)=> setSearchText(e.target.value)}
                        onKeyDown={EnterKeyPress}
                    >
                    {/* <Button variant='contained' style={{marginLeft:10}} onClick={fetchSearch}>
                        <SearchIcon/>
                    </Button> */}
                    </TextField>  
                </div> 
                <Box sx={{ width: '100%'}}>
                        <Tabs 
                            centered
                            value={type} 
                            indicatorColor="primary" 
                            textColor="primary" 
                            style={{width: "100%", paddingBottom:5}}
                            onChange={(event,newValue) =>{
                                setType(newValue);
                                setPage(1);
                            }}
                            >
                            <Tab  style={{width: "50%" }}label="Search Movies" />
                            <Tab  style={{width: "50%" }}label="Search TV Series" />
                        </Tabs>
                    </Box>
            </ThemeProvider>
            <div className="trending">
                {
                    content && content.map((c)=>(
                        <SingleContent key={c.id} c={c} media_type={type ? "tv" : "movie"}/>
                        ))
                }
                {/* {searchText && !content && (type ? <h2>No Series Found</h2>: <h2>No Movie Found</h2>)} */}
                {/* while (searchText && content.length==0 ){<h2>No Results Found</h2>}  */}
                {searchText && content==0 && <h2>No Results Found</h2>}
            </div>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
           
        </div>
        )
}
export default Search;