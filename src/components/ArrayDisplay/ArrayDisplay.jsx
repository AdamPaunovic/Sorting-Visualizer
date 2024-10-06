import React from 'react';
import './ArrayDisplay.css';

const ArrayDisplay = ({ array }) => {

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
                    height: `${value}%`
                }
            } 
          />
        ))}
      </div>
    );
  };
  
  export default ArrayDisplay;
