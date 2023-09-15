import {getRandElement} from "./utils.js";

// declare babble array variables
let words1;
let words2;
let words3; 

// get references to html elements
const button = document.querySelector("#mybutton");
const buttonMore = document.querySelector("#morebutton");
const output = document.querySelector("#output");

const getBabble = () =>{

    // generate 3 random words using the above arrays
    const randomWord1 = getRandElement(words1);
    const randomWord2 = getRandElement(words2);
    const randomWord3 = getRandElement(words3);

    console.log(randomWord1 + " " + randomWord2 + " " + randomWord3);

    // store the 3 random words in 1 string
    const babble = `${randomWord1} ${randomWord2} ${randomWord3}`;

    // update the output to reflect the generated babble
    output.innerHTML += babble + "<br>";
}

// generates a certain amount of technobabble based on input
const generateTechno = (num) =>{
    // clear previous technobabble
    output.innerHTML= "";

    for (let i = 0; i < num; i++)
    {
        getBabble();
    }
}

// parsed the json babble
const babbleLoaded = (e) =>{
    let json;

    // guard code using try/catch block
    try{
        json = JSON.parse(e.target.responseText);
    }
    catch{
        document.querySelector("#output").innerHTML = "JSON.parse() failed";
        return;
    }

    // parse technobabble into usable arrays
    words1 = json.words1;
    words2 = json.words2;
    words3 = json.words3;

    // initialize button click events
    button.onclick = () => generateTechno(1);
    buttonMore.onclick = () => generateTechno(5);

    //get babble on page load
    generateTechno(1);
}

// start xhr load event
const loadBabble = () =>{
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) =>{
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        babbleLoaded(e);
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

// called after page loads
loadBabble();
