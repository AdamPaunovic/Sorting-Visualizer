// bubbleSort.js
// Implements the Bubble Sort algorithm and generates animations for sorting visualizations.
// The animations highlight the comparison and swapping process of elements.
// Author: Adam Paunovic
// Date: 2024-10-20

// bubbleSort
// Params: 
//    array (number[]): The array of numbers to be sorted.
// Returns:
//    [animations, auxArray] - An array containing two elements:
//        1. animations: An array of animations describing each step of the bubble sort process.
//        2. auxArray: The sorted array.
export function bubbleSort(array) {
    
    const animations = [];
    let auxArray = array.slice();  // copy of input array

    // Colors used for animations
    const highlight1 = "red";
    const highlight2 = "turquoise"

    for (let i = 0; i < auxArray.length - 1; i++) {
        for (let j = 0; j < auxArray.length - i - 1; j++) {

            // Comparison animation
            animations.push([j, j + 1, "highlight", [highlight1, highlight2]]);
        
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