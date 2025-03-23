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
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <div className="bg-blue-300 flex items-center justify-center p-4">
      <div className="card-container animate-float">
        <div className="card w-64 sm:w-72 rounded-xl overflow-hidden">
          <div className="glow-effect"></div>
          <div className="rainbow-border"></div>
          <div className="relative bg-gradient-to-br from-[#FFEA00] via-[#FFEA00] to-[#FFEA00] p-3 rounded-xl">
            {/* Shine Lines */}
            <div className="shine-lines"></div>
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-bold text-black">{pokemon.name}</h2>
              <div className="flex items-center gap-1">
                <span className="text-black font-bold">HP</span>
                <span className="text-black font-bold">
                  {pokemon.stats.find((stat) => stat.statName === "hp")?.baseStat || "N/A"}
                </span>
              </div>
            </div>

            {/* Card Image */}
            <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-rose-200"></div>
              <div className="absolute inset-0 holo-effect animate-holo-glow"></div>
              <div className="absolute inset-0 card-shine"></div>
              <div className="absolute inset-0 sparkles"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 energy-symbol rounded-full animate-energy-spin opacity-20"></div>
              </div>
              {/* Pokémon Image */}
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image w-full h-full object-cover"
              />
            </div>

            {/* Pokemon Info */}
            <div className="bg-white/90 backdrop-blur rounded-lg p-3 space-y-3">
              {/* Type */}
              <div className="flex items-center gap-2">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
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

              {/* Stats */}
              <div className="space-y-2">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{stat.statName}</span>
                    <span className="text-xs font-bold">{stat.baseStat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-3 text-[10px] text-black/80 text-center italic">
              Hecho por Cristian
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePokemon;