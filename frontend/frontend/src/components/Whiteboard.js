import React, { useRef, useEffect, useState } from 'react';

const Whiteboard = ({ socket, penSize, penColor }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = penColor; // Set initial pen color
    context.lineWidth = penSize; // Set initial pen size
    contextRef.current = context;
  }, [penSize, penColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    socket.emit('draw', {
      x0: offsetX,
      y0: offsetY,
      x1: offsetX,
      y1: offsetY,
      color: penColor,
      size: penSize,
    });
  };

  const handleErase = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('erase');
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
    />
  );
};

export default Whiteboard;
