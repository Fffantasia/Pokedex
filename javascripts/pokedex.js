let container_img = document.getElementById('pokedex_screen_container')
let container_data = document.getElementById('pokedex_info_container')
let input_pokemon = document.getElementById('pokemon_input')
let btn_pokemon = document.getElementById('pokemon_input_btn')
let next_btn = document.getElementById('pokedex-btn-next')
let prev_btn = document.getElementById('pokedex-btn-prev')
let home_btn = document.getElementById('pokedex-btn-home')

var div_img;
var div_data;
var id = 0;

console.log(next_btn);

btn_pokemon.onclick = () => {
  let pokemon_value = input_pokemon.value
  let pokemon_path = `https://pokeapi.co/api/v2/pokemon/${pokemon_value}`
  request(pokemon_path)
}

next_btn.onclick = () => {
  if (id == 0) {
    id = id + 1
    pokemon_path = `https://pokeapi.co/api/v2/pokemon/${id}`
    request(pokemon_path)
  } else {
    id = id + 1;
    pokemon_path = `https://pokeapi.co/api/v2/pokemon/${id}`
    request(pokemon_path)
  }
}

home_btn.onclick = () => {
  container_img.removeChild(div_img)
  container_data.removeChild(div_data)
  id = 0;
}

prev_btn.onclick = () => {
  if (id > 0) {
    id = id - 1;
    pokemon_path = `https://pokeapi.co/api/v2/pokemon/${id}`
    request(pokemon_path)
  }
}



function request(path) {
  fetch(path)
    .then(response => response.json())
    .then(data => {
      print(data, container_img, container_data)

      id = data.id
    })  
           
}

function print(obj, container_img, container_data) {
  if (container_img.childNodes.length > 1) {
    container_img.removeChild(div_img)
    container_data.removeChild(div_data)
  }

  div_img = document.createElement('div');
  div_data = document.createElement('div')


  container_img.appendChild(div_img);
  container_data.appendChild(div_data);


  div_img.innerHTML = `<img src="${obj.sprites.front_default}" class="poke_img" "alt="">`
  div_data.innerHTML = `<div class="${obj.id} text_data">
    Nombre: ${obj.name}<br>
    Pokemon nº: ${obj.id}<br>
    Tipo: ${obj.types[0].type.name}<br>
    Ataque: ${obj.stats[1].base_stat}<br>
    Defensa: ${obj.stats[2].base_stat}<br>
    Vitalidad: ${obj.stats[0].base_stat}<br>
    Velocidad: ${obj.stats[5].base_stat}<br>
  </div>`
}


