namespace Utils {
    /** Returns a random number [min, max). */
    export function random(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min); // [min, max)
    }
}