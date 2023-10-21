/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import { CircleSprite } from './CircleSprite.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;

let maxRadius;

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


}

export {setupCanvas,draw};