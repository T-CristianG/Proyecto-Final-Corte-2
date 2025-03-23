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
  const [search, setSearch] = useState("");
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
    <div className="min-h-screen flex flex-col bg-gray-100 w-full">
      {/* Menú superior */}
      <div className="w-full bg-red-600 py-6 flex flex-col items-center justify-center shadow-lg relative">
        {/* Imagen de Pokédex en el fondo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img
            src="https://www.pngmart.com/files/12/Pokedex-PNG-Transparent-Picture.png"
            alt="Pokédex"
            className="w-64 h-64"
          />
        </div>

        <div className="logo mb-4 z-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Pokémon Logo"
            className="w-48"
          />
        </div>
        <div className="searchPokemon flex items-center z-10">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Buscar Pokemon"
            className="px-4 py-2 bg-transparent border-b-2 border-red-800 text-white placeholder-red-300 focus:outline-none focus:border-white transition-colors duration-300"
          />
          <button className="button-search ml-4 bg-white border-2 border-red-800 text-red-800 px-4 py-2 rounded-full flex items-center hover:bg-red-800 hover:text-white transition-colors duration-300">
            <span className="mr-2">Buscar</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content-main flex-grow p-8">
        <div className="pokemons flex flex-wrap justify-center gap-6">
          {filteredPokemones.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`} // Redirige a la ruta del Pokémon
              className="pokemon bg-white border border-gray-200 rounded-lg p-4 flex items-center w-full max-w-md hover:border-red-600 transition-colors duration-300"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24"
              />
              <div className="pokemon-details ml-4">
                <h2 className="text-2xl font-bold text-red-800">{pokemon.name}</h2>
                <h3 className="species-title text-gray-600">Species</h3>
                <div className="species flex gap-2 mt-2">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        type === "fire"
                          ? "bg-red-500 text-white"
                          : type === "water"
                          ? "bg-blue-500 text-white"
                          : type === "grass"
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buscador;