import React from 'react';
import CanvasException from "./exceptions/CanvasException";
import './Canvas.css';

class Canvas extends React.Component {
   ctx = null;
   drops = [];
   canvas = null;
   fontSize = 10;
   characters = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM];'\\,./{}[:\"|<>?`~!@#$%^&*()_+".split("");


   getCanvas = () => {
      if (this.canvas == null) {
         this.canvas = document.getElementById(this.props.id);
      }

      return this.canvas;
   };

   getCtx = () => {
      if (this.ctx == null) {
         if (this.getCanvas() == null) {
            throw new CanvasException("No canvas");
         }

         this.ctx = this.getCanvas().getContext("2d");
      }

      return this.ctx;
   };

   recalibrateDrops = () => {
      let columns = this.getCanvas().width/this.fontSize;
      for(var x = 0; x < columns; x++) {
         this.drops[x] = (
            (typeof this.drops[x] === 'undefined') ? 1 : this.drops[x]
         );
      }
   };

   getDrops = () => {
      let columns = this.getCanvas().width/this.fontSize;
      if (this.drops.length === 0) {
         for(var x = 0; x < columns; x++) {
            this.drops[x] = (
               (typeof this.drops[x] === 'undefined') ? 1 : this.drops[x]
            );
         }
      }

      return this.drops;
   };

   recalibrateCanvas = () => {
      this.getCanvas().height = window.innerHeight;
      this.getCanvas().width = window.innerWidth;
      this.recalibrateDrops();
   };

   renderMatrixRain = () => {
      this.recalibrateCanvas();
      setInterval(this.draw, 33);
   };

   draw = () => {
      this.getCtx().fillStyle = "rgba(0, 0, 0, 0.05)";

      this.getCtx().fillRect(0, 0, this.getCanvas().width, this.getCanvas().height);

      this.getCtx().fillStyle = "#0F0";
      this.getCtx().font = this.fontSize + "px arial";

      for(let i = 0; i < this.getDrops().length; i++) {
         let text = this.characters[Math.floor(Math.random()*this.characters.length)];
         this.getCtx().fillText(text, i*this.fontSize, this.getDrops()[i]*this.fontSize);

         if(this.getDrops()[i]*this.fontSize > this.getCanvas().height && Math.random() > 0.975) {
            this.getDrops()[i] = 0;
         }

         this.getDrops()[i]++;
      }
   };

   componentDidMount = () => {
      try {
         this.renderMatrixRain();
         window.addEventListener("resize", this.recalibrateCanvas);
      } catch (e) {
         console.error(e.message);
      }
   };

   render = () => {
      return (
         <canvas id={this.props.id} />
      );
   }
}

export default Canvas;