(function () {
    'use strict';

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const inputEl = document.getElementById('location-search');
    const suggestionsEl = document.getElementById('suggestions');
    const fullData = [];
    let filteredData = [];

    function init() {
        fetch(endpoint)
            .then(res => res.json())
            .then(data => data.map(d => {
                d.population = parseInt(d.population, 10);
                return d;
            }))
            .then(data => fullData.push(...data))
            .catch(err => console.error(err));

        inputEl.addEventListener('input', onInput);
    }

    function onInput({ currentTarget }) {
        const input = currentTarget.value;

        if (!input) {
            showResults(fullData, null);
            return false;
        }

        filteredData = fullData.filter(item => {
            const regex = new RegExp(input, 'gi');
            return item.city.match(regex) || item.state.match(regex);
        });
        showResults(filteredData, input);
    }

    function showResults(results, input) {
        // TODO: Chunked render (this is way too heavy)
        suggestionsEl.innerHTML = results
            .map(result => {
                const highlightRegex = new RegExp(input, 'gi');
                const city = result.city.replace(highlightRegex, `<span class="hl">${input}</span>`);
                const state = result.state.replace(highlightRegex, `<span class="hl">${input}</span>`);


                return `<li class="suggestion-item">
                    <span class="name">${city}, ${state}</span>
                    <span class="population">${result.population.toLocaleString('fi-fi')}</span>
                </li>`
            })
            .join('');
    }

    init();
    
})();
