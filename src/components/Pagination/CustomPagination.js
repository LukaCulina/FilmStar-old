import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const darkTheme=createTheme({
    palette:{
        mode:"dark",
        primary:{
            main: "#fff",
        },
    },  
})

const CustomPagination = ({setPage, numOfPages = 10}) => {
    const handlePageChange  = (page) =>{
        setPage(page);
        window.scroll(0, 0);
    }

    return ( 
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            color:"white !important",
        }}
        >
            <ThemeProvider theme={darkTheme}/>
            <Pagination 
                count={numOfPages} 
                onChange={(e) => handlePageChange(e.target.textContent)}
                color="secondary"
                hideNextButton
                hidePrevButton
                />
            </div>
    );
}
 
export default CustomPagination;