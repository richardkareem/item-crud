import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import PagesNotFound from './Pages/PagesNotFound';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<PagesNotFound />} />
        {/* <Route path='/input' element={<InputForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;
