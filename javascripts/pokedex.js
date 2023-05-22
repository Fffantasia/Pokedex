let pokemon_input = document.getElementById('pokemon_input');
let pokemon_input_btn = document.getElementById('pokemon_input_btn');
let pokemon_next_btn = document.getElementById('pokedex-btn-next');
let pokemon_prev_btn = document.getElementById('pokedex-btn-prev');
let pokemon_screen_container = document.getElementById('pokedex_screen_container');
let pokemon_stats_container = document.getElementById('pokedex_info_container');
let id = 0;
pokemon_input_btn.onclick = () => {
    id = pokemon_input.value
    let path = `https://pokeapi.co/api/v2/pokemon/${id}`
    petition(path)
};

pokemon_next_btn.onclick = () => {
    if (id > 0 && id < 1010){
    id = parseInt(id)
    id += 1
    let path = `https://pokeapi.co/api/v2/pokemon/${id}`
    petition(path)
}};

pokemon_prev_btn.onclick = () => {
    if (id > 1 && id < 1011){
    id = parseInt(id)
    id -= 1
    let path = `https://pokeapi.co/api/v2/pokemon/${id}`
    petition(path)
}};

function petition(path){
    fetch(path)
    .then(response => response.json())
    .then(data => {
        let img_pokemon = data.sprites.front_default;
        let name_pokemon = data.name.toUpperCase();
        let hp = data.stats[0].base_stat;
        let att = data.stats[1].base_stat;
        let def = data.stats[2].base_stat;
        let satt = data.stats[3].base_stat;
        let sdef = data.stats[4].base_stat;
        let spd = data.stats[5].base_stat;
        let type1 = data.types[0].type.name.toUpperCase();
        let type;
        let ability1 = data.abilities[0].ability.name.toUpperCase();
        let ability;
        if (data.types.length == 2){
            let type2 = data.types[1].type.name.toUpperCase();
            type = type1 + "/" + type2;
        }else{
            type = type1;
        }
        if (data.abilities.length == 2){
            let ability2 = data.abilities[1].ability.name.toUpperCase();
            ability = ability1 + "/" + ability2;
        }else{
            ability = ability1;
        }
        showPokemon(img_pokemon, name_pokemon, ability, hp, att, def, satt, sdef, spd, type);
    })
};

function showPokemon(img, name, ability, hp, att, def, satt, sdef, spd, type){
    let num = ('000' + id).slice(-4)
    let divI = document.createElement('div')
    let divT = document.createElement('div')
    pokemon_screen_container.innerHTML = ""
    pokemon_screen_container.appendChild(divI)
    pokemon_stats_container.innerHTML = ""
    pokemon_stats_container.appendChild(divT)
    divI.innerHTML = `<img src="${img}" class="poke_img">`
    divT.innerHTML = `<p>${name} Nº.${num}<br><br>TYPE: ${type}<br>ABILITY: ${ability}<br><br>HP: ${hp}<br>ATT: ${att}<br>DEF: ${def}<br>SATT: ${satt}<br>SDEF: ${sdef}<br>SPD: ${spd}</p>`
};

//Centrar pokédex - ¿Pantalla incial?