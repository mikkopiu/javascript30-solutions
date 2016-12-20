(function () {
    'use strict';
    
    const IS_TOUCH = 'ontouchstart' in window;

    const canvas = document.getElementById('draw');
    const ctx = canvas.getContext('2d');

    // Fill the whole screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define base styles for paths
    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    const LINE_WIDTH_MAX = 250;
    const LINE_WIDTH_MIN = 1;
    const LINE_WIDTH_INCREMENT = 0.5;
    let lineWidthDir = true; // True for growing, false for contracting
    let lineWidth = LINE_WIDTH_MIN;

    canvas.addEventListener(IS_TOUCH ? 'touchstart' : 'mousedown', onTouchStart, false);
    canvas.addEventListener(IS_TOUCH ? 'touchmove' : 'mousemove', onTouchMove, false);
    canvas.addEventListener(IS_TOUCH ? 'touchend' : 'mouseup', () => isDrawing = false, false);

    function onTouchStart(evt) {
        isDrawing = true;

        if (IS_TOUCH) {
            [lastX, lastY] = [evt.changedTouches[0].clientX, evt.changedTouches[0].clientY];
        } else {
            [lastX, lastY] = [evt.offsetX, evt.offsetY];
        }

        lineWidth = LINE_WIDTH_MIN;
    }

    function onTouchMove(evt) {
        if (!isDrawing) {
            return false;
        }

        let xPos, yPos;
        if (IS_TOUCH) {
            xPos = evt.changedTouches[0].clientX;
            yPos = evt.changedTouches[0].clientY;
        } else {
            xPos = evt.offsetX;
            yPos = evt.offsetY;
        }

        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(xPos, yPos);
        ctx.stroke();

        [lastX, lastY] = [xPos, yPos];

        hue++;

        if (lineWidth < LINE_WIDTH_MIN || lineWidth > LINE_WIDTH_MAX) {
            lineWidthDir = !lineWidthDir;
        }

        if (lineWidthDir) {
            lineWidth += LINE_WIDTH_INCREMENT;
        } else {
            lineWidth -= LINE_WIDTH_INCREMENT;
        }
    }

})();
