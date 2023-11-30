import * as storage from "./storage.js"
let items = ["???!!!"];

let buttonRef = document.querySelector("#btn-add");
let clearRef = document.querySelector("#btn-clear");
let inputRef = document.querySelector("#thing-text");

// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  // loop though items and stick each array element into an <li>
  // use array.map()!
  // update the innerHTML of the <ol> already on the page
  let html = items.map(i => `<li>${i}</li>`).join("");
  document.querySelector("ol").innerHTML = html;
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {
    if (str.length > 0)
    {
      // push item to items array
      items.push(str);
    }
};


// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`
buttonRef.onclick = () => {
  // add current input item to the array
  addItem(inputRef.value);

  // update local storage
  storage.writeToLocalStorage("items", items);

  // clear input field
  inputRef.value = "";  

  showItems();
}

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array

// Got it working? 
// - Add a "Clear List" button that empties the items array
clearRef.onclick = () => {
  items = [];
  // update local storage
  storage.writeToLocalStorage("items", items);
  showItems();
}

const init = () =>{
  // load in items from local storage
  items = storage.readFromLocalStorage("items");

  // verify if data was loaded
  if (!Array.isArray(items))
  {
    // if nothing in local storage, set to empty array
    console.log("empty");
    items = [];
  }

  // display any stored items
  showItems();
}

init();

