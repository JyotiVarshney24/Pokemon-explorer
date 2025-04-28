import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard"; // Importing PokemonCard component
import "./App.css"; // Importing CSS styles

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Used for the search input
  const [selectedType, setSelectedType] = useState(""); // Used for type filtering

  // Fetching Pokémon data from PokeAPI
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();

        // Fetching detailed data for each Pokémon
        const promises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        });

        const results = await Promise.all(promises);
        setPokemonList(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    }

    fetchPokemon(); // Calling the fetch function when the component mounts
  }, []);

  // Filter the Pokémon list based on search term and type filter
  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()); // Search by name
    const matchesType = selectedType === '' || pokemon.types.some(t => t.type.name === selectedType); // Search by type
    return matchesName && matchesType;
  });

  return (
    <div className="App">
      <h1>Pokémon Explorer</h1>

      {/* Search and Type Filter UI */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term dynamically
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)} // Update selected type dynamically
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="ghost">Ghost</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="ground">Ground</option>
          <option value="poison">Poison</option>
          <option value="rock">Rock</option>
          <option value="fighting">Fighting</option>
          <option value="steel">Steel</option>
          <option value="flying">Flying</option>
        </select>
      </div>

      {/* Display Loading or Pokémon Cards */}
      {loading ? (
        <p>Loading Pokémon...</p>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <p>No Pokémon found!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
