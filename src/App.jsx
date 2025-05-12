import React from 'react';
import Home from './pages/apppp';
import Hom2 from './pages/appp2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/kousouf__5ousouf" exact={true} element={<Hom2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;