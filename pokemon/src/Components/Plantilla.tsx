import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Plantilla_poke() {
  const [pokemones, setPokemones] = useState([]); // Estado inicial->arreglo vacío

  useEffect(() => {
    const getPokemones = async () => {
      // Se recupera el listado de los pokemones
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      const ListaPokemones = await response.json();
      setPokemones(ListaPokemones.results); // Actualiza el estado con los pokemones
    };

    getPokemones(); // Llama la función al montarse el componente
  }, []); // Dependencia vacía para que se ejecute solo una vez

  return (      
    <div className="Plantillas">
      <h1>Pokédex</h1>
    </div>
  );
}

export default Plantilla_poke;
