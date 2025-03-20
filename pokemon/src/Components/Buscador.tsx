import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  shinyImage: string;
  stats: { baseStat: number; statName: string }[];
  types: string[];
}

const Buscador: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState(""); // Controla el texto del buscador
  const [filteredPokemones, setFilteredPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemones = async () => {
      try {
        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query PokemonList($limit: Int, $offset: Int) {
                pokemon: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
                  id
                  name
                  sprites: pokemon_v2_pokemonsprites {
                    front: sprites(path: "front_default")
                    shiny: sprites(path: "front_shiny")
                  }
                  stats: pokemon_v2_pokemonstats {
                    baseStat: base_stat
                    stat: pokemon_v2_stat {
                      name
                    }
                  }
                  types: pokemon_v2_pokemontypes {
                    type: pokemon_v2_type {
                      name
                    }
                  }
                }
              }
            `,
            variables: {
              limit: 20,
              offset: 1,
            },
          }),
        });

        const data = await response.json();

        const pokemonesConDatos: Pokemon[] = data.data.pokemon.map((pokemon: any) => {
          const frontSprite = pokemon.sprites[0]?.front || "https://via.placeholder.com/96";
          const shinySprite = pokemon.sprites[0]?.shiny || "https://via.placeholder.com/96";

          const stats = pokemon.stats.map((stat: any) => ({
            baseStat: stat.baseStat,
            statName: stat.stat.name,
          }));

          const types = pokemon.types.map((type: any) => type.type.name);

          return {
            id: pokemon.id,
            name: pokemon.name,
            image: frontSprite,
            shinyImage: shinySprite,
            stats,
            types,
          };
        });

        setPokemones(pokemonesConDatos);
        setFilteredPokemones(pokemonesConDatos);
      } catch (error) {
        console.error("Error al obtener los pokemones:", error);
      }
    };

    getPokemones();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = pokemones.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value)
    );
    setFilteredPokemones(filtered);
  };

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
            color: '#FFEA00',
            textShadow: '5px 10px 4px rgba(0, 0, 255, 0.7)',
            marginBottom: '20px', 
          }}
        >
          BUSCADOR DE POKÉMON
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch} // Filtra mientras escribes
            placeholder="ESCRIBE EL NOMBRE DE TU POKÉMON."
            className="px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
            style={{
              fontFamily: "Bangers", 
              fontSize: '1.2vw',
              width: '300px',
            }}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex flex-wrap justify-center p-4 gap-4">
        {filteredPokemones.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center w-64"
          >
            <p className="font-bold text-lg">{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: "96px" }} />
            <p>Tipos: {pokemon.types.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buscador;
