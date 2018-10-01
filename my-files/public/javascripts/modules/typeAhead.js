const axios = require('axios'); // Kind of fetch, has sane defaults, can cancel requests

function createSearchResultsHTML (stores) {
  return stores.map((store) => {
    return `
      <a href="/stores/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
        <p>${store.description}</p>
      </a>
    `;
  }).join('');
}

function typeAhead (searchBox) {
  if (!searchBox) return;

  const searchInput = searchBox.querySelector('input[name="search"]');
  const searchResults = searchBox.querySelector('.search__results')

  // Bling.js shortcut for addEventListener()
  searchInput.on('input', function () {
    // If there is no value, quit it!
    if (!this.value) {
      searchResults.style.display = 'none'; // Hide results
      return; // Stop!
    };

    // Show the search results!
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';

    axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          searchResults.innerHTML = createSearchResultsHTML(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Handle keyboard inputs
    searchInput.on('keyup', (event) => {
      // If they don't press UP, DOWN or ENTER, who cares!
      if (![38, 40, 13].includes(event.keyCode)) return; // Skip it!

      console.log(event.keyCode);
    })
  });
}

export default typeAhead;
