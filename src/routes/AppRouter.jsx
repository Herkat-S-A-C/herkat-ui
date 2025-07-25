// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DetalleItem from '../pages/DetailItem';
import Catalog from '../pages/Catalog';
/*
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

<Route path="/login" element={<Login />} />
<Route path="*" element={<NotFound />} />
*/ 
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo/:tipo" element={<Catalog />} />
        <Route path="/detalle/:id" element={<DetalleItem />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
