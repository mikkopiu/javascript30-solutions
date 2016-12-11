(function () {
    'use strict';

    const KEY_MAP = {
        A: {sound: 'clap'},
        S: {sound: 'hihat'},
        D: {sound: 'kick'},
        F: {sound: 'openhat'},
        G: {sound: 'boom'},
        H: {sound: 'ride'},
        J: {sound: 'snare'},
        K: {sound: 'tom'},
        L: {sound: 'tink'},
    };
    const KEYS = Object.keys(KEY_MAP).map(key => ({letter: key, sound: KEY_MAP[key].sound, char: key.charCodeAt(0)}));

    console.info(`Generated keys:`);
    console.table(KEYS);

    /**
     * Play sound on key down
     *
     * @param {KeyboardEvent} evt
     * @returns {boolean}
     */
    function onKeyDown(evt) {
        let { keyCode, code } = evt;
        code = code.replace('Key', '');
        if (!KEY_MAP[code]) {
            return false;
        }

        const keyEl = document.querySelector(`.key[data-key="${keyCode}"]`);
        const audioEl = document.querySelector(`audio[data-key="${keyCode}"]`);

        // Stop current playback and event listener
        audioEl.pause();
        audioEl.currentTime = 0;

        // Start playback
        keyEl.classList.add('playing');
        audioEl.play();
    }

    /**
     * Remove styling on key up
     *
     * @param {KeyboardEvent} evt
     * @returns {boolean}
     */
    function onKeyUp(evt) {
        let { keyCode, code } = evt;
        if (!KEY_MAP[code.replace('Key', '')]) {
            return false;
        }
        document.querySelector(`.key[data-key="${keyCode}"]`).classList.remove('playing');
    }

    /**
     * Create a single key element
     *
     * @param {Object} key
     * @param {Node} container
     */
    function createKeyElement(key, container) {
        const keyEl = document.createElement('div');
        keyEl.className = 'key';
        keyEl.setAttribute('data-key', key.char);

        keyEl.innerHTML = `
            <kbd class="key-name">${key.letter}</kbd>
            <span class="key-description">${key.sound}</span>
        `;

        container.appendChild(keyEl);
    }

    /**
     * Create a single audio element for a key
     *
     * @param {Object} key
     */
    function createAudioElement(key) {
        const audioEl = document.createElement('audio');
        audioEl.setAttribute('data-key', key.char);
        audioEl.src = `sounds/${key.sound}.wav`;

        document.body.appendChild(audioEl);
    }

    /**
     * Initialize key and audio elements
     *
     * @param {Object[]} keys
     */
    function initKeys(keys) {
        const keysContainer = document.getElementById('keys');
        keysContainer.innerHTML = '';

        keys.forEach(key => {
            createKeyElement(key, keysContainer);
            createAudioElement(key);
        });
    }

    function ready() {
        initKeys(KEYS);

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
    }

    if (document.readyState !== 'loading') {
        ready()
    } else {
        // the document hasn't finished loading/parsing yet so let's add an event handler
        document.addEventListener('DOMContentLoaded', ready)
    }
})();