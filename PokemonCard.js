import React from 'react';
import './PokemonCard.css'; // Import specific CSS for the card component

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      {/* Display Pokémon Image */}
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      
      {/* Display Pokémon Name */}
      <h2>{pokemon.name}</h2>
      
      {/* Display Pokémon ID */}
      <p className="pokemon-id">ID: {pokemon.id}</p> {/* This will show the ID */}
      
      {/* Display Pokémon Types */}
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type.type.name} className={`type ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
