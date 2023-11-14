import { formatGreeting } from "./utils";

const input:HTMLInputElement = document.querySelector("#input-firstname") as HTMLInputElement;
const output:HTMLParagraphElement = document.querySelector("#output") as HTMLParagraphElement;
const cbForcefully:HTMLInputElement = document.querySelector("#cb-forcefully") as HTMLInputElement;

const helloButton = document.querySelector("#btn-hello") as HTMLButtonElement;
const goodbyeButton:HTMLButtonElement = document.querySelector("#btn-goodbye")!; // exclamation mark says its not null

let forcefully:boolean = cbForcefully.checked;

//cbForcefully.onchange = () => forcefully = cbForcefully.checked;
cbForcefully.onchange = e => forcefully = (e.target as HTMLInputElement).checked;
helloButton.onclick = () => output.innerHTML = formatGreeting("Hello",input.value.trim(), forcefully);
goodbyeButton.onclick = () => output.innerHTML = formatGreeting("Goodbye",input.value.trim(), forcefully);
