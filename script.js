

let allCountries=[];

// fetch fn
async function fetchCountries() {
    const container = document.getElementById("countries");
    container.innerHTML = "Loading...";

    try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region");
    const data = await res.json();

    allCountries = data;
    displayCountries(allCountries);

    } catch (err) {
    container.innerHTML = "Error loading data";
    }
}


function displayCountries(countries) {
    const container =document.getElementById("countries");
    container.innerHTML= "";
    if (countries.length===0) {
    container.innerHTML="No country found";
    return;
    }

    countries.map(country => {
    const div =document.createElement("div");
    div.className="country";

    // SAFE DATA ACCESS
    const name=country.name?.common || "No Name";
    const flag=country.flags?.png || "";
    const population = country.population
        ? country.population.toLocaleString()
        : "N/A";
    const region =country.region || "N/A";

    div.innerHTML =`<h3>${name}</h3>
        <img src="${flag}">
        <p>Population: ${population}</p>
        <p>Region: ${region}</p>`;

    container.appendChild(div);
    });
}

// Search fn
function searchCountry() {
  const value =document.getElementById("search").value.toLowerCase();

  const filtered =allCountries.filter(c =>
    c.name?.common?.toLowerCase().includes(value)
  );

  displayCountries(filtered);
}

// Filter by region
function filterRegion(region) {
  const filtered = allCountries.filter(c => c.region === region);
  displayCountries(filtered);
}

// Sort by populatin fn
function sortPopulation() {
  const sorted = [...allCountries].sort((a, b) =>
    (b.population || 0) - (a.population || 0)
  );

  displayCountries(sorted);
}


function showAll() {
  displayCountries(allCountries);
}

// Dark mode
function toggleTheme() {
  document.body.classList.toggle("light");
}

fetchCountries();