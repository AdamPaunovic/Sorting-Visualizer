import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { selectionSort } from './algorithms/selectionSort';
import { mergeSort } from './algorithms/mergeSort';
import './App.css';

function App() {
  const minArraySize = 20;
  const maxArraySize = 150;
  const [arraySize, setArraySize] = useState(80);
  const [speed, setSpeed] = useState(4);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble');
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [sortSteps, setSortSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isDisabled, setDisableInput] = useState(false);
  const [isSortingComplete, setIsSortingComplete] = useState(false);

  const algorithms = ['Bubble', 'Insertion', 'Selection', 'Merge', 'Quick'];

  const handleArraySizeChange = (size) => {
    setArraySize(size);
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);
  };

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const generateNewArray = useCallback(() => {
    setIsSortingComplete(false);
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 0.5 * (maxArraySize - minArraySize)) + 10);
    setArray(newArray);
    setSortedArray([]);
    setOriginalArray(newArray);
  }, [arraySize]);

  useEffect(() => {
    generateNewArray(); 
  }, [arraySize, generateNewArray]); 

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
        // steps = quickSort(array);
        break;
      default:
        break;
    }

    setSortSteps(steps);
    setSortedArray(sorted);
    setDisableInput(true);
    setIsSorting(true);
    setIsSortingComplete(false);
    };

  const handleSortingComplete = () => {
    setDisableInput(false);
    setSortSteps([]);
    setIsSorting(false);
    setIsSortingComplete(true);
    setArray(sortedArray); // Update array state here
  };

  const handleResetArray = () => {
    setArray(originalArray);
    setSortedArray([]);
    setIsSortingComplete(false);
  };
  
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
