/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

// iniialize drawParams object
const drawParams = {
    visMethod : 1,   // 1 stands for frequency data, 2 stands for waveform data
    drawMethod : "circles"
};

//here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/AAA_Powerline.mp3"
});

const init = () =>{
	// console.log("init called");
	// console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);

    // initialize web audio
	audio.setupWebaudio(DEFAULTS.sound1);

    // hookup canvas element
    let canvasElement = document.querySelector("canvas");

    // setup canvas and hookup ui
	setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    loop();
}

const setupUI = (canvasElement) =>{
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  // add functionality to play buttpn
  const playButton = document.querySelector("#btn-play");
  playButton.onclick = e => {
    
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }

    // play track if it is currently paused
    if (e.target.dataset.playing == "no") {
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    }
    // else pause the current sound
    else{
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  };

  // hookup volume slider and label
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");

  // add .oninput event to slider
  volumeSlider.oninput = e => {
    // set the gain
    audio.setVolume(e.target.value);
    // update the value of the lable to match slider
    volumeLabel.innerHTML = Math.round(e.target.value / 2 * 100);
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // hookup track select
  let trackSelect = document.querySelector("#track-select");

  // add .onchange event
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);

    // pause track if it is currently playing
    if (playButton.dataset.playing == "yes"){
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  // hookup visualization selector
  let visualizationSelect = document.querySelector("#vis-select");
  visualizationSelect.onchange = e => {
      drawParams.visMethod = e.target.value;
  }

  // hookup draw method selector
  let drawSelect = document.querySelector("#draw-select");
  drawSelect.onchange = e => {
        drawParams.drawMethod = e.target.value;
  }

  // hookup bass and treble sliders
  let trebleSlider = document.querySelector("#slider-treble");
  let trebleLable = document.querySelector("#label-treble");
  trebleSlider.oninput = e => {
    // set the gain for the highshelf filter
    audio.setHighshelfGain(e.target.value);

    // update the value of the lable to match slider
    trebleLable.innerHTML = Math.round(e.target.value);
  };
  trebleSlider.dispatchEvent(new Event("input"));

  let bassSlider = document.querySelector("#slider-bass");
  let bassLabel = document.querySelector("#label-bass");
  bassSlider.oninput = e => {
    // set the gain for the lowshelf filter
    audio.setLowshelfGain(e.target.value);

    // update the value of the lable to match slider
    bassLabel.innerHTML = Math.round(e.target.value);
  };
  bassSlider.dispatchEvent(new Event("input"));
	
}

const loop = () =>{

    // animate at 60 fps
    setTimeout(loop, 1000/60);
    canvas.draw(drawParams);

}

export {init};