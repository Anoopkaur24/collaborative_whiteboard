import React, { useState } from 'react';

const Toolbar = ({ onChangeSize, onChangeColor, onErase }) => {
  const [penSize, setPenSize] = useState(5); // Default pen size
  const [penColor, setPenColor] = useState('#000000'); // Default pen color

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPenSize(newSize);
    onChangeSize(newSize);
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setPenColor(newColor);
    onChangeColor(newColor);
  };

  const handleEraseClick = () => {
    onErase();
  };

  return (
    <div className="toolbar">
      <label htmlFor="penSize">Pen Size:</label>
      <input
        type="range"
        id="penSize"
        name="penSize"
        min="1"
        max="20"
        value={penSize}
        onChange={handleSizeChange}
      />

      <label htmlFor="penColor">Pen Color:</label>
      <input
        type="color"
        id="penColor"
        name="penColor"
        value={penColor}
        onChange={handleColorChange}
      />

      <button onClick={handleEraseClick}>Erase</button>
    </div>
  );
};

export default Toolbar;
