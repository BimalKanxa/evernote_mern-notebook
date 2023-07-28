import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {

  return (
    <>
    <NoteState>
    <Router>

    <Navbar></Navbar>
      
    <Alert message ="Success, notes have been deleted"></Alert>
    <div className="container">

<Routes>

    <Route exact path="/" element={<Home/>} />
    <Route exact path="/about" element={<About/>} />
    {/* <Route exact path="/userrs" element={<User/>} /> */}

</Routes>
</div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
