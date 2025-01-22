import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DisplayPage from './components/DisplayPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/display" element={<DisplayPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
