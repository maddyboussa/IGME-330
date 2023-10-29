
import * as utils from './utils.js';
import { CircleSprite } from './CircleSprite.js';
import { RectangleSprite } from './RectangleSprite.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;

let maxRadius;
let middleY;
let middleX;

// declare circles
let circle1, circle2

const setupCanvas = (canvasElement,analyserNodeRef) =>{
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;

	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize / 2);

    // initialize 2 circle sprites in the center of the canvas
    circle1 = new CircleSprite(canvasWidth / 2, canvasHeight / 2, 1, "white");
    circle2 = new CircleSprite(canvasWidth / 2, canvasHeight / 2, 1, "white");

    // determine max radii for the circles
    maxRadius = canvasHeight / 9;

    middleY = canvasHeight / 2;
    middleX = canvasHeight / 2;
}

const draw = (params={}) =>{

    // load audioData array based on visualization method selected
    if (params.visMethod == 1)
    {
        // get frequency data
        analyserNode.getByteFrequencyData(audioData);
    }
    else if (params.visMethod == 2)
    {
        // get waveform data
        analyserNode.getByteTimeDomainData(audioData);
    }
	
	// draw background
	ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // draw method: circles
    if (params.drawMethod == "circles")
    {
        ctx.save();

        // circles
        // loop through audio data array
        for (let i = 0; i < audioData.length; i++)
        {
            let percent = audioData[i] / 255;
            // clamp percent to see circles even if volume is 0
            //if (percent < 0.05) percent = .05;

            let circleRadius = percent * maxRadius;

            // cirlce 1
            // update circle properties according to audio data
            circle1.radius = circleRadius;
            circle1.color = utils.makeColor(1, 0, 1, percent);
            // draw circle sprites based on current audio data
            circle1.draw(ctx);

            // circle 2
            circle2.radius = circleRadius * 0.7;
            circle2.draw(ctx);
        }
        ctx.restore();

        // rectangles
        ctx.save();

        // initial translate
        ctx.translate(middleX + 400, middleY - 40);

        let maxHeight = 700;

        for (let i = 0; i < audioData.length; i++)
        {
            let percent = audioData[i] / 255;

            // everytime you draw, move right
            ctx.translate(1, 0);

            // rotate to draw bars in a circle
            ctx.rotate(Math.PI * 2 / audioData.length);

            ctx.save();
            ctx.scale(1, -1);   // negates y axis
            let rect = new RectangleSprite(0, 0, 1, maxHeight * percent, "white");
            rect.draw(ctx);
            ctx.restore();

            // creates some space between bars
            ctx.translate(1, 0);
        }
        ctx.restore();
    }

    // draw method: bars
    if (params.drawMethod == "bars")
    {
        ctx.save();

        ctx.translate(0, middleY);

        let maxHeight = 200;
        let translateDist = canvasWidth / audioData.length;

        for (let i = 0; i < audioData.length; i++)
        {
            let percent = audioData[i] / 255;

            // move right as you draw
            ctx.translate(translateDist, 0);

            // draw 2 mirrored bars
            ctx.save()
            let rect1 = new RectangleSprite(0, 0, 10, maxHeight * percent, "white");
            rect1.draw(ctx);
            ctx.save();
            ctx.scale(1, -1);
            let rect2 = new RectangleSprite(0, 0, 10, maxHeight * percent, "white");
            rect2.draw(ctx);
            ctx.restore();
            ctx.restore();

            // creates some space between bars
            ctx.translate(1, 0);
        }
        ctx.restore();
    }

    // draw method: lines
    if (params.drawMethod == "lines")
    {
        // top line
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        let x1 = 0;
        let y1 = middleY;
        ctx.beginPath();
        ctx.moveTo(x1, y1);

        for (let i = 0; i < audioData.length; i++)
        {
            ctx.lineTo(x1, y1 - audioData[i]);
            x1 += (ctx.canvas.width/(audioData.length - 10));
        }

        ctx.lineTo(x1 - 8, y1);
        x1 = canvasWidth;
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // bottom line
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        let x2 = 0;
        let y2 = middleY + 5;
        ctx.beginPath();
        ctx.moveTo(x2, y2);

        for (let i = 0; i < audioData.length; i++)
        {
            ctx.lineTo(x2, y2 + audioData[i]);
            x2 += (ctx.canvas.width/(audioData.length - 10));
        }

        ctx.lineTo(x2 - 8, y2);
        x2 = canvasWidth;
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // top right line
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        let x3 = canvasWidth;
        let y3 = middleY;
        ctx.beginPath();
        ctx.moveTo(x3, y3);

        for (let i = 0; i < audioData.length; i++)
        {
            ctx.lineTo(x3, y3 - audioData[i]);
            x3 -= (ctx.canvas.width/(audioData.length - 10));
        }

        ctx.lineTo(x3 - 8, y3);
        x3 = 0;
        ctx.lineTo(x3, y3);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // bottom right line
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        let x4 = canvasWidth;
        let y4 = middleY + 5;
        ctx.beginPath();
        ctx.moveTo(x4, y4);

        for (let i = 0; i < audioData.length; i++)
        {
            ctx.lineTo(x4, y4 + audioData[i]);
            x4 -= (ctx.canvas.width/(audioData.length - 10));
        }

        ctx.lineTo(x4 - 8, y4);
        x4 = 0;
        ctx.lineTo(x4, y4);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

}

export {setupCanvas,draw};