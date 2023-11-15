/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils';
import * as audio from './audio';
import * as canvas from './canvas';
import { DEFAULTS } from './enums/defaults.enum';

// iniialize drawParams object
export const drawParams = {
  visMethod : 1,   // 1 stands for frequency data, 2 stands for waveform data
  drawMethod : "circles"
};

const init = () =>{
	// console.log("init called");
	// console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);

    // initialize web audio
	audio.setupWebaudio(DEFAULTS.sound1);

    // hookup canvas element
    let canvasElement = document.querySelector("canvas") as HTMLCanvasElement;

    // setup canvas and hookup ui
	setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    loop();
}

const setupUI = (canvasElement) =>{
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs") as HTMLButtonElement;
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  // add functionality to play buttpn
  const playButton = document.querySelector("#btn-play") as HTMLButtonElement;
  playButton.onclick = e => {

    const target = e.target as HTMLInputElement;
    
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }

    // play track if it is currently paused
    if (target.dataset.playing == "no") {
      audio.playCurrentSound();
      target.dataset.playing = "yes";
    }
    // else pause the current sound
    else{
      audio.pauseCurrentSound();
      target.dataset.playing = "no";
    }
  };

  // hookup volume slider and label
  let volumeSlider = document.querySelector("#slider-volume") as HTMLInputElement;
  let volumeLabel = document.querySelector("#label-volume") as HTMLLabelElement;

  // add .oninput event to slider
  volumeSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    // set the gain
    audio.setVolume(target.value);
    // update the value of the lable to match slider
    volumeLabel.innerHTML = Math.round(Number(target.value) / 2 * 100).toString();
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // hookup track select
  let trackSelect = document.querySelector("#track-select") as HTMLInputElement;

  // add .onchange event
  trackSelect.onchange = e => {
    const target = e.target as HTMLInputElement;
    audio.loadSoundFile(target.value);

    // pause track if it is currently playing
    if (playButton.dataset.playing == "yes"){
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  // hookup visualization selector
  let visualizationSelect = document.querySelector("#vis-select") as HTMLInputElement;
  visualizationSelect.onchange = e => {
    const target = e.target as HTMLInputElement;
      drawParams.visMethod = Number(target.value);
  }

  // hookup draw method selector
  let drawSelect = document.querySelector("#draw-select") as HTMLInputElement;
  drawSelect.onchange = e => {
    const target = e.target as HTMLInputElement;
        drawParams.drawMethod = target.value;
  }

  // hookup bass and treble sliders
  let trebleSlider = document.querySelector("#slider-treble") as HTMLInputElement;
  let trebleLable = document.querySelector("#label-treble") as HTMLLabelElement;
  trebleSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    // set the gain for the highshelf filter
    audio.setHighshelfGain(target.value);

    // update the value of the lable to match slider
    trebleLable.innerHTML = Math.round(Number(target.value)).toString();
  };
  trebleSlider.dispatchEvent(new Event("input"));

  let bassSlider = document.querySelector("#slider-bass") as HTMLInputElement;
  let bassLabel = document.querySelector("#label-bass") as HTMLLabelElement;
  bassSlider.oninput = e => {
    const target = e.target as HTMLInputElement;
    // set the gain for the lowshelf filter
    audio.setLowshelfGain(target.value);

    // update the value of the lable to match slider
    bassLabel.innerHTML = Math.round(Number(target.value)).toString();
  };
  bassSlider.dispatchEvent(new Event("input"));

  // mobile menu
  const burgerIcon = document.querySelector("#burger") as HTMLButtonElement;
  const navbarMenu = document.querySelector("#nav-links");

  burgerIcon.onclick = () => {
    navbarMenu.classList.toggle("is-active");
  }
}

const loop = () =>{

    // animate at 60 fps
    setTimeout(loop, 1000/60);
    canvas.draw(drawParams);

}

export {init};