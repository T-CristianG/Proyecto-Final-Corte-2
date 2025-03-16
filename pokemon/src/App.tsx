import React, { useState } from 'react';
import DetallePokemon from './Components/DetallePokemon';
import './index.css';

const App: React.FC = () => {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const toggleDetalle = () => {
    setMostrarDetalle(!mostrarDetalle);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Botón para mostrar/ocultar detalles */}
      <button
        onClick={toggleDetalle}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        {mostrarDetalle ? 'Ocultar Detalles' : 'Mostrar Detalles'}
      </button>

      {/* Mostrar el componente DetallePokemon si mostrarDetalle es true */}
      {mostrarDetalle && <DetallePokemon />}
    </div>
  );
};

export default App;