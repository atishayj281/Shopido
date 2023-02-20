const firebaseConfig = {
    apiKey: "AIzaSyCT7rCu7DH9GycXRQSHrKUY8mkkNskdTJg",
    authDomain: "shopido-b4134.firebaseapp.com",
    databaseURL: "https://shopido-b4134-default-rtdb.firebaseio.com",
    projectId: "shopido-b4134",
    storageBucket: "shopido-b4134.appspot.com",
    messagingSenderId: "901678716880",
    appId: "1:901678716880:web:a6b36e83ff8667c5244bd5",
    measurementId: "G-FT3D27GEJW"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
window.onload = function () {

    signUpButton = document.getElementsByClassName('ghost');
    signInButton = document.getElementById('signIn');
    container = document.getElementById('container');
    signInBtn = document.getElementById('sign-in-btn');
    signUpBtn = document.getElementById('sign-up-btn')
    authWithGoogleBtn = document.getElementById('google')

    signInBtn.addEventListener('click', () => {

    });

    authWithGoogleBtn.addEventListener('click', () => {
        authWithGoogle();
    });

    function signInCLick() {
        container.classList.remove("right-panel-active");
    }

    function regClick() {
        container.classList.add("right-panel-active");
    }

    db.collection("user").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().email}`);
        });
    });
    // Get a list of cities from your database
    async function getProducts(db) {
        const produtCol = collection(db, 'products');
        const productSnapshot = await getDocs(produtCol);
        const productList = productSnapshot.docs.map(doc => doc.data());
        return productList;
    }


    function setCustomer(uid, email, mobile, name, image, address) {

    }

    function authWithGoogle() {
        var auth = firebase.auth();
        console.log("Auth started");
        var googleAuthProvider = new firebase.auth.GoogleAuthProvider
        firebase.auth().signInWithPopup(googleAuthProvider).then(function (result) {
            console.log(result.user)
            var user = result.user;
            setCustomer(user.uid, user.email, "", user.displayName, user.photoURL, "");
        }).catch(function (error) {
            console.log(error.message);
        })
    }
};

