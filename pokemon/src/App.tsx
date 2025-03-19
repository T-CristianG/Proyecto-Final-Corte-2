import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './Components/Principal'; 
import Buscador from './Components/Buscador'; 
import DetallePokemon from './Components/DetallePokemon'; 
import Plantilla_poke from './Components/Plantilla'; // Importa el componente Plantilla_poke
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/buscador" element={<Buscador />} />
          <Route path="/detalle" element={<DetallePokemon />} />
          <Route path="/plantilla" element={<Plantilla_poke />} /> {/* Ruta para Plantilla_poke */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

