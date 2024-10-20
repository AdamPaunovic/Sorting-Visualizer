// insertionSort.js
// Implements the Insertion Sort algorithm and generates animations for sorting visualizations.
// The animations highlight the swapping and insertion of elements
// Author: Adam Paunovic
// Date: 2024-10-20

// insertionSort
// Params: 
//    array (number[]): The array of numbers to be sorted.
// Returns:
//    [animations, auxArray] - An array containing two elements:
//        1. animations: An array of animations describing each step of the insertion sort process.
//        2. auxArray: The sorted array.
export function insertionSort(array) {

    const animations = [];
    const auxArray = array.slice();  // copy of input array

    // Colors used for animation
    const highlight1 = "red";

    for (let i = 1; i < auxArray.length; i++) {

        let key = auxArray[i];
        let j = i - 1;

        // Highlight the current key being compared
        animations.push([i, -1, "highlight", [highlight1]]);

        while (j >= 0 && auxArray[j] > key) {
            
            // Shift step 
            auxArray[j + 1] = auxArray[j];

            // Shift animation
            animations.push([j, j + 1, "swap"]);

            j--;
        }
        auxArray[j + 1] = key;

        // Unhighlight element just processed
        animations.push([j + 1, j + 1, "revert", []]);
    }

    return [animations, auxArray];
}