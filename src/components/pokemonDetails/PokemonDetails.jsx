import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
function PokemonDetails() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    weight: "",
    height: "",
    types: [],
  });
  async function downloadPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const types = response.data.types.map((t) => t.type.name);
      console.log(types);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: types,
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  }
  useEffect(() => {
    downloadPokemon();
  }, [id]);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-details-image" src={pokemon.image} alt="" />
      <div className="pokemon-details-name">
        <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-details-name">height : {pokemon.height}</div>
      <div className="pokemon-details-name">weight : {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
    </div>
  );
}
export default PokemonDetails;
