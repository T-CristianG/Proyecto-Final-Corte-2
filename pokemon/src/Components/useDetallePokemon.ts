import { useEffect, useState } from "react";
import "./App.css";

function useDetallePokemon(){
    const [pokemones, setPokemones] = useState([])//arreglo vacio

    
    useEffect(()=>{
        const getPokemones = () => {

            const response = fetch('')
        }

        getPokemones()
    }, [])

    return (
      <div className="App">
        <h1>Pokédex</h1>
       </div>  
    );
}

