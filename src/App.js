import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Days from './components/Days';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Days' element={<Days />} />
\        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
