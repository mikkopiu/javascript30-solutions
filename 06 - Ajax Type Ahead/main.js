(function () {
    'use strict';

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const inputEl = document.getElementById('location-search');
    const suggestionsEl = document.getElementById('suggestions');

    function onInput({ currentTarget }) {
        const input = currentTarget.value;

        if (!input) {
            return false;
        }

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                data = data.filter(item => item.city.indexOf(input) > -1 || item.state.indexOf(input) > -1);
                return showResults(data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    function showResults(results) {
        suggestionsEl.innerHTML = results
            .map(result => {
                return `<li class="suggestion-item">
                    ${result.city}, ${result.state}
                </li>`
            })
            .join('');
    }

    inputEl.addEventListener('input', onInput);
    
})();
