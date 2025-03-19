import React from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './DetallePokemon'; // Importa el componente PokemonCard

const Buscador: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-300 w-full">
      {/* Menú superior */}
      <div 
        className="w-full bg-blue-100 py-4 flex flex-col items-center justify-center shadow-md"
        style={{
          fontFamily: "Bangers", 
          color: 'rgba(0, 0, 255, 0.7)',
          fontSize: '1.5vw',
        }}
      >
        <h2 
          className="text-4xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
          style={{
            fontFamily: "Bangers", 
            color: '#FFEA00', // Color amarillo
            textShadow: '5px 10px 4px rgba(0, 0, 255, 0.7)', // Sombra azul alrededor del texto
            marginBottom: '20px', 
          }}
        >
          BUSCADOR DE POKÉMON
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="ESCRIBE EL NOMBRE DE TU POKÉMON."
            className="px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
            style={{
              fontFamily: "Bangers", 
              fontSize: '1.2vw',
              width: '300px',
            }}
          />
          <button
            className="ml-4 bg-yellow-200 px-6 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-colors"
            style={{
              fontFamily: "Bangers", 
              color: 'rgba(0, 0, 255, 0.7)',
              fontSize: '1.5vw',
            }}
          >
            BUSCAR
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex flex-wrap justify-center p-4 gap-4"> {/* Contenedor flexible */}
        <PokemonCard /> {/* Tarjeta 1 */}
        <PokemonCard /> {/* Tarjeta 2 */}
        <PokemonCard /> {/* Tarjeta 3 */}
      </div>

      {/* Botón para redirigir a Plantilla_poke */}
      <div className="flex justify-center p-4">
        <Link
          to="/plantilla"  // Ruta para Plantilla_poke
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          Ir a Plantilla
        </Link>
      </div>
    </div>
  );
};

export default Buscador;