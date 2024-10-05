import React from "react";
import './Header.css'

const Header = ({
    arraySize, 
    speed, 
    selectedAlgorithm, 
    onArraySizeChange, 
    onSpeedChange, 
    onAlgorithmChange, 
    onGenerateNewArray, 
    onSortArray,
    algorithms
}) => {
    return (
        <header className="header">

            <div className="button-container">
                <button id="generateArrBtn" onClick={onGenerateNewArray}>Generate New Array</button>
                <button id="sortBtn" onClick={onSortArray}>Sort!</button>
            </div>
            

            {/* Array Controls */}
            <div className="array-inputs">
                {/* Size Slider */}
                <label id="sizeLabel" htmlFor="arrSizeSlider">Array size: {arraySize}</label>
                <input 
                    className="slider"
                    id="arrSizeSlider" 
                    type="range" 
                    min={20} 
                    max={300} 
                    step={1} 
                    value={arraySize}
                    onChange={(e) => onArraySizeChange(Number(e.target.value))}
                />

                {/* Speed Slider */}
                <label id="speedLabel" htmlFor="arrSpeedSlider">Speed: {speed}</label>
                <input 
                    className="slider"
                    id="arrSpeedSlider" 
                    type="range" 
                    min={1} 
                    max={5} 
                    step={1} 
                    value={speed}
                    onChange={(e) => onSpeedChange(Number(e.target.value))} 
                />
            </div>

            <h1>Sorting Visualizer</h1>

            {/* Sorting Algorithm Selection */}
            <div className="algorithm-section">
                {algorithms.map((algorithm) => (
                    <button
                        key={algorithm}
                        className={`algorithmBtn ${selectedAlgorithm === algorithm ? 'selected' : ''}`}
                        onClick={() => onAlgorithmChange(algorithm)}
                    >
                        {algorithm}
                    </button>
                ))}
            </div>
        </header>
    );
}

export default Header;