import { useState } from "react";
import data from "./data";
import "./App.css";

export default function App() {
  const [list1, setList1] = useState(data);
  const [list2, setList2] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceList, setSourceList] = useState(null);

  const handleDragStart = (item, listName) => {
    setDraggedItem(item);
    setSourceList(listName);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (destination) => {
    if (!draggedItem) {
      return;
    }
    if (destination === "list2" && sourceList === "list1") {
      setList1((prev) => prev.filter((item) => item.id !== draggedItem.id));
      setList2((prev) => [...prev, draggedItem]);
    } else if (destination === "list1" && sourceList === "list2") {
      setList2((prev) => prev.filter((item) => item.id !== draggedItem.id));
      setList1((prev) => [...prev, draggedItem]);
    }
    setDraggedItem(null);
    setSourceList(null);
  };
  return (
    <div className="App">
      <div className="main-container">
        <div
          className="first-list"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("list1")}
        >
          {list1.map((p) => (
            <div
              key={p.id}
              className="element"
              draggable="true"
              onDragStart={() => handleDragStart(p, "list1")}
            >
              {p.name}
            </div>
          ))}
        </div>
        <div
          className="second-list"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("list2")}
        >
          {list2.map((p) => (
            <div
              key={p.id}
              className="element"
              draggable="true"
              onDragStart={() => handleDragStart(p, "list2")}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
