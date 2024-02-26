import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginModal from './pages/Login';
import { useEffect } from 'react';
import Home from './pages/Home';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute />} >
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<LoginModal />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
export default App
