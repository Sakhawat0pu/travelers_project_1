const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');  // if URL /id=X

// Function to fetch planet data
async function fetchPlanetData(id) {
    try {
        const response = await fetch(`http://localhost:9001/api/planets/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const planet = await response.json();
        console.log(planet);
        return planet;
    } catch (error) {
        console.error('Error fetching planet data:', error);
    }
}

// Function to fetch films and characters for a planet
async function fetchFilmsAndCharacters(planetID) {
    try {
        const filmsResponse = await fetch(`http://localhost:9001/api/planets/${planetID}/films`);
        const charactersResponse = await fetch(`http://localhost:9001/api/planets/${planetID}/characters`);

        if (!filmsResponse.ok || !charactersResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const films = await filmsResponse.json();
        const characters = await charactersResponse.json();

        return { films, characters };
    } catch (error) {
        console.error('Error fetching films and characters:', error);
    }
}

// Function to display data on the HTML page
async function displayPlanetInfo(planetID) {
    const planet = await fetchPlanetData(planetID);
    const { films, characters } = await fetchFilmsAndCharacters(planetID);

    // Populate planet general info
    document.getElementById('name').textContent = planet.name;
    document.getElementById('climate').textContent = planet.climate;
    document.getElementById('diameter').textContent = planet.diameter;
    document.getElementById('gravity').textContent = planet.gravity;

    // Populate films list
    const filmsList = document.querySelector('#films ul');
    films.forEach(film => {
        const filmItem = document.createElement('li');
        const filmLink = document.createElement('a');
        filmLink.href = `http://localhost:3000/film.html?id=${film.id}`;
        filmLink.textContent = film.title;
        filmItem.appendChild(filmLink);
        filmsList.appendChild(filmItem);
    });

    // Populate characters list
    const charactersList = document.getElementById('characters');
    characters.forEach(character => {
        const characterItem = document.createElement('span');
        const characterLink = document.createElement('a');
        characterLink.href = `http://localhost:3000/character.html?id=${character.id}`;
        characterLink.textContent = character.name;
        characterItem.appendChild(characterLink);
        charactersList.appendChild(characterItem);
    });
}

displayPlanetInfo(id);
