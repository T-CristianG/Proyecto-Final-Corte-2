import React from 'react';
import { Link } from 'react-router-dom';

const Principal: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 w-full">
      <h1
        className="text-6xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
        style={{
          fontFamily: "Bangers", 
          color: '#FFEA00', // Color amarillo
          textShadow: '5px 10px 4px rgba(0, 0, 255, 0.7)', // Sombra azul alrededor del texto
          height: '25vh', 
          display: 'flex',
          fontSize: '10vw',
        }}
      >
        Pokédex
      </h1>
      <p
        style={{
          fontFamily: "Bangers", 
          color:'rgba(0, 0, 255, 0.7)',
          fontSize: '1vw',
        }}
      >
        Hola profesor Willow, su base de datos está completa
      </p>
      <Link
        to="/buscador"  // Define el destino de la ruta
        className="bg-blue-100  px-6 py-2 rounded-lg shadow-md hover:bg-yellow-200 transition-colors mt-4"
      >
        PokéList
      </Link>
      <img 
        src=".\public\hero-img.png" 
        alt="Pokédex Logo" 
      />
      {/* Usamos Link de React Router para navegar */}
      
    </div>
  );
};

export default Principal;
