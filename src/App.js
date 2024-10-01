import React, {useState} from 'react';
import Header from './components/Header/Header';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import './App.css';


function App() {
  const [arraySize, setArraySize] = useState(80);
  const [speed, setSpeed] = useState(4);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble');
  const [array, setArray] = useState([]);

  const algorithms = ['Bubble', 'Insertion', 'Selection', 'Merge', 'Quick'];

  const handleArraySizeChange = (size) => {
    setArraySize(size);
    generateNewArray(size);
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);
  };

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
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
        algorithms={algorithms}
      />
      {/* <SortingVisualizer 
        array={array}
        speed={speed}
        selectedAlgorithm={selectedAlgorithm}
      /> */}
    </>
  );
}

export default App;
