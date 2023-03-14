import { useState } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [undid, setUndid] = useState([]);

  function handleClick(event) {
    const newDot = {
      axisX: event.clientX,
      axisY: event.clientY,
    }

    setList((prev) => [...prev, newDot]);
    setUndid([]);
  }

  function handleUndo(event){
    event.stopPropagation();

    if (list.length === 0) {
      return;
    } 

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });

  }

  function handleRedo(event) {
    event.stopPropagation();

    if (undid.length === 0) {
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setList((prev) => [...prev, recoveredDot]);
  }

  return (
    <div id="page" onClick={handleClick} >
      <button onClick={ handleUndo }>Desfazer</button>
      <button onClick={ handleRedo }>Refazer</button>
      {list.map((item) => (
        <span
          className="square-dot"
          style={{ left: item.axisX, top: item.axisY }}
        />
      ))}
    </div>
  );
}

export default App;
