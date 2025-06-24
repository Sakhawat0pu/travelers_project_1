const params = new URLSearchParams(window.location.search);
const id = params.get('id')

function getFilmData(id){
    if (id){
        const url = `http://localhost:9001/api/films/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showFilmData(data))
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        })
    }
    else{
        alert("Something went wrong!")
    }
}

function getCharacterData(id){
    if(id){
        const url = `http://localhost:9001/api/films/${id}/characters`;
        fetch(url)
        .then(res => res.json())
        .then(data => showCharacters(data))
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        })
    }
    else{
        alert("Something went wrong!")
    }
}

function getPlanetData(id){
    if(id){
        const url = `http://localhost:9001/api/films/${id}/planets`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPlanets(data))
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        })
    }
    else{
        alert("Something went wrong!")
    }
}


function showFilmData(data){
    const filmDiv = document.getElementById("film-details");
    filmDiv.innerHTML = `
    <h1 id="film-title">${data.title}</h1>
    <div id="film-info">
        <p>Released: <b>${data.release_date}</b></p>
        <p>Director: <b>${data.director}</b></p>
        <p>Episode: <b>${data.episode_id}</b></p>
    </div>
    `
}

function showCharacters(data){
    const charDiv = document.getElementById("character-details")
    const h1 = document.createElement('h1');
    h1.innerText = "Characters";
    charDiv.appendChild(h1);

    const characterContainer = document.createElement("div");
    characterContainer.setAttribute("id", "char-container")
    data.forEach(character => {
        const h3 = document.createElement('h3');
        h3.innerText = character.name;
        h3.onclick = () => {
            window.location.href = `character.html?id=${character.id}`
        }
        characterContainer.appendChild(h3);
    });
    charDiv.appendChild(characterContainer)
}

function showPlanets(data){
    const planetDiv = document.getElementById("planet-details")
    const h1 = document.createElement('h1');
    h1.innerText = "Planets";
    planetDiv.appendChild(h1);

    const planetContainer = document.createElement("div");
    planetContainer.setAttribute("id", "planet-container")
    data.forEach(planet => {
        const h3 = document.createElement('h3');
        h3.innerText = planet.name;
        h3.onclick = () => {
            window.location.href = `planet.html?id=${planet.id}`
        }
        planetContainer.appendChild(h3);
    });
    planetDiv.appendChild(planetContainer)
}
getFilmData(id);
getCharacterData(id);
getPlanetData(id);