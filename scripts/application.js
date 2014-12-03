var data = function(){
    this.isPercent = false;
    this.lenghtScale = 25;
    this.percentScale = 10;
    this.value = 10;
    this.idElement = "myCanvas";
}
data.prototype.canvasDrow = function(){
    var c=document.getElementById(this.idElement);
    var ctx=c.getContext("2d");
    c.width = 1000;
    c.height = 1000;
    if(!this.isPercent){
        var step = 1.5 / this.lenghtScale,
            beginScale = 0.75,
            endScale;
        for(var i = 1; i <= this.lenghtScale; i++){
            endScale = beginScale + step;
            endScale = endScale > 2 ? endScale - 2 : endScale;
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(500,375,250,beginScale*Math.PI,endScale*Math.PI);
            ctx.strokeStyle = this.value >= i ? '#666666' : '#'+((1<<24)*Math.random()|0).toString(16);
            ctx.stroke();
            beginScale = endScale;
        }
    }else{

    }
}

var dataThink = new data();
dataThink.canvasDrow();