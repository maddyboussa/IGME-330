import { getRandomColor, getRandomInt } from "./utils.js";
import { drawRectangle, drawArc, drawLine } from "./canvas-utils.js";

// declare global context variable
let ctx;
let canvas;

let paused = false;
let createRectangles = true;
let createArcs = true;
let createLines = true;

const init = () => {
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!

    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");

    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");

    drawRectangle(ctx, 20, 20, 600, 440, "white");

    setupUI();
    update();
}

const update = () => {
    // if paused, don't update
    if (paused) return;
    // schedules a call to the update function to periodically draws random rectangles
    requestAnimationFrame(update);

    // only draw rectangles in the loop if the user checks the box
    if (createRectangles) {
        drawRandomRect(ctx);
    }

    if (createArcs) {
        drawRandomCircle(ctx);
    }

    if (createLines) {
        drawRandomLine(ctx);
    }

}

// draws a random rectangle
const drawRandomRect = (ctx) => {
    drawRectangle(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(10, 90), getRandomInt(10, 90),
        getRandomColor(), getRandomInt(2, 12), getRandomColor());
}

// draws a random circle
const drawRandomCircle = (ctx) => {
    drawArc(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(0, 100),
        getRandomColor(), getRandomInt(2, 12), getRandomColor());
}

const drawRandomLine = (ctx) => {
    drawLine(ctx, getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(0, 640), getRandomInt(0, 480), getRandomInt(2, 12), getRandomColor());
}

// event handlers
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);

    // draw random rectangles near mouse click
    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(20, 50);
        let color = getRandomColor();
        drawArc(ctx, x, y, radius, color);
    }
}

// helper functions
const setupUI = () => {
    // sets up button functionality
    document.querySelector("#btn-pause").onclick = function () {
        paused = true;
    };

    document.querySelector("#btn-play").onclick = function () {
        // only request another animation frame if previously paused
        if (paused) {
            paused = false;

            // also start update loop back up
            update();
        }
    };

    document.querySelector("#btn-clear").onclick = function () {
        // draw a white rectangle to clear the screne
        drawRectangle(ctx, 0, 0, 640, 480, "white");
    }

    document.querySelector("#cb-rectangles").onclick = function (e) {
        createRectangles = e.target.checked;
    }

    document.querySelector("#cb-arcs").onclick = function (e) {
        createArcs = e.target.checked;
    }

    document.querySelector("#cb-lines").onclick = function (e) {
        createLines = e.target.checked;
    }

    canvas.onclick = canvasClicked;
}

init();
