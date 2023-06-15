import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Catalog from './pages/Catalog.js';
import ProductDetails from './pages/ProductDetails.js';
import Auth from './pages/AuthPage.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
        <Route path="details/:productId" element={<ProductDetails />} />
        <Route path="sign-in" element={<Auth action="sign-in" />} />
        <Route path="sign-up" element={<Auth action="sign-up" />} />
      </Route>
    </Routes>
  );
}
export default App;
