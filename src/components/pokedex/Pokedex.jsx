import PokemonList from "../pokemonList/PokemonList";
import Search from "../search/Search";
import "./Pokedex.css";
function Pokedex() {
  return (
    <div className="pokedex-wrapper">
      {/*       <Search /> */}
      <PokemonList />
    </div>
  );
}
export default Pokedex;
