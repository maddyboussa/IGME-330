// utility functions
const getRandomColor = () =>
{
    // starter code
    // function getByte(){
    //     return 55 + Math.round(Math.random() * 200);
    // }
    // return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";

    // my modifications
    // picks a random color from a predetermined array of colors
    // ensures there will be a set color scheme to our screen saver
    const colors = ["#3a2e39", "#1e555c", "#f4d8cd", "#edb183", "#f15152"];

    // gets a random index of the array and returns the color at that index
    return colors[getRandomInt(0, colors.length)];
}

const getRandomInt = (min, max) =>
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {getRandomColor, getRandomInt};