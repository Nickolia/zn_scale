(function($){
    jQuery.fn.gauge = function(options){
        options = $.extend({
            isPercent : false, //is Percent scale?
            firstNumber: 1, //first number for nonPercent scale
            lenghtScale : 20, // last number for nonPercent scale
            percentScaleStap : 10, // stap for percent scale
            numberScaleStap : 1, // this option in the development of
            value : 4, // value for scale
            numberInACircle : true, // number in/out
            idElement : "myCanvas", // name for parent Element *
            canvasSize : 500, // canvas size
            scaleDiameter : 800, // diameter Scale
            arrowColor: "#628398", //color scale arrow
            fonts: "Arial" // font :)
        }, options);

        var getDomObj = function(T){
            var randomNumber = Math.floor(Math.random() * (0 - 10000 + 1)) + 0;
            $(T).html('<canvas id="gauge' + randomNumber +'"></canvas>');
            options.idElementCanvas = "gauge" + randomNumber;
            return $('#'+options.idElementCanvas);
        };

        var canvasDrow = function(){
            var T = this,
                c = getDomObj(T);
            var ctx = c[0].getContext("2d");
            options.canvasSize = options.canvasSize < 250 ? 250 : options.canvasSize
            c[0].width = options.canvasSize + (options.canvasSize/5);
            c[0].height = options.canvasSize;
            options.scaleDiameter = options.scaleDiameter <= options.canvasSize - 80 ? options.scaleDiameter : options.canvasSize - 80;
            numbersDraw = options.numberInACircle ? options.scaleDiameter/2 - options.scaleDiameter/35 : options.scaleDiameter/2 + options.scaleDiameter/35;
            var numberstap = 0 - (options.firstNumber),
                lenghtScaleStap = !options.isPercent ? (options.lenghtScale - options.firstNumber) / options.numberScaleStap : (100 / options.percentScaleStap),
                stap = 270 / lenghtScaleStap,
                beginScale = 135,
                valueFalseNum = (options.lenghtScale < options.value || options.firstNumber > options.value),
                valueFalsePer = (options.value < 100 && options.value > 0),
                endScale;

            //Draw Arc and Scale
            for(var i = 0; i <= lenghtScaleStap; i++ ){
                endScale = i == lenghtScaleStap || i == 0 ? beginScale + stap/2 : beginScale + stap;
                ctx.beginPath();
                ctx.lineWidth =  options.scaleDiameter/80;
                ctx.arc(c[0].width/2, options.canvasSize/2, options.scaleDiameter/2, beginScale * (Math.PI / 180), endScale * (Math.PI / 180));
                ctx.strokeStyle = options.value >= (!options.isPercent ? i - numberstap : i * options.percentScaleStap) ? '#666666' : '#'+((1<<24)*Math.random()|0).toString(16);
                ctx.stroke();
                ctx.beginPath();
                ctx.lineWidth = options.scaleDiameter/40;
                ctx.arc(c[0].width/2,options.canvasSize/2,numbersDraw, (i == 0 ? beginScale : (beginScale+(stap/2-(stap/100))))* (Math.PI / 180), (i == 0 ? (beginScale+(stap/50)) : (beginScale+(stap/2+(stap/100)))) * (Math.PI / 180));
                ctx.strokeStyle = '#666666';
                ctx.stroke();
                beginScale = endScale;
            }

            //Draw Number Scale
            ctx.beginPath();
            ctx.translate(c[0].width/2, options.canvasSize/2);
            ctx.font = options.scaleDiameter/30 < 9 ? 9 : options.scaleDiameter/30 + 'px '+ options.fonts;
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (var n = 0; n <= lenghtScaleStap; n++) {
                var numbersRadius = options.numberInACircle ? options.scaleDiameter/2 - options.scaleDiameter/12 : options.scaleDiameter/2 + options.scaleDiameter/12
                var theta = (n - lenghtScaleStap * 0.167)  * (Math.PI * 2) / lenghtScaleStap * 0.75;
                var x = -numbersRadius * Math.cos(theta);
                var y = -numbersRadius * Math.sin(theta);
                !options.isPercent ? ctx.fillText((n - numberstap)*options.numberScaleStap, x, y) : ctx.fillText(n*options.percentScaleStap+"%", x, y);
            }
            ctx.stroke();

            // Draw value
            ctx.beginPath();
            ctx.font = options.scaleDiameter/20 < 9 ? 9 : options.scaleDiameter/20 + 'px '+ options.fonts;
            ctx.fillStyle = !options.isPercent ? (valueFalseNum ? '#b04040' :  '#000'): (!valueFalsePer ? '#b04040' :  '#000');
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(!options.isPercent ? options.value : options.value + "%", 0, !options.isPercent ? (valueFalseNum ? -40 : 40) : (!valueFalsePer ? -40 : 40));
            ctx.stroke();

            //Draw Arrow
            ctx.beginPath();
            if(!options.isPercent){
                if(!valueFalseNum){
                    ctx.rotate((-135 + (270 /  lenghtScaleStap * (numberstap + options.value) )) * (Math.PI/180));
                } else if(options.lenghtScale < options.value){
                    ctx.rotate(150 * (Math.PI/180));
                } else {
                    ctx.rotate(-150 * (Math.PI/180));
                }
            } else {
                if(valueFalsePer){
                    ctx.rotate((-135 + (270 / 100 * options.value )) * (Math.PI/180));
                } else if(options.value > 100){
                    ctx.rotate(150 * (Math.PI/180));
                } else {
                    ctx.rotate(-150 * (Math.PI/180));
                }
            }

            ctx.lineWidth = 1;
            ctx.strokeStyle = !options.isPercent ? (valueFalseNum ? '#b04040' :   options.arrowColor): (!valueFalsePer ? '#b04040' : options.arrowColor);
            ctx.fillStyle = !options.isPercent ? (valueFalseNum ? '#b04040' :   options.arrowColor): (!valueFalsePer ? '#b04040' : options.arrowColor);
            ctx.moveTo(-(options.scaleDiameter /60), -(options.scaleDiameter / 60));
            ctx.lineTo(0, -numbersDraw);
            ctx.lineTo(options.scaleDiameter /60, options.scaleDiameter / 60);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.translate(-c[0].width/2, -options.canvasSize/2);

            ctx.beginPath();
            ctx.lineWidth = 0;
            ctx.arc(c[0].width/2,options.canvasSize/2, options.scaleDiameter/30,2*Math.PI,false);
            ctx.fillStyle = !options.isPercent ? (valueFalseNum ? '#b04040' :   options.arrowColor): (!valueFalsePer ? '#b04040' : options.arrowColor);
            ctx.fill();
            ctx.strokeStyle = !options.isPercent ? (valueFalseNum ? '#b04040' :   options.arrowColor): (!valueFalsePer ? '#b04040' : options.arrowColor);
            ctx.stroke();
        };

        return this.each(canvasDrow);
    };
})(jQuery);