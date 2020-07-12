export const drawShirt = (primaryColor, secondaryColor, idToDraw) => {
  var canvas = document.getElementById(`${idToDraw}`);
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(65, 10);
    ctx.lineTo(85, 10);
    ctx.lineTo(130, 50); // höger first ärm
    ctx.lineTo(110, 65); // höger andra ärm
    ctx.lineTo(100, 55); // höger tredje ärm
    ctx.lineTo(100, 120); // botten höger
    ctx.lineTo(50, 120);  // botten vänster
    ctx.lineTo(50, 55); // höger tredje ärm
    ctx.lineTo(40, 65);  // vänster andra ärm
    ctx.lineTo(20, 50);  // vänster andra ärm
    ctx.fillStyle = `${primaryColor}`
    ctx.fill();

    //line

    ctx.strokeStyle = `${secondaryColor}`;
      ctx.lineWidth = 12
      ctx.lineCap = 'round'
      ctx.beginPath();
      ctx.moveTo(100, 30);
      ctx.lineTo(53, 90);
      ctx.stroke();
  }
}