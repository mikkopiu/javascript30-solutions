(function () {
    'use strict';

    function onPanelClick({ currentTarget }) {
        const wasActive = currentTarget.classList.contains('active');
        panels.forEach(panel => panel.classList.remove('active'));
        if (!wasActive) {
            currentTarget.classList.add('active');
        }
    }

    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.addEventListener('click', onPanelClick));
    
})();
