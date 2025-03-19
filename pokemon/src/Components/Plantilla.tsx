import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
//import './App.css' (esta en comentario por error que genera)


function Plantilla_poke() {
    
    const [pokemones, setPokemones] = useState([])//estado de los pokemones-->arreglo vacio

    useEffect(() => {
        const getPokemones = async () => {
            //Se recupera el listado de los pokemones
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
            const ListaPokemones = await response.json()
        
            console.log(ListaPokemones)
        }

        getPokemones()
    }, [])// se ejecuta la primera vez

    return (
        <div className="Plantillas">
            <h1>Pokédex</h1>
        </div>
    )
}

export default Plantilla_poke

