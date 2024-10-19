export function bubbleSort(array) {
    const animations = [];
    let auxArray = array.slice();  // copy of input array

    for (let i = 0; i < auxArray.length - 1; i++) {
        for (let j = 0; j < auxArray.length - i - 1; j++) {
            // Comparison step
            animations.push([j, j + 1, "highlight", ["red", "turquoise"]]);

            if (auxArray[j] > auxArray[j + 1]) {

                // Swap step
                [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];

                // Push swap animation
                animations.push([j, j + 1, "swap"]);
            } 
            // If no swap, push a revert animation to show normal color
            animations.push([j, j + 1, "revert", []]);
        }
        // Mark item in last position as final
        animations.push([auxArray.length - i - 1, -1, "final", []]);
    }
    // Mark first item as final
    animations.push([0, auxArray[0], "final", []]);

    return [animations, auxArray];
}