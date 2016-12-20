(function () {
    'use strict';

    const inputs = [];
    let prevEnabledInd = 0;

    function onCheckClick({ currentTarget, shiftKey }) {
        const inputInd = inputs.indexOf(currentTarget);

        if (!currentTarget.checked) {
            return; // Nothing to do here, just a standard input click
        }
        if (!shiftKey) {
            // Keep in memory to know which direction was chosen
            prevEnabledInd = inputInd;
            return;
        }

        if (prevEnabledInd <= inputInd) {
            const aboveEnabledInputInd = indexOfPrecedingEnabled(inputInd - 1);

            for (let i = aboveEnabledInputInd + 1; i < inputInd; i++) {
                inputs[i].checked = true;
            }
        } else {
            const nextEnabledInput = indexOfNextEnabled(inputInd + 1);

            for (let i = inputInd + 1; i < nextEnabledInput; i++) {
                inputs[i].checked = true;
            }
        }

        // Keep in memory to know which direction was chosen
        prevEnabledInd = inputInd;
    }

    function indexOfPrecedingEnabled(startInd) {
        let i;
        for (i = startInd; i > 0; i--) {
            if (inputs[i].checked) {
                return i;
            }
        }
        return i;
    }

    function indexOfNextEnabled(startInd) {
        let i;
        for (i = startInd; i < inputs.length; i++) {
            if (inputs[i].checked) {
                return i;
            }
        }
        return i;
    }

    document.querySelectorAll('.checkbox')
        .forEach(el => {
            inputs.push(el);
            el.addEventListener('click', onCheckClick);
        })
    
})();
