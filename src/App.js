import React from 'react';
import './App.css';
import Canvas from "./Canvas";
import Widget from "./Widget";

const App = () => {
   let id = 'canvasina';

   return (
      <div className={'absolutist'}>
         <Canvas id={id} />
         <Widget/>
      </div>
   );
};

export default App;
