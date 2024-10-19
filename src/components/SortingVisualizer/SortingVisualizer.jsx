import React, { useState, useEffect, useCallback, useRef } from "react";
import ArrayDisplay from "../ArrayDisplay/ArrayDisplay";
import InfoSection from "../InfoSection/InfoSection";
import './SortingVisualizer.css';

const SortingVisualizer = ({ array, speed, sortSteps, isSorting, onSortingComplete, isSortingComplete }) => {
    const [barColors, setBarColors] = useState([]); 
    const [currentArray, setCurrentArray] = useState(array);  // Maintain current array state
    const sortingRef = useRef(isSorting);

    const getBaseSpeed = () => {
        // Minimum baseSpeed for array size of 20
        const minBaseSpeed = 4; 
        // Maximum baseSpeed for array size of 150
        const maxBaseSpeed = 25; 
    
        // Linear interpolation
        return minBaseSpeed + (maxBaseSpeed - minBaseSpeed) * ((array.length - 20) / (150 - 20));
    };
    
    const getSpeedFactor = () => {
        const baseSpeed = getBaseSpeed(array.length);
        const speedFactor = baseSpeed / (5 * (6 - speed));
        return speedFactor;
    };

    const speedFactor = getSpeedFactor();

    useEffect(() => {
        sortingRef.current = isSorting; 
    }, [isSorting]);

    // Animate the sorting steps using requestAnimationFrame
    const animateSorting = useCallback((steps) => {
        let i = 0;
        let lastFrameTime = performance.now();
        let delay = 1000 / (speedFactor * 10)
        const decayFactor = 0.995;

        function animateStep(timestamp) {
            // If all steps are done or sorting stopped, complete sorting
            if (i >= steps.length || !sortingRef.current) {
                onSortingComplete();  
                return;
            }

            // Calculate the time elapsed since the last frame
            const elapsedTime = timestamp - lastFrameTime;


            // Only proceed if enough time has passed
            if (elapsedTime < delay) { 
                requestAnimationFrame(animateStep); // Request the next frame
                return;
            }

            lastFrameTime = timestamp; // Update the last frame time

            delay *= decayFactor;  // Decrease delay gradually

            for (let j = 0; j < speedFactor && i < steps.length; j++) {
                const [barOneIdx, barTwoIdx, action, colors] = steps[i];
                
                // Update bar colors based on action
                setBarColors((prevBarColors) => {
                    const newBarColors = [...prevBarColors];

                    let temp = newBarColors[barOneIdx]; 
                    switch (action) {
                        case "revert":
                            // Revert bar colors to default color
                            newBarColors[barOneIdx] = "lawngreen";
                            newBarColors[barTwoIdx] = "lawngreen";
                            break;
                        case "final":
                            // Mark bars as final (sorted)
                            newBarColors[barOneIdx] = "green";
                            if (barTwoIdx !== -1) {
                                newBarColors[barTwoIdx] = "lawngreen";  // Reverts barTwoIdx for smoother animation
                            }
                            break;
                        case "highlight":
                            // Highlight bars for specific action (Ex. As a key for insertion sort)
                            newBarColors[barOneIdx] = colors[0];
                            if (barTwoIdx !== -1) {
                                newBarColors[barTwoIdx] = colors[1];
                            }
                            break;
                        case "highlightRange":
                            const mid = Math.floor((barOneIdx + barTwoIdx) / 2);
                            newBarColors.fill(colors[0], barOneIdx, mid + 1);
                            newBarColors.fill(colors[1], mid + 1, barTwoIdx + 1);
                            break;
                        case "revertRange":
                            newBarColors.fill("lawngreen", barOneIdx, barTwoIdx + 1);
                            break;
                        case "swap":
                            // Swap the colors of the bars
                            newBarColors[barOneIdx] = newBarColors[barTwoIdx];
                            newBarColors[barTwoIdx] = temp;
                            break;
                        case "insert":
                            // Insert color at barOneIdx into barTwoIdx position
                            newBarColors.splice(barTwoIdx, 0, newBarColors.splice(barOneIdx, 1)[0]);
                            newBarColors[barTwoIdx] = colors[0];
                            if (colors.length === 2) {
                                newBarColors[barOneIdx + 1] = colors[1];
                            }
                            break;
                        default:
                            break;
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
                // Handle shift actions
                else if (action === "shift") {
                    setCurrentArray((prevArray) => {
                        const newArray = [...prevArray];
                        // Shift barOneIdx bar to barTwoIdx position
                        newArray[barTwoIdx] = newArray[barOneIdx];
                        return newArray;  // Return the new array state for re-render
                    });
                }
                // Handle insert actions
                else if (action === "insert") {
                    setCurrentArray((prevArray) => {
                        const newArray = [...prevArray];
                        // Insert barOneIdx bar into barTwoIdx position
                        newArray.splice(barTwoIdx, 0, newArray.splice(barOneIdx, 1)[0]);
                        return newArray;  // Return the new array state for re-render
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
