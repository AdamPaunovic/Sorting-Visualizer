export function selectionSort(array) {
    const animations = [];
    const auxArray = array.slice();  // copy of input array

    const n = auxArray.length;

    for (let i = 0; i < n - 1; i++) {

        // Assume first element of unsorted portion is min
        let minIndex = i;
        animations.push([minIndex, minIndex, "highlight2"]);
        // Find index of min element in unsorted portion
        for (let j = i + 1; j < n; j++) {
            // Mark potential min with highlight2

            if (auxArray[j] < auxArray[minIndex]) {
                minIndex = j;
            }
        }

        animations.push([minIndex, minIndex, "highlight1"]);
        // Swap elements if new min element found
        if (minIndex !== i) {
            [auxArray[i], auxArray[minIndex]] = [auxArray[minIndex], auxArray[i]];
            animations.push([i, minIndex, "swap"]);
        }

        animations.push([i, (minIndex !== i ? minIndex : -1), "final"]);  // Mark element at index i as final
    }

    // console.log(auxArray);
    return [animations, auxArray];

}