import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './Components/Principal'; 
import Buscador from './Components/Buscador'; 
import DetallePokemon from './Components/DetallePokemon'; 
import Plantilla from './Components/Plantilla'; 
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/buscador" element={<Buscador />} />
          <Route path="/detalle" element={<DetallePokemon />} />
          <Route path="/plantilla" element={<Plantilla />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

