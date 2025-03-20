import React, { useEffect, useState } from "react";
import "../App.css";

interface Pokemon {
  name: string;
  image: string;
}

const PlantillaPoke: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemones = async () => {
      try {
        const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            query: `
              query getPokemons {
                pokemon_v2_pokemon(limit: 20, offset: 0) {
                  name
                  id
                  pokemon_v2_pokemonsprites {
                    sprites
                  }
                }
              }
            `,
          }),
        });

        const data = await response.json();

        // Transformar los datos para extraer nombre e imagen
        const pokemonesConImagen: Pokemon[] = data.data.pokemon_v2_pokemon.map((pokemon: any) => {
          let spriteUrl = "https://via.placeholder.com/96"; // Imagen por defecto

          if (
            pokemon.pokemon_v2_pokemonsprites.length > 0 &&
            pokemon.pokemon_v2_pokemonsprites[0].sprites
          ) {
            try {
              const spritesJSON = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);
              if (spritesJSON.front_default) {
                spriteUrl = spritesJSON.front_default;
              }
            } catch (error) {
              console.error("Error al parsear JSON de sprites:", error);
            }
          }

          return {
            name: pokemon.name,
            image: spriteUrl,
          };
        });

        setPokemones(pokemonesConImagen);
      } catch (error) {
        console.error("Error al obtener los pokemones:", error);
      }
    };

    getPokemones();
  }, []);

  return (
    <div className="Plantillas">
      <h1>Pokédex</h1>
      <ul>
        {pokemones.map((pokemon, index) => (
          <li key={index}>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: "96px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlantillaPoke;
