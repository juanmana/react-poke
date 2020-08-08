import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'


function App(){

const  [pokedex, setPokedex] = useState([])
const [wildPoke, setWildPoke] = useState({});

useEffect(() => {
  
  encounterWildPoke()
  
}, [])





const pokeId = ()=>{

const min = Math.ceil(1);
const max = Math.floor(155);
return Math.floor(Math.random() * (max-min + 1)) + min 
}

const encounterWildPoke = ()=>{

axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
.then(response =>{
  setWildPoke(response.data)
})


}

const catchPokemon = (pokemon) => {
  setPokedex(state => {
    const monExists = (state.filter(p => pokemon.id == p.id).length > 0);

    if (!monExists) {
      state = [...state, pokemon]
      state.sort(function (a, b) {
        return a.id - b.id
      })
    }
    return state
  })
  encounterWildPoke()
}


const releasePoke = (id)=>{


  setPokedex(state=> state.filter(p=>p.id!= id))
}



  return(
    <div className="app-wrapper">

      <header> 
         
         <h1 className="title">React hooks</h1>
         <h1 className="subtitle">With Pokemon</h1>




      </header>

      <section className="wild-pokemon">


           <h2>Wild Encounter</h2>
           <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + wildPoke.id + '.png'} className='sprite'/>


<h3>{wildPoke.name}</h3>

<button className="catch-btn" onClick={()=> catchPokemon(wildPoke)}>CATCH</button>
      </section>

<section className='pokedex'>



  <h2>Pokedex</h2>
  <div className='pokedex-list'>



    {pokedex.map(pokemon => (
    
    <div className="pokemon" key={pokemon.id}>

      <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'} className='sprite'/>

        <h3 className="pokemon-name">{pokemon.name}</h3>
        <button className='remove' onClick={()=> releasePoke(pokemon.id)}>x</button>

      </div>
    
    ))}
  </div>
</section>




      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));