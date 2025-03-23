import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats: { baseStat: number; statName: string }[];
}

const DetallePokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(2); // Contador de 2 segundos

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query PokemonDetail($id: Int!) {
                pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
                  id
                  name
                  height
                  weight
                  sprites: pokemon_v2_pokemonsprites {
                    front: sprites(path: "front_default")
                  }
                  types: pokemon_v2_pokemontypes {
                    type: pokemon_v2_type {
                      name
                    }
                  }
                  stats: pokemon_v2_pokemonstats {
                    baseStat: base_stat
                    stat: pokemon_v2_stat {
                      name
                    }
                  }
                }
              }
            `,
            variables: { id: parseInt(id || "1") },
          }),
        });

        const { data } = await response.json();
        const pokemonData = data.pokemon;

        // Simulamos una espera de 2 segundos antes de mostrar los datos
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          setPokemon({
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites[0]?.front || "https://via.placeholder.com/96",
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map((type: any) => type.type.name),
            stats: pokemonData.stats.map((stat: any) => ({
              baseStat: stat.baseStat,
              statName: stat.stat.name,
            })),
          });
          setLoading(false);
        }, 1000); // 2 segundos de espera
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-press-start text-red-600 animate-pulse">
            Loading...
          </h1>
          <p className="text-2xl font-press-start text-gray-700 mt-4">
            Tiempo restante: {countdown} segundos
          </p>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-press-start text-red-600">
          Pokémon no encontrado
        </h1>
      </div>
    );
  }

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
      </div>

      {/* Contenido principal */}
      <div className="content-main flex-grow p-8">
        <div className="pokemon bg-white border border-gray-200 rounded-lg p-4 flex items-center w-full max-w-md mx-auto hover:border-red-600 transition-colors duration-300">
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
            <div className="mt-4">
              <p><strong>Height:</strong> {pokemon.height}</p>
              <p><strong>Weight:</strong> {pokemon.weight}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-red-800">Stats</h3>
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm font-semibold">{stat.statName}</span>
                  <span className="text-sm font-bold">{stat.baseStat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePokemon;