
let audioCtx;

// we will be exporting these variables
let element, sourceNode, analyserNode, gainNode;

let biquadFilter, lowShelfBiquadFilter;

// fake enumeration
const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples : 256
});

// create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);

// set up web audio api
const setupWebaudio = (filePath) =>{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // creates an <audio> element
    element = new Audio();  // document.querySelector("audio");

    // have it point at a sound file
    loadSoundFile(filePath);

    // create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // create analyser node
    analyserNode = audioCtx.createAnalyser();

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    // create biquad filter for highshelf
    biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "highshelf";
    biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);

    // create biquad filter for lowshelf
    lowShelfBiquadFilter = audioCtx.createBiquadFilter();
    lowShelfBiquadFilter.type = "lowshelf";
    lowShelfBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);

    // connect the nodes to form audio graph
    // source -> trebel -> bass -> distortion -> analyser -> gain -> destination
    sourceNode.connect(biquadFilter);
    biquadFilter.connect(lowShelfBiquadFilter);
    lowShelfBiquadFilter.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}

const loadSoundFile = (filePath) =>{
    element.src = filePath;
}

const playCurrentSound = () =>{
    element.play();
}

const pauseCurrentSound = () =>{
    element.pause();
}

const setVolume = (value) =>{
    value = Number(value);  // make sure that it's a Number rather than a String
    gainNode.gain.value = value;
}

const setHighshelfGain = (value) =>{
    value = Number(value);
    biquadFilter.gain.setValueAtTime(value, audioCtx.currentTime);
}

const setLowshelfGain = (value) =>{
    value = Number(value);
    lowShelfBiquadFilter.gain.setValueAtTime(value, audioCtx.currentTime);
}

export {audioCtx, setupWebaudio, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, setHighshelfGain, setLowshelfGain, analyserNode};

