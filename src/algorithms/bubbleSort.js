export function bubbleSort(array) {
    const animations = [];
    let auxArray = array.slice();  // copy of input array

    for (let i = 0; i < auxArray.length - 1; i++) {
        for (let j = 0; j < auxArray.length - i - 1; j++) {
            // Comparison step
            animations.push([j, j + 1, "compare"]);

            if (auxArray[j] > auxArray[j + 1]) {

                // Swap step
                animations.push([j, auxArray[j], j + 1, auxArray[j + 1], "swap"]);

                // Push swap animation
                [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];

                swapped = true;
            } else {
                // If no swap, push a revert animation to show normal color
                animations.push([j, j + 1, "revert"]);
            }
        }
        // Mark item in last position as final
        animations.push([auxArray.length - i - 1, auxArray[auxArray.length - i - 1], "final"]);
    }
    // Mark first item as final
    animations.push([0, auxArray[0], "final"]);

    return animations;
}