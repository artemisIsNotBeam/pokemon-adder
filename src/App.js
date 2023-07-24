import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [pokemons,setPokemons] = useState([]);

  const clicked = async () => {
    let pokemonName = document.getElementById("name").value;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (promise.status === 404){
      alert("Not Found!");
    } else{
      const result = await promise.json();
      setPokemons((prevPokemons)=>{
        return [...prevPokemons, result];
      });
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Pokemon Team</h1>
      <input type="text" id="name" placeholder='search a pokemon'></input>
      <button id="search" onClick={clicked.bind(this)}>Search</button>

      {
        <div id="pokemonTeam">
          {pokemons.map((pokemon,index) => (
            <PokemonCard key= {index} image={pokemon.sprites.front_default} name={pokemon.name} number={pokemon.id} />
          ))}
        </div>
      }
    </div>
  );
}

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="pokemonCard">
        <img src={this.props.image} />
        <h1>{this.props.name}</h1>
        <h2>{this.props.number}</h2>
      </div>
    );
  }
}

export default App;
