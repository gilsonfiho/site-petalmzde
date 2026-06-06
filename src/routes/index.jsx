import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Produtos from '../pages/Produtos';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
