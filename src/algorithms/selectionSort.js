// selectionSort.js
// Implements the Selection Sort algorithm and generates animations for sorting visualizations.
// The animations highlight the process of finding the minimum element and swapping elements.
// Author: Adam Paunovic
// Date: 2024-10-20


// selectionSort
// Params:
//    array (number[]): The array of numbers to be sorted.
// Returns:
//    [animations, auxArray] - An array containing two elements:
//        1. animations: An array of animations describing each step of the selection sort process.
//        2. auxArray: The sorted array.
export function selectionSort(array) {

    const animations = [];
    const auxArray = array.slice();  // copy of input array

    // Colors used in animation
    const highlight1 = "red";
    const highlight2 = "turquoise";

    const n = auxArray.length;

    for (let i = 0; i < n - 1; i++) {

        // Assume first element of unsorted portion is min
        let minIndex = i;
        animations.push([minIndex, -1, "highlight", [highlight1]]);
        // Find index of min element in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (auxArray[j] < auxArray[minIndex]) {
                minIndex = j;
            }
        }

        // Highlight actual minIndex
        animations.push([minIndex, -1, "highlight", [highlight2]]);

        // Swap elements if new min element found
        if (minIndex !== i) {
            [auxArray[i], auxArray[minIndex]] = [auxArray[minIndex], auxArray[i]];
            animations.push([i, minIndex, "swap"]);
        }

        animations.push([i, (minIndex !== i ? minIndex : -1), "final", []]);  // Mark element at index i as final
    }

    return [animations, auxArray];
}