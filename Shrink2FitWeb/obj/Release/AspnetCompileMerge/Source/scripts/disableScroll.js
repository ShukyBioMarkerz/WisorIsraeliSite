function wheel(e) {
    e.preventDefault();
}
function disable_scroll() {
    var keys = [37, 38, 39, 40];
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = function(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                e.preventDefault();
                return;
            }
        }
    };
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}