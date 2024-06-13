import React, { useState } from 'react';
import Whiteboard from './components/Whiteboard';
import Toolbar from './components/Toolbar';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [penSize, setPenSize] = useState(5); // Default pen size
  const [penColor, setPenColor] = useState('#000000'); // Default pen color

  const handleChangeSize = (newSize) => {
    setPenSize(newSize);
  };

  const handleChangeColor = (newColor) => {
    setPenColor(newColor);
  };

  return (
    <div className="App">
      <Toolbar onChangeSize={handleChangeSize} onChangeColor={handleChangeColor} />
      <Whiteboard socket={socket} penSize={penSize} penColor={penColor} />
    </div>
  );
}

export default App;
