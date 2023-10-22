import * as main from "./main.js";

const loadJSON = () =>{
    const url = "data/av-data.json";
    const xhr = new XMLHttpRequest();

    // attempt to load xhr object
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const text = e.target.responseText;
        let json;

        // guard code using try/catch block
        try{
            json = JSON.parse(text);
        }
        catch{
            console.log("JSON.parse() failed");
            return;
        }

        // load app title
        document.querySelector("title").innerHTML = json.title;

        // load track select with track names and filepath
        let trackSelect = document.querySelector("#track-select");
        let fileName, trackName;

        // loop through all track objects within json file and load contents appropriately
        for (let i = 0; i < json.numTracks; i++)
        {
            fileName = json.tracks[i].file;
            trackName = json.tracks[i].track;

            // add selected property to fist item in dropdown
            if (i <= 0)
            {
                trackSelect.innerHTML += `<option value="media/${fileName}" selected>${trackName}</option>`;
            }
            else
            {
                trackSelect.innerHTML += `<option value="media/${fileName}">${trackName}</option>`;
            }

            console.log(fileName, trackName);
        }

        // load app instructions
        document.querySelector("#instructions-text").innerHTML = json.instructions;

    };
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

window.onload = ()=>{
	console.log("window.onload called");
	// load JSON data
	loadJSON();

	// start app
	main.init();
}