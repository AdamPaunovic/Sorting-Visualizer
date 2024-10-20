// quickSort.js
// Implements the Quick Sort algorithm and generates animations for sorting visualizations.
// The animations highlight the process of partitioning the array, swapping elements, and finalizing the pivot.
// Author: Adam Paunovic
// Date: 2024-10-20


// quickSort
// Params:
//    array (number[]): The array of numbers to be sorted.
// Returns:
//    [animations, auxArray] - An array containing two elements:
//        1. animations: An array of animations describing each step of the quick sort process.
//        2. auxArray: The sorted array.
export function quickSort(array) {
    const animations = [];
    const auxArray = array.slice();  // Copy of input array
    quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return [animations, auxArray];
}

// quickSortHelper
// Recursively sorts the array by partitioning it and sorting the two halves.
// Params:
//    auxArray (number[]): The array being sorted.
//    start (number): Starting index of the portion of the array to sort.
//    end (number): Ending index of the portion of the array to sort.
//    animations (Array): Array collecting the animations to visualize the sorting process.
function quickSortHelper(auxArray, start, end, animations) {
    if (start < end) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(auxArray, start, end, animations);
        // Recursively sort the left half
        quickSortHelper(auxArray, start, pivotIndex - 1, animations);
        // Recursively sort the right half
        quickSortHelper(auxArray, pivotIndex + 1, end, animations);
    }
}

// partition
// Partitions the array around a pivot, placing elements smaller than the pivot to its left
// and elements larger than the pivot to its right. Generates animations for the process.
// Params:
//    auxArray (number[]): The array being sorted.
//    start (number): Starting index of the portion being partitioned.
//    end (number): Ending index of the portion being partitioned (also the pivot index).
//    animations (Array): Array collecting the animations to visualize the partitioning process.
// Returns:
//    The index of the pivot after partitioning.
function partition(auxArray, start, end, animations) {

    // Colors used for animations
    let pivotHighlight = "#AB20FD";
    let rangeFill = "limegreen";
    let iColor = "turquoise"
    let jColor = "red";

    const pivot = auxArray[end];
    let i = start - 1;

    // Highlight the subArray and the pivot
    animations.push([start, end, "highlightRange", [rangeFill, rangeFill, pivotHighlight]]);

    // Highlight starting j index
    animations.push([start, -1, "highlight", [jColor]]);

    for (let j = start; j < end; j++) {

        // Highlight j bar and clear previous highlight
        if (j > start) {
            animations.push([j, j - 1 , "highlight", [jColor, rangeFill]]);
        }

        // Highlight i bar and mark progress of i 
        if (i > start - 1) {
            animations.push([i, -1, "highlight", [iColor]]);
        }

        if (auxArray[j] <= pivot) {
            i++;
            // Swap elements in the array
            swap(auxArray, i, j);
            animations.push([i, j, "swap", []]);
        }

    }

    swap(auxArray, i + 1, end);
    animations.push([i + 1 , end, "swap", []])

    // Revert the array color and mark pivot as final
    animations.push([start, end, "revertRange", [i + 1]]);
    return i + 1;  // Return the index of the pivot
}

// swap
// Swaps two elements in the array.
// Params:
//    auxArray (number[]): The array where the elements will be swapped.
//    i (number): The index of the first element.
//    j (number): The index of the second element.
function swap(auxArray, i, j) {
    const temp = auxArray[i];
    auxArray[i] = auxArray[j];
    auxArray[j] = temp;
}