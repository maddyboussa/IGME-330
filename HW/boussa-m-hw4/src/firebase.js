import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment } from  "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkh387yMYDBL9-20IsVN9cUVldRTRRR1c",
    authDomain: "high-scores-c2a54.firebaseapp.com",
    databaseURL: "https://high-scores-c2a54-default-rtdb.firebaseio.com",
    projectId: "high-scores-c2a54",
    storageBucket: "high-scores-c2a54.appspot.com",
    messagingSenderId: "893788359943",
    appId: "1:893788359943:web:ddc1cb832b74cbdd7849a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

const pushFavoriteToCloud = (parkId, incrementNum) => {
    const favRef = ref(db, 'park-favorites/' + parkId);
    set(favRef, {
        likes: increment(incrementNum)
    });
};

// You might get awway with exporting fewer functions than this
export { db, ref, set, push, pushFavoriteToCloud, onValue };