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

    // Colors used
    let half1 = "#FFC8C9";
    let half2 = "#ADD8E6";
    let highlight1 = "#FF073A";
    let highlight2 = "#009092";

    const tempArray = auxArray.slice(start, end + 1);  // Copy only the portion to be merged

    let i = start;     // Pointer for the left half
    let j = mid + 1;   // Pointer for the right half
    let k = start;     // Pointer for the main array

    let animationIdx = i;  // index of i in the current animated array

    animations.push([start, end, "highlightRange", [half1, half2]]);  // Highlight two halves being merged

    animations.push([k, j, "highlight", [highlight1, highlight2]]);

    // Perform the merge operation, comparing the two halves
    while (i <= mid && j <= end) {

        if (tempArray[i - start] <= tempArray[j - start]) {
            if (k < mid) {
                animations.push([k, k + 1, "highlight", [half1, highlight1]]);
            }
            auxArray[k++] = tempArray[i++ - start];
        } else {
            if (j < end) {
                animations.push([j, k, "insert", [half2, highlight2]]);  // Insert animation for placing element at index k
            } else {
                animations.push([j, k, "insert", [half2]]);  // Insert animation for placing element at index k
            }
            auxArray[k++] = tempArray[j++ - start];
        }
        animationIdx++;
    }

    // If any elements are left in the left half, add them
    while (i <= mid) {
        
        if (k < mid) {
            animations.push([k, k + 1, "highlight", [half1, highlight1]]);
        }
        auxArray[k++] = tempArray[i++ - start];
        animationIdx++;
    }

    // If any elements are left in the right half, add them
    while (j <= end) {
        if (k < end) {
            animations.push([k, k + 1, "highlight", [half2, highlight2]]);
        }
        auxArray[k++] = tempArray[j++ - start];
    }
    animations.push([start, end, "revertRange", []]);
}
