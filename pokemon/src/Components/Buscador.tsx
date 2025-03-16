import React from 'react';
import DetallePokemon from './DetallePokemon';

interface BuscadorProps {
  setMostrarDetalle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buscador: React.FC<BuscadorProps> = ({ setMostrarDetalle }) => {
  const handleMostrarDetalle = () => {
    setMostrarDetalle(true); // Mostrar DetallePokemon
  };

  return (
    <div>
      <h2>Buscador de Pokémon</h2>
      <button
        onClick={handleMostrarDetalle}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors mt-4"
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default Buscador;



