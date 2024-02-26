import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginModal from './pages/Login';
import { useEffect } from 'react';
import Bangkok1 from '../public/Bangkok1.jpg'
import Home from './pages/Home';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<LoginModal />} /> */}

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
export default App
