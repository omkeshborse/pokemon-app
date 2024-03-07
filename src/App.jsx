import Pokedex from "./components/pokedex/Pokedex";
import CustomRoutes from "./routes/CustomRoutes.jsx";
import "./App.css";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="outer-pokedex">
      <Link to="/">
        <h1 id="pokedex-heading">Pokedex</h1>
      </Link>
      <CustomRoutes />
    </div>
  );
}
export default App;
