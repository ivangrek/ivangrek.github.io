var Utils;
(function (Utils) {
    /** Returns a random number [min, max). */
    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // [min, max)
    }
    Utils.random = random;
})(Utils || (Utils = {}));
