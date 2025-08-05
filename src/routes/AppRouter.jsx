// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DetalleItem from '../pages/DetailItem';
import Catalog from '../pages/Catalog';
import Login from '../pages/Login';
import AdminPage from '../pages/admin/adminPages';
/*
import NotFound from '../pages/NotFound';

<Route path="*" element={<NotFound />} />
*/ 
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo/:type" element={<Catalog />} />
        <Route path="/detalle/:id" element={<DetalleItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
