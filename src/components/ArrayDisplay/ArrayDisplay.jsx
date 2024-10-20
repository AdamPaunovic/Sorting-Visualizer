// ArrayDisplay.jsx
// 
// Author: Adam Paunovic
// Date: 2024-10-20
//
// Description: This component displays an array of values as vertical bars. 
//              Each bar's height corresponds to the value in the array, 
//              and each bar can have a different color based on the provided barColors array.
// 
// Props:
// - array: An array of numbers representing the heights of the bars.
// - barColors: An array of color values corresponding to each bar in the array.

import React from 'react';
import './ArrayDisplay.css';

const ArrayDisplay = ({ array, barColors }) => {

    const margin_size = 0.2;

    return (
      <div className="array-display">
        {array.map((value, index) => (
          <div 
            className="bar" 
            key={index} 
            style={
                { 
                    margin: `0% ${margin_size}%`,
                    width: `${100/array.length - (2 * margin_size)}%`,
                    height: `${value}%`,
                    backgroundColor: barColors[index]
                }
            } 
          />
        ))}
      </div>
    );
  };
  
  export default ArrayDisplay;
