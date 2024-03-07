import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../pokemon/Pokemon";

function PokemonList() {
  // const [pokemonUrl, setPokemonUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon/"
  // );
  // const [PokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");

  const [pokemonListState, setPokemonListState] = useState({
    PokemonList: [],
    isLoading: true,
    pokemonUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
    // setIsLoading(true);
    setPokemonListState({ ...pokemonListState, isLoading: true });
    const response = await axios.get(pokemonListState.pokemonUrl);
    // console.log(response.data);
    const pokemonResult = response.data.results;
    console.log(response.data);

    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
    const pokemonResultPromise = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    // console.log(pokemonData);
    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    // setPokemonList(result);

    console.log(result);
    // setIsLoading(false);
    setPokemonListState((state) => ({
      ...state,
      PokemonList: result,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokemonUrl]);
  const { isLoading, PokemonList, nextUrl, prevUrl } = pokemonListState;
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : PokemonList.map((p) => {
              return (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              );
            })}
      </div>
      <div className="controls">
        <button
          disabled={prevUrl === null}
          onClick={() => {
            setPokemonListState({
              ...pokemonListState,
              pokemonUrl: pokemonListState.prevUrl,
            });
          }}
        >
          prev
        </button>
        <button
          disabled={nextUrl === null}
          onClick={() => {
            setPokemonListState({
              ...pokemonListState,
              pokemonUrl: pokemonListState.nextUrl,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
