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
    onResetArray,
    onSkipSort,
    algorithms,
    maxArraySize,
    minArraySize,
    isDisabled,
    isSortingComplete
}) => {
    return (
        <header className="header">

            <div className="btn-container">
                <button 
                    id="generateArrBtn" 
                    className="controlBtn"
                    disabled={isDisabled} 
                    onClick={onGenerateNewArray}>
                    Generate New Array
                </button>
                <button 
                    id="sortBtn" 
                    className="controlBtn"
                    disabled={isDisabled} 
                    onClick={onSortArray}>
                    Sort!
                </button>
            </div>

            <div className="btn-container">
                <button 
                    id="resetBtn" 
                    className="controlBtn" 
                    disabled={!isSortingComplete} 
                    onClick={onResetArray}>
                    Reset
                </button>
                <button 
                    id="skipBtn" 
                    className="controlBtn" 
                    disabled={!isDisabled} 
                    onClick={onSkipSort}>
                    Skip
                </button>
            </div>
            

            {/* Array Controls */}
            <div className="array-inputs">
                {/* Size Slider */}
                <label id="sizeLabel" htmlFor="arrSizeSlider">Array size: {arraySize}</label>
                <input 
                    className="slider"
                    id="arrSizeSlider" 
                    type="range" 
                    min={minArraySize} 
                    max={maxArraySize} 
                    step={1} 
                    value={arraySize}
                    onChange={(e) => onArraySizeChange(Number(e.target.value))}
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                        disabled={isDisabled}
                    >
                        {algorithm}
                    </button>
                ))}
            </div>
        </header>
    );
}

export default Header;