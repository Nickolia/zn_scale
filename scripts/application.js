var data = function(){}
data.prototype.options = {
    isPercent : true,
    lenghtScale : 10,
    percentScale : 10,
    value : 5.8,
    numberInACircle : true,
    firstNumber: 0,
    idElement : "myCanvas",
    canvasSize : 500,
    scaleRadius : 800,
    arrowColor: "#628398"
}
data.prototype.canvasDrow = function(){
    var c=document.getElementById(this.options.idElement);
    var ctx=c.getContext("2d");
    this.options.canvasSize = this.options.canvasSize < 250 ? 250 : this.options.canvasSize
    c.width = this.options.canvasSize;
    c.height = this.options.canvasSize;
    var step = 1.36 / (!this.options.isPercent ? (this.options.lenghtScale - this.options.firstNumber) : (100 / this.options.percentScale)),
        beginScale = 0.75,
        endScale;
    this.options.scaleRadius = this.options.scaleRadius <= this.options.canvasSize - 60 ? this.options.scaleRadius : this.options.canvasSize - 60;
    numbersDraw = this.options.numberInACircle ? this.options.scaleRadius/2 - this.options.scaleRadius/30 : this.options.scaleRadius/2 + this.options.scaleRadius/30;
    for(var i = this.options.firstNumber; i <= this.options.lenghtScale; i++){
            endScale = (beginScale + step) > 2 ? (beginScale + step) - 2 : beginScale + step;
        ctx.beginPath();
        ctx.lineWidth =  this.options.scaleRadius/80;
        ctx.arc(this.options.canvasSize/2,this.options.canvasSize/2, this.options.scaleRadius/2,(i == this.options.firstNumber ? beginScale + step/2 : beginScale )*Math.PI,(i == this.options.lenghtScale ? endScale - step/2 : endScale )*Math.PI);
        ctx.strokeStyle = this.options.value >= i ? '#666666' : '#'+((1<<24)*Math.random()|0).toString(16);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = this.options.scaleRadius/40;
        ctx.arc(c.width/2,c.height/2,numbersDraw,(beginScale+(step/2-(step/100)))*Math.PI,(beginScale+(step/2+(step/100)))*Math.PI);
        ctx.strokeStyle = '#666666';
        ctx.stroke();
        beginScale = endScale;
    }

    ctx.beginPath();
    ctx.translate(this.options.canvasSize/2, this.options.canvasSize/2);
    ctx.font = this.options.scaleRadius/30 < 9 ? 9 : this.options.scaleRadius/30 + 'px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if(!this.options.isPercent){
        for (var n = this.options.firstNumber; n <= this.options.lenghtScale; n++) {
            var numbersRadius = this.options.numberInACircle ? this.options.scaleRadius/2 - this.options.scaleRadius/15 : this.options.scaleRadius/2 + this.options.scaleRadius/15
            var theta = (n - this.options.lenghtScale * 0.135)  * (Math.PI * 2) / this.options.lenghtScale * 0.68;
            var x = -numbersRadius * Math.cos(theta);
            var y = -numbersRadius * Math.sin(theta);
            ctx.fillText(n, x, y);
        }
    } else {
        var countPercentStep = 100 / this.options.percentScale
        for (var n = 0; n <= countPercentStep; n++) {
            var numbersRadius = this.options.numberInACircle ? this.options.scaleRadius/2 - this.options.scaleRadius/15 : this.options.scaleRadius/2 + this.options.scaleRadius/15
            var theta = (n - this.options.lenghtScale * 0.135)  * (Math.PI * 2) / this.options.lenghtScale * 0.68;
            var x = -numbersRadius * Math.cos(theta);
            var y = -numbersRadius * Math.sin(theta);
            ctx.fillText(n*this.options.percentScale+"%", x, y);
        }
    }

    ctx.stroke();
    if (this.options.lenghtScale < this.options.value || this.options.firstNumber > this.options.value) {
        throw new Error("Value incorrect");
    } else {
        ctx.beginPath();
        if(!this.options.isPercent){
            ctx.rotate((-123 + (244 / (this.options.lenghtScale - this.options.firstNumber) * this.options.value )) * (Math.PI/180));
        } else {
            ctx.rotate((-123 + (244 / 100 * this.options.value )) * (Math.PI/180));
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.options.arrowColor;
        ctx.fillStyle = this.options.arrowColor;
        ctx.moveTo(-(this.options.scaleRadius /60), -(this.options.scaleRadius / 60));
        ctx.lineTo(0, -numbersDraw);
        ctx.lineTo(this.options.scaleRadius /60, this.options.scaleRadius / 60);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.translate(-this.options.canvasSize/2, -this.options.canvasSize/2);

        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.arc(this.options.canvasSize/2,this.options.canvasSize/2, this.options.scaleRadius/30,2*Math.PI,false);
        ctx.fillStyle = this.options.arrowColor;
        ctx.fill();
        ctx.strokeStyle = this.options.arrowColor;
        ctx.stroke();
    }

}

var dataThink = new data();
dataThink.canvasDrow();