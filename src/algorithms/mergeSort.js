// mergeSort.js
// Implements the Merge Sort algorithm and generates animations for sorting visualizations.
// The animations highlight the process of splitting, merging, and inserting elements.
// Author: Adam Paunovic
// Date: 2024-10-20

// mergeSort
// Params: 
//    array (number[]): The array of numbers to be sorted.
// Returns:
//    [animations, auxArray] - An array containing two elements:
//        1. animations: An array of animations describing each step of the merge sort process.
//        2. auxArray: The sorted array.
export function mergeSort(array) {
    const animations = [];
    const auxArray = array.slice();  // Copy of input array
    mergeSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return [animations, auxArray];
}

// mergeSortHelper
// Recursively splits the array into two halves and merges them.
// Params: 
//    auxArray (number[]): The array being sorted.
//    start (number): Starting index of the portion of the array to sort.
//    end (number): Ending index of the portion of the array to sort.
//    animations (Array): Array collecting the animations for visualizing the sorting process.
function mergeSortHelper(auxArray, start, end, animations) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    
    // Recursively split the array into two halves
    mergeSortHelper(auxArray, start, mid, animations);
    mergeSortHelper(auxArray, mid + 1, end, animations);

    // Merge the two halves and generate animations
    merge(auxArray, start, mid, end, animations);
}

// merge
// Merges two sorted halves of the array, comparing and inserting elements into their correct positions.
// Animations are generated to highlight the merging and insertion process for visualizations.
// Params:
//    auxArray (number[]): The array being sorted.
//    start (number): Starting index of the portion being merged.
//    mid (number): Middle index, dividing the array into two halves.
//    end (number): Ending index of the portion being merged.
//    animations (Array): Array collecting the animations to visualize the merge process.
function merge(auxArray, start, mid, end, animations) {

    // Colors used for animations
    let half1 = "limegreen";  // Color for left half to be merged
    let half2 = "limegreen";  // Color for right half to be merged
    let highlight1 = "#FF073A";  // Color for pointer of left half
    let highlight2 = "#00FEFC";  // Color for pointer of right half

    const tempArray = auxArray.slice(start, end + 1);  // Copy only the portion to be merged

    let i = start;     // Pointer for the left half
    let j = mid + 1;   // Pointer for the right half
    let k = start;     // Pointer for the main array

    animations.push([start, end, "highlightRange", [half1, half2]]);  // Highlight two halves being merged

    animations.push([i, j, "highlight", [highlight1, highlight2]]);  // Highlight i and j pointers

    // Perform the merge operation, comparing the two halves
    while (i <= mid && j <= end) {
        if (tempArray[i - start] <= tempArray[j - start]) {
            // Highlight animation for i, which is at index k in actual array
            if (k < mid) {
                animations.push([k, k + 1, "highlight", [half1, highlight1]]);
            }
            auxArray[k++] = tempArray[i++ - start];
        } else {
            // Insert animation for placing element at index k
            if (j < end) {
                animations.push([j, k, "insert", [half2, highlight2]]);  
            } else {
                animations.push([j, k, "insert", [half2]]);  
            }
            auxArray[k++] = tempArray[j++ - start];
        }
    }

    // If any elements are left in the left half, add them
    while (i <= mid) {
        if (k < mid) {
            animations.push([k, k + 1, "highlight", [half1, highlight1]]);
        }
        auxArray[k++] = tempArray[i++ - start];
    }

    // If any elements are left in the right half, add them
    while (j <= end) {
        if (k < end) {
            animations.push([k, k + 1, "highlight", [half2, highlight2]]);
        }
        auxArray[k++] = tempArray[j++ - start];
    }

    // If not last merge, revert the highlight for two halves
    if (end !== auxArray.length - 1) {
        animations.push([start, end, "revertRange", []]);
    }
}
