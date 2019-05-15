export default class  CanvasException implements Error {
   message = "Default message";

   constructor(message) {
      this.message = message;
   }
}