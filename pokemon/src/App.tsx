import React, { useState } from 'react';
import Buscador from './Components/Buscador'; 
import Principal from './Components/Principal'; 
import DetallePokemon from './Components/DetallePokemon'; // Asegúrate de importar DetallePokemon correctamente
import './index.css';

const App: React.FC = () => {
  const [mostrarPrincipal, setMostrarPrincipal] = useState(true);  // Mostrar principal
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  // Esta función cambia a la página de Buscador
  const handleIrAlBuscador = () => {
    setMostrarPrincipal(false);  // Ocultar la página principal
    setMostrarBuscador(true);  // Mostrar el Buscador
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
      {/* Si se debe mostrar la página de Inicio */}
      {mostrarPrincipal && (
        <>
          <Principal />
          <button
            onClick={handleIrAlBuscador}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors mt-4"
          >
            Buscador de Pokémon
          </button>
        </>
      )}

      {/* Si se debe mostrar la página del Buscador */}
      {mostrarBuscador && (
        <>
          <Buscador setMostrarDetalle={setMostrarDetalle} />
          {mostrarDetalle && (
            <div>
              <DetallePokemon />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;



