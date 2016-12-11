(function () {
    'use strict';

    const inputs = document.querySelectorAll('.controls input');

    function onUpdate() {
        const { sizing = '' } = this.dataset;
        document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${sizing}`);
    }

    inputs.forEach(input => input.addEventListener('change', onUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', onUpdate));

})();
