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
    Object.keys(KEY_MAP).forEach(key => {
        KEY_MAP[key].char = key.charCodeAt(0);
    });

    /**
     * Play sound on key down
     *
     * @param {KeyboardEvent} evt
     * @returns {boolean}
     */
    function onKeyDown(evt) {
        let { code } = evt;
        code = code.replace('Key', '');
        const key = KEY_MAP[code];
        if (!key) {
            return false;
        }

        playSound(key);
    }

    /**
     * Remove styling on key up
     *
     * @param {KeyboardEvent} evt
     * @returns {boolean}
     */
    function onKeyUp(evt) {
        let { code } = evt;
        code = code.replace('Key', '');
        if (!KEY_MAP[code]) {
            return false;
        }
        KEY_MAP[code].el.classList.remove('playing');
    }

    function onKeyClick(evt) {
        const code = String.fromCharCode(evt.currentTarget.getAttribute('data-key'));
        const key = KEY_MAP[code];
        if (!key) {
            return false;
        }

        playSound(key, true);
    }

    function playSound(key, isClick = false) {
        const keyEl = key.el;
        const audioEl = key.audioEl;

        // Reset playback
        audioEl.currentTime = 0;

        // Start playback
        keyEl.classList.add('playing');
        audioEl.play();

        if (isClick) {
            // Hack for clicking as we know the transition takes 70ms
            // We could also listen to the audio end event,
            // but this is a simpler way to prevent errors on repeat actions.
            setTimeout(() => keyEl.classList.remove('playing'), 70);
        }
    }

    /**
     * Initialize key and audio elements
     */
    function initKeys() {
        const keysContainer = document.getElementById('keys');
        keysContainer.innerHTML = '';

        Object.keys(KEY_MAP).forEach(char => {
            const key = KEY_MAP[char];

            // Create the key element
            const keyEl = KEY_MAP[char].el = document.createElement('div');
            keyEl.className = 'key';
            keyEl.setAttribute('data-key', key.char);
            keyEl.innerHTML = `
                <kbd class="key-name">${char}</kbd>
                <span class="key-description">${key.sound}</span>
            `;
            keysContainer.appendChild(keyEl);
            keyEl.addEventListener('click', onKeyClick);

            // Create the matching audio element
            const audioEl = KEY_MAP[char].audioEl = document.createElement('audio');
            audioEl.setAttribute('data-key', key.char);
            audioEl.src = `sounds/${key.sound}.wav`;
            document.body.appendChild(audioEl);
        });
    }

    initKeys();
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
})();