export function insertionSort(array) {
    const animations = [];
    const auxArray = array.slice();  // copy of input array

    for (let i = 1; i < auxArray.length; i++) {

        let key = auxArray[i];
        let j = i - 1;

        // Highlight the current key being compared
        animations.push([i, i, "highlight"]);

        while (j >= 0 && auxArray[j] > key) {
        
            auxArray[j + 1] = auxArray[j];

            // Shift animation
            animations.push([j, j + 1, "swap"]);

            j--;
        }
        auxArray[j + 1] = key;

        animations.push([j + 1, j + 1, "revert"]);
    }

    return [animations, auxArray];
}