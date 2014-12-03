var data = function(){

}
data.prototype.options = {
    isPercent : false,
    lenghtScale : 25,
    percentScale : 10,
    value : 10,
    numberInACircle : true,
    idElement : "myCanvas"
}
data.prototype.canvasDrow = function(){
    var c=document.getElementById(this.options.idElement);
    var ctx=c.getContext("2d");
    c.width = 1000;
    c.height = 1000;
    if(!this.options.isPercent){
        var step = 1.5 / this.options.lenghtScale,
            beginScale = 0.75,
            endScale
        numbersDraw = this.options.numberInACircle ? 230 : 270;
        for(var i = 1; i <= this.options.lenghtScale; i++){
            endScale = beginScale + step;
            endScale = endScale > 2 ? endScale - 2 : endScale;
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(500,375,250,beginScale*Math.PI,endScale*Math.PI);
            ctx.strokeStyle = this.options.value >= i ? '#666666' : '#'+((1<<24)*Math.random()|0).toString(16);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(500,375,numbersDraw,(beginScale+(step/2-0.0005))*Math.PI,(beginScale+(step/2+0.0005))*Math.PI);
            ctx.strokeStyle = '#666666';
            ctx.stroke();
            ctx.beginPath();
            ctx.font = '12pt Calibri';
            ctx.arc(500,375,numbersDraw,(beginScale+(step/2-0.0005))*Math.PI,(beginScale+(step/2+0.0005))*Math.PI);
            ctx.strokeStyle = '#666666';
            ctx.stroke();
            beginScale = endScale;
        }
    }else{

    }
}

var dataThink = new data();
dataThink.canvasDrow();