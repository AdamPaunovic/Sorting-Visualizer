export function quickSort(array) {
    const animations = [];
    const auxArray = array.slice();  // Copy of input array
    quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return [animations, auxArray];
}

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

function partition(auxArray, start, end, animations) {
    const pivot = auxArray[end];
    let i = start - 1;

    // Colors used for animations
    let pivotHighlight = "#AB20FD";
    let rangeFill = "limegreen";
    let iColor = "turquoise"
    let jColor = "red";

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

    // Revert the array color
    animations.push([start, end, "revertRange", [i + 1]]);
    return i + 1;  // Return the index of the pivot
}

function swap(auxArray, i, j) {
    const temp = auxArray[i];
    auxArray[i] = auxArray[j];
    auxArray[j] = temp;
}