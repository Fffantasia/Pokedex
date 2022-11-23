let container_img = document.getElementById('pokedex_screen_container')
let container_data = document.getElementById('pokedex_info_container')
let search_input = document.getElementById('pokemon_input')
let btn_search = document.getElementById('pokemon_input_btn')
let btn_next = document.getElementById('pokedex-btn-next')
let btn_prev = document.getElementById('pokedex-btn-prev')
let btn_home = document.getElementById('pokedex-btn-home')

var div_img;
var div_data;
var id = 0;

btn_next.onclick = () => {
  if (id == 905) {
    id = 0;
  } else {
    id = id + 1;
    let id_path = `https://pokeapi.co/api/v2/pokemon/${id}`
    peticion(id_path)
  }
}

btn_prev.onclick = () => {
  if (id > 0) {
    id = id - 1;
    let id_path = `https://pokeapi.co/api/v2/pokemon/${id}`
    peticion(id_path)
  }
}


btn_search.onclick = () => {
  let pokemon_value = search_input.value
  let path_pokemon = `https://pokeapi.co/api/v2/pokemon/${pokemon_value}`
  peticion(path_pokemon)
}

function peticion(path) {
  fetch(path)
    .then(response => response.json())
    .then(data_pokemon => {
      console.log(data_pokemon);
      id = data_pokemon.id
      print(data_pokemon, container_img, container_data)
    })
}

function print(obj, container_img, container_data) {

  if (container_img.childNodes.length > 1) {
    container_img.removeChild(div_img)
    container_data.removeChild(div_data)
  }

  div_img = document.createElement('div');
  div_data = document.createElement('div');

  container_img.appendChild(div_img);
  container_data.appendChild(div_data);

  div_img.innerHTML = `<img src="${obj.sprites.front_default} " alt="">`
  div_data.innerHTML = `
    <p>${obj.name}</p>
    <p> id: ${obj.id}</p>
  `

  let stats = obj.stats

  stats.forEach(el => {
    let p = document.createElement('p');
    div_data.appendChild(p);

    p.innerHTML = `
      
      ${el.stat.name}: ${el.base_stat}
    `
  })
}