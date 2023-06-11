import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import PagesNotFound from './Pages/PagesNotFound';
import Login from './Pages/Login';
import PrivateRoute from './Component/PrivateRoute';


function App() {
  return (
    <div>
      <Routes>

        <Route path='/' element={<PrivateRoute> <Home /> </PrivateRoute> } />
        <Route path='*' element={<PagesNotFound />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/input' element={<InputForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;
