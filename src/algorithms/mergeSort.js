export function mergeSort(array) {
    const animations = [];
    const auxArray = array.slice();  // Copy of input array
    mergeSortHelper(auxArray, 0, auxArray.length - 1, animations);
    console.log(animations);
    return [animations, auxArray];
}


function mergeSortHelper(auxArray, start, end, animations) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    
    // Recursively split the array into two halves
    mergeSortHelper(auxArray, start, mid, animations);
    mergeSortHelper(auxArray, mid + 1, end, animations);

    // Merge the two halves and generate animations
    merge(auxArray, start, mid, end, animations);
}


function merge(auxArray, start, mid, end, animations) {
    const tempArray = auxArray.slice(start, end + 1);  // Copy only the portion to be merged

    let i = start;     // Pointer for the left half
    let j = mid + 1;   // Pointer for the right half
    let k = start;     // Pointer for the main array

    let animationIdx = i;  // index of i in the current animated array

    animations.push([start, end, "highlightRange", ["red", "yellow"]]);

    // Perform the merge operation, comparing the two halves
    while (i <= mid && j <= end) {

        if (tempArray[i - start] <= tempArray[j - start]) {
            auxArray[k++] = tempArray[i++ - start];

        } else {
            animations.push([j, k, "insert"]);  // Insert animation for placing element at index k
            auxArray[k++] = tempArray[j++ - start];
        }
        animationIdx++;
    }

    // If any elements are left in the left half, add them
    while (i <= mid) {
        auxArray[k++] = tempArray[i++ - start];
        animationIdx++;
    }

    // If any elements are left in the right half, add them
    while (j <= end) {
        animations.push([j, k, "insert"]);
        auxArray[k++] = tempArray[j++ - start];
    }

    animations.push([start, end, "highlightRange", ["lawngreen", "lawngreen"]]);
}
