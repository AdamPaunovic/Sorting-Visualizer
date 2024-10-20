// App.js
//
// Author: Adam Paunovic
// Date: 2024-10-20
//
// This component serves as the main entry point for the Sorting Visualizer application.
// It manages the application's state, including array size, sorting speed, selected 
// sorting algorithm, and the arrays involved in the sorting process.
//
// The App component renders the Header and SortingVisualizer components, 
// providing them with the necessary props to facilitate user interactions and display
// the sorting animations. It handles the logic for generating random arrays, 
// executing the selected sorting algorithm, and managing the sorting process, 
// including starting, completing, and resetting the sorting.
//
// The application supports multiple sorting algorithms: Bubble, Insertion, Selection, 
// Merge, and Quick sort, allowing users to visualize how each algorithm sorts an array.


import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { selectionSort } from './algorithms/selectionSort';
import { mergeSort } from './algorithms/mergeSort';
import { quickSort } from './algorithms/quickSort';
import './App.css';

function App() {
  const minArraySize = 20;
  const maxArraySize = 150;
  const [arraySize, setArraySize] = useState(80);
  const [speed, setSpeed] = useState(4);  // sorting speed for animations
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble');  // bubbleSort is default
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);  // Sorted array for skipping
  const [originalArray, setOriginalArray] = useState([]);  // Copy of original array for resetting
  const [sortSteps, setSortSteps] = useState([]);  // animation steps of sorting
  const [isSorting, setIsSorting] = useState(false); 
  const [isDisabled, setDisableInput] = useState(false);
  const [isSortingComplete, setIsSortingComplete] = useState(false);

  const algorithms = ['Bubble', 'Insertion', 'Selection', 'Merge', 'Quick'];

  // Updates the state of the array size when the user selects a new size
  const handleArraySizeChange = (size) => {
    setArraySize(size);
  };

  // Updates the state of the speed when the user selects a new speed
  const handleSpeedChange = (speed) => {
    setSpeed(speed);
  };

  // Updates the selected algorithm when user selects a different one
  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  // Generates a new random array based on the current array size. 
  // It resets the sorting completion state and initializes the array, 
  // sorted array, and original array states with the new random values.
  // Uses a callback to ensure the latest array size is used when generating the array.
  const generateNewArray = useCallback(() => {
    setIsSortingComplete(false);
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 0.5 * (maxArraySize - minArraySize)) + 10);
    setArray(newArray);
    setSortedArray([]);
    setOriginalArray(newArray);
  }, [arraySize]);

  // Generates a new array whenever the arraySize is updated
  useEffect(() => {
    generateNewArray(); 
  }, [arraySize, generateNewArray]); 

  // Executes the selected sorting algorighm on the array.
  // Sets the sorting steps and the sorted Array.
  // Sets the DisabledInput, isSorting, and isSortingComplete states accordingly
  const handleSort = () => {
    let steps = [];
    let sorted = [];

    // Determine which sorting algorithm to use
    switch(selectedAlgorithm) {
      case 'Bubble':
        [steps, sorted] = bubbleSort(array);
        break;
      case 'Insertion':
        [steps, sorted] = insertionSort(array);
        break;
      case 'Selection':
        [steps, sorted] = selectionSort(array);
        break;
      case 'Merge':
        [steps, sorted] = mergeSort(array);
        break;
      case 'Quick':
        [steps, sorted] = quickSort(array);
        break;
      default:
        break;
    }

    setSortSteps(steps);
    setSortedArray(sorted);
    setDisableInput(true);  // disable input when sorting
    setIsSorting(true);
    setIsSortingComplete(false);
    };

  // Handles the completion of the sorting process.
  // It resets the input states, clears the sorting steps, and updates the array 
  // state with the sorted array.
  const handleSortingComplete = () => {
    setDisableInput(false);  // Enable input again
    setSortSteps([]);
    setIsSorting(false);
    setIsSortingComplete(true);  // Mark sorting as completed on current array
    setArray(sortedArray); // Update array state to sorted array
  };

  // Handles the reset of a sorted array to its original state.
  const handleResetArray = () => {
    setArray(originalArray);
    setSortedArray([]);
    setIsSortingComplete(false);
  };
  
  // Handles the skipping of the sorting process.
  const handleSkipSort = () => {
    setIsSorting(false);
  };

  return (
    <>
      <Header
        arraySize={arraySize}
        speed={speed}
        selectedAlgorithm={selectedAlgorithm}
        onArraySizeChange={handleArraySizeChange}
        onSpeedChange={handleSpeedChange}
        onAlgorithmChange={handleAlgorithmChange}
        onGenerateNewArray={generateNewArray}
        onSortArray={handleSort}
        onResetArray={handleResetArray}
        onSkipSort={handleSkipSort}
        algorithms={algorithms}
        maxArraySize={maxArraySize}
        minArraySize={minArraySize}
        isDisabled={isDisabled}
        isSortingComplete={isSortingComplete}
      />
      <SortingVisualizer 
        array={array}
        speed={speed}
        sortSteps={sortSteps}
        isSorting={isSorting}
        isSortingComplete={isSortingComplete}
        onSortingComplete={handleSortingComplete}
      />
    </>
  );
}

export default App;
