(function () {
    'use strict';

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const inputEl = document.getElementById('location-search');
    const suggestionsEl = document.getElementById('suggestions');
    const fullData = [];
    let filteredData = [];
    let idleCallbacks = [];

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

        idleCallbacks.forEach(cancelIdleCallback);

        if (!input) {
            showResults(fullData, '');
            return false;
        }

        filteredData = fullData.filter(item => {
            const regex = new RegExp(input, 'gi');
            return item.city.match(regex) || item.state.match(regex);
        });
        showResults(filteredData, input);
    }

    function showResults(results, input) {
        const chunks = [];
        for (let i = 0; i < results.length; i += 20) {
            chunks.push(results.slice(i, i + 20));
        }

        const htmlList = chunks.map(chunk => {
            return chunk
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
        });

        if (htmlList.length > 0) {
            appendChunks(htmlList);
        } else {
            suggestionsEl.innerHTML = '';
        }
    }

    function appendChunks(chunks, ind = 0) {
        idleCallbacks.push(requestIdleCallback(() => {
            if (ind === 0) {
                suggestionsEl.innerHTML = chunks[ind];
            } else {
                suggestionsEl.insertAdjacentHTML('beforeend', chunks[ind]);
            }

            if (ind !== chunks.length - 1) {
                appendChunks(chunks, ind + 1);
            }
        }));
    }

    init();
    
})();
