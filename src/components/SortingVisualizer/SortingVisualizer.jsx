import React, { useState, useEffect, useCallback, useRef } from "react";
import ArrayDisplay from "../ArrayDisplay/ArrayDisplay";
import InfoSection from "../InfoSection/InfoSection";
import './SortingVisualizer.css';

const SortingVisualizer = ({ array, speed, sortSteps, isSorting, onSortingComplete, isSortingComplete }) => {
    const [barColors, setBarColors] = useState([]); 
    const [currentArray, setCurrentArray] = useState(array);  // Maintain current array state
    const sortingRef = useRef(isSorting);

    // Function to adjust animation speed based on the speed setting
    const getSpeedFactor = () => {
        switch(speed) {
            case 1: return 1;
            case 2: return 2;
            case 3: return 5;
            case 4: return 10;
            case 5: return 30;
            default: return 5;
        }
    };

    const speedFactor = getSpeedFactor();

    useEffect(() => {
        sortingRef.current = isSorting; 
    }, [isSorting]);

    // Animate the sorting steps using requestAnimationFrame
    const animateSorting = useCallback((steps) => {
        let i = 0;

        function animateStep() {
            if (i >= steps.length || !sortingRef.current) {
                onSortingComplete();  
                return;
            }

            for (let j = 0; j < speedFactor && i < steps.length; j++) {
                const [barOneIdx, barTwoIdx, action] = steps[i];
                
                // Update bar colors based on action
                setBarColors((prevBarColors) => {
                    const newBarColors = [...prevBarColors];
                    if (action === "compare") {
                        newBarColors[barOneIdx] = "red";
                        newBarColors[barTwoIdx] = "red";
                    } else if (action === "revert") {
                        newBarColors[barOneIdx] = "lawngreen";
                        newBarColors[barTwoIdx] = "lawngreen";
                    } else if (action === "final") {
                        newBarColors[barOneIdx] = "green";
                    }
                    return newBarColors;
                });

                // Handle swap actions
                if (action === "swap") {
                    setCurrentArray((prevArray) => {
                        const newArray = [...prevArray];
                        // Swap the elements in the array
                        const temp = newArray[barOneIdx];
                        newArray[barOneIdx] = newArray[barTwoIdx];
                        newArray[barTwoIdx] = temp;
                        return newArray;  // Return new array state for re-render
                    });
                }

                i++;  // Move to the next step
            }
            if (sortingRef.current) {
                requestAnimationFrame(animateStep);  
            }
        }
        if (sortingRef.current) {
            requestAnimationFrame(animateStep);  
        }
    }, [onSortingComplete, speedFactor]);

    // Trigger the animation when sorting starts
    useEffect(() => {
        if (isSorting && sortSteps.length > 0) {
            animateSorting(sortSteps);
        }
    }, [isSorting, sortSteps, animateSorting]);

    // Initialize bar colors when the array changes
    useEffect(() => {
        setCurrentArray(array);
        // Initialize the bar colors based on whether sorting is complete
        if (isSortingComplete) {
            setBarColors(Array(array.length).fill('green'));
        } else {
            setBarColors(Array(array.length).fill('lawngreen'));
        }
    }, [array, isSortingComplete]);

    return (
        <div className="sorting-visualizer">
            <div className="info-section-1">
                <InfoSection />
            </div>
            <div className="array-container">
                <ArrayDisplay array={currentArray} barColors={barColors} />
            </div>
            <div className="info-section-2">
                <InfoSection />
            </div>
        </div>
    );
};

export default SortingVisualizer;
