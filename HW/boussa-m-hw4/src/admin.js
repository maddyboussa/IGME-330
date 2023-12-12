import * as firebase from "./firebase.js";

const parks = {
    "p79"   : "Letchworth State Park",
    "p20"   : "Hamlin Beach State Park",
    "p180"  : "Brookhaven State Park",
    "p35"   : "Allan H. Treman State Marine Park",
    "p118"  : "Stony Brook State Park",
    "p142"  : "Watkins Glen State Park",
    "p62"   : "Taughannock Falls State Park",
    "p84"   : "Selkirk Shores State Park",
    "p43"   : "Chimney Bluffs State Park",
    "p200"  : "Shirley Chisholm State Park",
    "p112"  : "Saratoga Spa State Park"
};

let listRef = document.querySelector("#favs-list");
const db = firebase.db;
const favoritesRef = firebase.ref(db, 'park-favorites/');

// unsure why its addong duplicate elements to the list as the snapshot appears to contain no duplicates
const favoritesChanged = (snapshot) => {
    let listElement = "";

    console.log(snapshot.val());

    // clear list
    listRef.innerHTML = "";

    // loop through firebase data and build list elements accordingly
    snapshot.forEach(favorite => {
        // retrieve data
        const childKey = favorite.key;
        const childData = favorite.val();

        // create list element based on data
        listElement += `<li>${parks[childKey]} (${childKey}) - Likes: ${childData.likes}</li>`;

        listRef.innerHTML += listElement;
    });

}

firebase.onValue(favoritesRef, favoritesChanged);
