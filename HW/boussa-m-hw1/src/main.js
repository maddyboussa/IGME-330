"use strict";

const init = () =>{

    const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];
   
    const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];
            
    const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

    // get references to html elements
    const button = document.querySelector("#myButton");
    const buttonMore = document.querySelector("#moreButton");
    const output = document.querySelector("#output");

    // add getBabble to button click event\
    button.onclick = () => generateTechno(1);
    buttonMore.onclick = () => generateTechno(5);

    // helper function that gets a random element from an array
    const getRandElement = (array) =>{
        const randomWord = array[Math.floor(Math.random() * array.length)];
        return randomWord;
    }

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

    // generates a certain amount of techno based on input
    const generateTechno = (num) =>{
        // clear previous technobabble
        output.innerHTML= "";

        for (let i = 0; i < num; i++)
        {
            getBabble();
        }
    }
    
    // get babble on page load
    generateTechno(1);    
}

window.onload = init;