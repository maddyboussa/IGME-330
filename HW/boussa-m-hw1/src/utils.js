// helper function that gets a random element from an array
export const getRandElement = (array) =>{
    const randomWord = array[Math.floor(Math.random() * array.length)];
    return randomWord;
}