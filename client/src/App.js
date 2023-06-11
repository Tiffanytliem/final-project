import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Catalog from './pages/Catalog.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
      </Route>
    </Routes>
  );
}
export default App;
