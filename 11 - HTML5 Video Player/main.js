(function () {
    'use strict';

    let mouseDown = false;

    const playerEl = document.querySelector('.player');
    const videoEl = playerEl.querySelector('.viewer');
    const progressEl = playerEl.querySelector('.progress');
    const progressBarEl = playerEl.querySelector('.progress__filled');
    const toggleEl = playerEl.querySelector('.toggle');
    const skipButtonEls = playerEl.querySelectorAll('[data-skip]');
    const rangeEls = playerEl.querySelectorAll('.player__slider');

    toggleEl.addEventListener('click', togglePlay);

    videoEl.addEventListener('click', togglePlay);
    videoEl.addEventListener('play', updatePlayStatusBtn);
    videoEl.addEventListener('pause', updatePlayStatusBtn);
    videoEl.addEventListener('timeupdate', onVideoProgress);

    skipButtonEls.forEach(btn => btn.addEventListener('click', skip));

    rangeEls.forEach(range => range.addEventListener('input', onRangeUpdate));

    progressEl.addEventListener('click', scrub);
    progressEl.addEventListener('mousemove', (evt) => mouseDown && scrub(evt));
    progressEl.addEventListener('mousedown', () => mouseDown = true);
    progressEl.addEventListener('mouseup', () => mouseDown = false);

    /**
     * Toggle video playback status
     */
    function togglePlay() {
        if (videoEl.paused) {
            videoEl.play();
        } else {
            videoEl.pause();
        }
    }

    /**
     * Update play status button
     */
    function updatePlayStatusBtn() {
        toggleEl.textContent = this.paused ? '►' : '❚❚';
    }

    /**
     * Skip video by amount defined in data-skip attribute
     */
    function skip() {
        videoEl.currentTime += parseFloat(this.dataset.skip);
    }

    /**
     * Handle range updates.
     * Element should define adjusted property as its name, e.g "volume".
     */
    function onRangeUpdate() {
        videoEl[this.name] = this.value;
    }

    /**
     * Handle video progress
     */
    function onVideoProgress() {
        const percent = (videoEl.currentTime / videoEl.duration) * 100;
        progressBarEl.style.flexBasis = `${percent}%`;
    }

    /**
     * Scrub video
     * @param evt
     */
    function scrub(evt) {
        videoEl.currentTime = (evt.offsetX / videoEl.offsetWidth) * videoEl.duration;
    }

})();
