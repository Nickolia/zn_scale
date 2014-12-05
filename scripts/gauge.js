var znCircleScaleClass = function ( ) { };

// create Options for Scale
znCircleScaleClass.prototype.options = {
    isPercent : false, //is Percent scale?
    firstNumber: 1, //first number for nonPercent scale
    lenghtScale : 20, // last number for nonPercent scale
    percentScaleStap : 10, // stap for percent scale
    numberScaleStap : 1, // this option in the development of
    value : 4, // value for scale
    numberInACircle : true, // number in/out
    idElement : "myCanvas", // name for parent Element *
    idElementCanvas : "gauge", //canvas element (optionalaty)
    canvasSize : 500, // canvas size
    scaleDiameter : 800, // diameter Scale
    arrowColor: "#628398", //color scale arrow
    fonts: "Arial" // font :)
};
// Draw Scale
znCircleScaleClass.prototype.canvasDrow = function(){
    if(document.getElementById(this.options.idElementCanvas) == undefined){ this.getDomObj()}
    var c = document.getElementById(this.options.idElementCanvas);
    var ctx = c.getContext("2d");
    this.options.canvasSize = this.options.canvasSize < 250 ? 250 : this.options.canvasSize
    c.width = this.options.canvasSize + (this.options.canvasSize/5);
    c.height = this.options.canvasSize;
    this.options.scaleDiameter = this.options.scaleDiameter <= this.options.canvasSize - 80 ? this.options.scaleDiameter : this.options.canvasSize - 80;
    numbersDraw = this.options.numberInACircle ? this.options.scaleDiameter/2 - this.options.scaleDiameter/35 : this.options.scaleDiameter/2 + this.options.scaleDiameter/35;
    var numberstap = 0 - (this.options.firstNumber),
        lenghtScaleStap = !this.options.isPercent ? (this.options.lenghtScale - this.options.firstNumber) / this.options.numberScaleStap : (100 / this.options.percentScaleStap),
        stap = 270 / lenghtScaleStap,
        beginScale = 135,
        valueFalseNum = (this.options.lenghtScale < this.options.value || this.options.firstNumber > this.options.value),
        valueFalsePer = (this.options.value < 100 && this.options.value > 0),
        endScale;

    //Draw Arc and Scale
    for(var i = 0; i <= lenghtScaleStap; i++ ){
        endScale = i == lenghtScaleStap || i == 0 ? beginScale + stap/2 : beginScale + stap;
        ctx.beginPath();
        ctx.lineWidth =  this.options.scaleDiameter/80;
        ctx.arc(c.width/2, this.options.canvasSize/2, this.options.scaleDiameter/2, beginScale * (Math.PI / 180), endScale * (Math.PI / 180));
        ctx.strokeStyle = this.options.value >= (!this.options.isPercent ? i - numberstap : i * this.options.percentScaleStap) ? '#666666' : '#'+((1<<24)*Math.random()|0).toString(16);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = this.options.scaleDiameter/40;
        ctx.arc(c.width/2,this.options.canvasSize/2,numbersDraw, (i == 0 ? beginScale : (beginScale+(stap/2-(stap/100))))* (Math.PI / 180), (i == 0 ? (beginScale+(stap/50)) : (beginScale+(stap/2+(stap/100)))) * (Math.PI / 180));
        ctx.strokeStyle = '#666666';
        ctx.stroke();
        beginScale = endScale;
    }

    //Draw Number Scale
    ctx.beginPath();
    ctx.translate(c.width/2, this.options.canvasSize/2);
    ctx.font = this.options.scaleDiameter/30 < 9 ? 9 : this.options.scaleDiameter/30 + 'px '+ this.options.fonts;
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (var n = 0; n <= lenghtScaleStap; n++) {
        var numbersRadius = this.options.numberInACircle ? this.options.scaleDiameter/2 - this.options.scaleDiameter/12 : this.options.scaleDiameter/2 + this.options.scaleDiameter/12
        var theta = (n - lenghtScaleStap * 0.167)  * (Math.PI * 2) / lenghtScaleStap * 0.75;
        var x = -numbersRadius * Math.cos(theta);
        var y = -numbersRadius * Math.sin(theta);
        !this.options.isPercent ? ctx.fillText((n - numberstap)*this.options.numberScaleStap, x, y) : ctx.fillText(n*this.options.percentScaleStap+"%", x, y);
    }
    ctx.stroke();

    // Draw value
    ctx.beginPath();
    ctx.font = this.options.scaleDiameter/20 < 9 ? 9 : this.options.scaleDiameter/20 + 'px '+ this.options.fonts;
    ctx.fillStyle = !this.options.isPercent ? (valueFalseNum ? '#b04040' :  '#000'): (!valueFalsePer ? '#b04040' :  '#000');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(!this.options.isPercent ? this.options.value : this.options.value + "%", 0, !this.options.isPercent ? (valueFalseNum ? -40 : 40) : (!valueFalsePer ? -40 : 40));
    ctx.stroke();

    //Draw Arrow
    ctx.beginPath();
    if(!this.options.isPercent){
        if(!valueFalseNum){
            ctx.rotate((-135 + (270 /  lenghtScaleStap * (numberstap + this.options.value) )) * (Math.PI/180));
        } else if(this.options.lenghtScale < this.options.value){
            ctx.rotate(150 * (Math.PI/180));
        } else {
            ctx.rotate(-150 * (Math.PI/180));
        }
    } else {
        if(valueFalsePer){
            ctx.rotate((-135 + (270 / 100 * this.options.value )) * (Math.PI/180));
        } else if(this.options.value > 100){
            ctx.rotate(150 * (Math.PI/180));
        } else {
            ctx.rotate(-150 * (Math.PI/180));
        }
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = !this.options.isPercent ? (valueFalseNum ? '#b04040' :   this.options.arrowColor): (!valueFalsePer ? '#b04040' : this.options.arrowColor);
    ctx.fillStyle = !this.options.isPercent ? (valueFalseNum ? '#b04040' :   this.options.arrowColor): (!valueFalsePer ? '#b04040' : this.options.arrowColor);
    ctx.moveTo(-(this.options.scaleDiameter /60), -(this.options.scaleDiameter / 60));
    ctx.lineTo(0, -numbersDraw);
    ctx.lineTo(this.options.scaleDiameter /60, this.options.scaleDiameter / 60);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.translate(-c.width/2, -this.options.canvasSize/2);

    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.arc(c.width/2,this.options.canvasSize/2, this.options.scaleDiameter/30,2*Math.PI,false);
    ctx.fillStyle = !this.options.isPercent ? (valueFalseNum ? '#b04040' :   this.options.arrowColor): (!valueFalsePer ? '#b04040' : this.options.arrowColor);
    ctx.fill();
    ctx.strokeStyle = !this.options.isPercent ? (valueFalseNum ? '#b04040' :   this.options.arrowColor): (!valueFalsePer ? '#b04040' : this.options.arrowColor);
    ctx.stroke();

};
znCircleScaleClass.prototype.getDomObj = function(){
	var randomNumber = Math.floor(Math.random() * (0 - 10000 + 1)) + 0,
		canvas = document.createElement("canvas"),
		parentElement = document.getElementById(this.options.idElement);
	parentElement.appendChild(canvas);
	canvas.id = "gauge" + randomNumber;
	this.options.idElementCanvas = "gauge" + randomNumber
};
