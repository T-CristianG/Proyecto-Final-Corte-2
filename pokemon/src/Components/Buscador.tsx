import React from 'react';
import { Link } from 'react-router-dom';

const Buscador: React.FC = () => {
  return (
    <div>
      <h2>Buscador de Pokémon</h2>
      {/* Link de React Router para navegar a la página de DetallePokemon */}
      <Link
        to="/detalle"  // Ruta para la página DetallePokemon
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors mt-4"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default Buscador;


