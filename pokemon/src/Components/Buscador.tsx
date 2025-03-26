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
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            variables: { limit: 20, offset: 1 },
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

        // Extrae todos los tipos de Pokémon y elimina duplicados
        const allTypes = Array.from(new Set(pokemonesConDatos.flatMap((pokemon) => pokemon.types)));
        setTypes(["ninguno", ...allTypes]); // Añade "ninguno" al principio
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

  const handleTypeToggle = (type: string) => {
    let updatedSelectedTypes;
    if (type === "ninguno") {
      updatedSelectedTypes = ["ninguno"];
    } else {
      updatedSelectedTypes = selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes.filter((t) => t !== "ninguno"), type];
    }
    setSelectedTypes(updatedSelectedTypes);

    if (updatedSelectedTypes.includes("ninguno") || updatedSelectedTypes.length === 0) {
      setFilteredPokemones(pokemones);
    } else {
      const filtered = pokemones.filter((pokemon) =>
        updatedSelectedTypes.every((type) => pokemon.types.includes(type))
      );
      setFilteredPokemones(filtered);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 w-full">
      {/* Menú superior */}
      <div className="w-full bg-red-600 py-6 flex flex-col items-center justify-center shadow-lg relative">
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
        <div className="searchPokemon flex flex-col items-center z-10">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Buscar Pokemon"
            className="px-4 py-2 bg-transparent border-b-2 border-red-800 text-white placeholder-red-300 focus:outline-none focus:border-white transition-colors duration-300"
          />
          <button className="button-search mt-4 bg-white border-2 border-red-800 text-red-800 px-4 py-2 rounded-full flex items-center hover:bg-red-800 hover:text-white transition-colors duration-300">
            <span className="mr-2">Buscar</span>
          </button>
          <div className="relative mt-4">
            <button
              onClick={toggleDropdown}
              className="bg-white border-2 border-red-800 text-red-800 px-4 py-2 rounded-full flex items-center hover:bg-red-800 hover:text-white transition-colors duration-300"
            >
              Filtrar por tipo
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 max-h-64 overflow-y-auto shadow-lg animate-fade-in p-2">
                {types.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 px-4 py-2 w-full cursor-pointer bg-white text-gray-800 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="accent-red-600"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content-main flex-grow p-8">
        <div className="pokemons flex flex-wrap justify-center gap-6">
          {filteredPokemones.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="pokemon bg-white border border-gray-200 rounded-lg p-4 flex items-center w-full max-w-md hover:border-red-600 transition-colors duration-300"
            >
              <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24" />
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
