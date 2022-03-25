import classes from './App.module.css';
import Board from './components/Board';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  let r;
  let c;
  const [ row, setRow ] = useState(10);

  let obstacles = [];
  for (r = 0; r < row; r++){
      let temp = [];
      for (c = 0; c < row; c++){
          temp.push(false);
      }
      obstacles.push(temp);
  }

  let weights = [];
  for (r = 0; r < row; r++){
    let temp = [];
    for (c = 0; c < row; c++){
        temp.push(0);
      }
      weights.push(temp);
    }

  return (
    < BrowserRouter >
      <main>
        < Routes>
          < Route path="/" element={ <Board row={ row } setRow={ setRow } obstacles={ obstacles } weights={ weights } randomNum={ Date.now() }/> } /> 
        </ Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;