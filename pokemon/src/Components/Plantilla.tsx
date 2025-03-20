import React, { useEffect, useState } from "react";
import "../App.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  shinyImage: string;
  stats: { baseStat: number; statName: string }[];
  types: string[];
}

const PlantillaPoke: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.data || !data.data.pokemon) {
          throw new Error("Datos de la API no válidos");
        }

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
      } catch (error) {
        console.error("Error al obtener los pokemones:", error);
        setError("Error al cargar los datos de Pokémon");
      } finally {
        setLoading(false);
      }
    };

    getPokemones();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Plantillas">
      <h1>Pokédex</h1>
      <ul>
        {pokemones.map((pokemon) => (
          <li key={pokemon.id}>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: "96px" }} />
            <img src={pokemon.shinyImage} alt={`${pokemon.name} shiny`} style={{ width: "96px" }} />
            <p>Tipos: {pokemon.types.join(", ")}</p>
            <ul>
              {pokemon.stats.map((stat, index) => (
                <li key={index}>
                  {stat.statName}: {stat.baseStat}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantillaPoke;
