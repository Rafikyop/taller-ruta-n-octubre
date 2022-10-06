import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [characters, setCharacters] = useState([])

  async function getAllCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const characters = await response.json()
    setCharacters(characters.results)
  }

  function killAllCharacters() {
    console.log('Matar a todos los personajes')
    const killedCharacters = [ ...characters ]
    killedCharacters.forEach(character => character.status = 'Dead')
    setCharacters(killedCharacters)
  }

  useEffect(() => {
    getAllCharacters()
  }, [])

  return (
    <section className="main">
      <h1 className="title">Rick and Morty</h1>
      <p className="description">Esta es una lista de los personajes de Rick and Morty</p>
      <button
        className="button"
        onClick={killAllCharacters}
      >
        Matar todos los personajes
      </button>
      <section className="grid">
        {characters?.map(character => (
          <div className="card">
            <img
              className="image"
              src={character.image}
              alt={character.name}
              width="380px"
              height="380px"
            />
            <h2 className="name">{character.name}</h2>
            <div className="info">
              <span className={`status ${
                character.status !== 'Alive' ? 'red-status' : ''
              }`} />
              <span className="text">{character.status} - {character.species}</span>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default App;
