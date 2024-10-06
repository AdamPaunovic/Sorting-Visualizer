import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import { bubbleSort } from './algorithms/bubbleSort';
import './App.css';


function App() {
  const minArraySize = 20;
  const maxArraySize = 150;
  const [arraySize, setArraySize] = useState(80);
  const [speed, setSpeed] = useState(4);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble');
  const [array, setArray] = useState([]);
  const [sortSteps, setSortSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isDisabled, setDisableInput] = useState(false);

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
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 0.5 * (maxArraySize - minArraySize) ) + 10);
    setArray(newArray);
  }, [arraySize] );

  useEffect(() => {
    generateNewArray(); 
  }, [arraySize, generateNewArray]); 

  const handleSort = () => {
    let steps = [];

    // Determine which sorting algorithm to use
    switch(selectedAlgorithm) {
      case 'Bubble':
        steps = bubbleSort(array);
        break;
      case 'Insertion':
        // steps = insertionSort(array);
        break;
      case 'Selection':
        // steps = selectionSort(array);
        break;
      case 'Merge':
        // steps = mergeSort(array);
        break;
      case 'Quick':
        //steps = quickSort(array);
        break;
      default:
        break;
    }

    setSortSteps(steps);
    setDisableInput(true);
    setIsSorting(true);
  };

  const handleSortingComplete = () => {
    setDisableInput(false);
    setSortSteps([]);
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
        algorithms={algorithms}
        maxArraySize={maxArraySize}
        minArraySize={minArraySize}
        isDisabled={isDisabled}
      />
      <SortingVisualizer 
        array={array}
        speed={speed}
        sortSteps={sortSteps}
        isSorting={isSorting}
        onSortingComplete={handleSortingComplete}
      />
    </>
  );
}

export default App;
