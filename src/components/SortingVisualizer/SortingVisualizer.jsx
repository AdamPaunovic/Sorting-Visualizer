import React, { useState, useEffect, useCallback } from "react";
import ArrayDisplay from "../ArrayDisplay/ArrayDisplay";
import InfoSection from "../InfoSection/InfoSection";
import './SortingVisualizer.css';

const SortingVisualizer = ({ array, speed, sortSteps, isSorting, onSortingComplete }) => {

    const [barColors, setBarColors] = useState(Array(array.length).fill('turquoise')); // Initialize all bars with the default color

    const calcDelayTime = () => {
        let scaledSpeed;
        
        switch(speed) {
            case 1:
                scaledSpeed = 10;
                break;
            case 2: 
                scaledSpeed = 100;
                break;
            case 3: 
                scaledSpeed = 500;
                break;
            case 4:
                scaledSpeed = 1000;
                break;
            case 5:
                scaledSpeed = 2000;
                break;
            default:
                break;
        }

        return 10000/(Math.floor(array.length/10) * scaledSpeed);
    };

    const delayTime = calcDelayTime();

    // Function to animate the sorting steps
    const animateSorting = useCallback((steps) => {
        for (let i = 0; i < steps.length; i++) {
            const [barOneIdx, barTwoIdx, action] = steps[i];
    
            setTimeout(() => {
                // Use functional updates for barColors
                setBarColors((prevBarColors) => {
                    const newBarColors = [...prevBarColors];
    
                    if (action === "compare") {
                        newBarColors[barOneIdx] = "red";
                        newBarColors[barTwoIdx] = "red";
                    } 
                    else if (action === "revert") {
                        newBarColors[barOneIdx] = "turquoise";
                        newBarColors[barTwoIdx] = "turquoise";
                    } 
                    else if (action === "final") {
                        newBarColors[barOneIdx] = "green";
                    }
    
                    return newBarColors;  // Return the updated colors
                });
    
                if (action === "swap") {
                    const bar1 = document.getElementsByClassName("bar")[barOneIdx];
                    const bar2 = document.getElementsByClassName("bar")[barTwoIdx];
                    const bar1Height = bar1.style.height;
                    const bar2Height = bar2.style.height;
                    bar1.style.height = bar2Height;
                    bar2.style.height = bar1Height;
                }
    
                // Sorting is complete, notify parent component
                if (i === steps.length - 1) {
                    onSortingComplete();
                }
            }, i * delayTime);
        }
    }, [onSortingComplete, delayTime]);
    

    useEffect(() => {
        if (isSorting && sortSteps.length > 0) {
            animateSorting(sortSteps);
        }
    }, [isSorting, sortSteps, animateSorting]);

    useEffect(() => {
        setBarColors(Array(array.length).fill('turquoise'));
    }, [array]);

    return (
        <div className="sorting-visualizer">
            <div className="info-section-1">
                <InfoSection />
            </div>
            <div className="array-container">
                <ArrayDisplay array={array} barColors={barColors} />
            </div>
            <div className="info-section-2">
                <InfoSection />
            </div>
        </div>
    );
};

export default SortingVisualizer;
