import { HashRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@mui/system';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Home from './Pages/Home/Home';

function App() {
  return (
    <HashRouter>
      <Header></Header>
      <div className="app">
      <Container>
            <Routes>
              <Route path='/' element={<Home/>} exact/>
              <Route path='/trending' element={<Trending/>}/>
              <Route path='/movies' element={<Movies/>}/>
              <Route path='/series' element={<Series/>}/>
              {/* <Route path='/search' element={<Search/>}/> */}
            </Routes>
      </Container>
      </div>
      <SimpleBottomNavigation />
    </HashRouter>
  );
}

export default App;
