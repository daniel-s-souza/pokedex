const poke_container = document.getElementById('poke-container');
const pokemonNumber = 150;
const typeColors = {
  fire: '#ff0000',
  grass: '#6b8e23',
  electric: "#fafad2",
  water: '#87cefa',
  ground: '#deb887',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#800080',
  bug: '#808000',
  dragon: '#ffa500',
  psychic: '#ff00ff',
  flying: '#add8e6',
  fighting: '#8b0000',
  normal: '#F5F5F5',
};

const main_types = Object.keys(typeColors);
// console.log(main_types);

const fetchPokemons = async () => {
  for(let i = 1; i <= pokemonNumber; i += 1) {
    await getPokemon(i);
  }
}

const getPokemon = async (id) => {
  const promise = ` https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(promise);
    const pokemon = await response.json();
    // console.log(pokemon)
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
  const element = document.createElement('div');
  element.classList.add('pokemon');

  const pokeTypes = pokemon.types.map(elementType => elementType.type.name);
  const type = main_types.find(type => pokeTypes.indexOf(type) > - 1
  );

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = typeColors[type];

  element.style.backgroundColor = color;
  const pokeInnerHtml = `
    <div class= "img-container"><img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png>
    </div>
      <div class= "info">
          <span class= "number">#${ pokemon.id.toString().padStart(3,'0') }</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type:<span>${type}</span></small>
        </div>
    `;
  element.innerHTML = pokeInnerHtml;
  poke_container.appendChild(element);
}