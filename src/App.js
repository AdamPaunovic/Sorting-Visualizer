import React from 'react';
import Header from './components/Header/Header';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <SortingVisualizer/>
    </div>
  );
}

export default App;
