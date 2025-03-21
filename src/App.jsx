import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [list, setList] = useState(
    Array.from({ length: 10 }, (_, i) => ({ id: i, value: i + 1 }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
    setIsDragging(true);
  };
  const handleDragOver = (index, e) => {
    e.preventDefault();
    setHoveredIndex(index);
  };
  const handleDrop = () => {
    if (draggedIndex === null || hoveredIndex === null) return;
    const updatedList = [...list];
    const [draggedItem] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(hoveredIndex, 0, draggedItem);
    setList(updatedList);
    setDraggedIndex(null);
    setHoveredIndex(null);
    setIsDragging(false);
  };

  return (
    <div className="main-container">
      <h1>Sortable List Using Drag and Drop</h1>
      <div className="list">
        {list.map((item, index) => (
          <div
            key={item.id}
            className={`element ${hoveredIndex === index ? "hovered" : ""} ${
              isDragging && draggedIndex === index ? "dragged" : ""
            }`}
            draggable="true"
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDrop={handleDrop}
            onDragEnd={() => {
              setDraggedIndex(null);
              setHoveredIndex(null);
              setIsDragging(false);
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
